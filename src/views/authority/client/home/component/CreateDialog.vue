<template>
  <el-dialog :title="title" v-model="visible" center width="70%">
    <el-form
      ref="editFormRef"
      class="form"
      label-width="150px"
      label-position="right"
      :model="editForm"
      :rules="rules"
      size="small"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="客户端ID" prop="clientId">
            <el-input
              v-model="editForm.clientId"
              clearable
              placeholder="请输入客户端ID"
              class="form-item"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="秘钥" prop="clientSecret">
            <el-input
              v-model="editForm.clientSecret"
              clearable
              placeholder="请输入客户端秘钥"
              class="form-item"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="客户端名称" prop="clientName">
            <el-input
              v-model="editForm.clientName"
              clearable
              placeholder="请输入客户端名称"
              class="form-item"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="访问范围" prop="scopes">
            <el-input
              v-model="editForm.scopes"
              clearable
              placeholder="请输入客户端scope"
              class="form-item"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Client认证方式">
        <ingot-select
          v-model="editForm.clientAuthenticationMethods"
          :options="getClientAuthMethodList()"
          placeholder="请选择Client认证方式"
          split=","
          size="small"
          multiple
          class="form-item"
        />
      </el-form-item>

      <el-form-item label="Client授权类型">
        <ingot-select
          v-model="editForm.authorizationGrantTypes"
          :options="grantTypeList()"
          placeholder="请选择允许授权类型"
          split=","
          size="small"
          multiple
          class="form-item"
        />
      </el-form-item>
      <el-form-item label="重定向URL">
        <el-input
          v-model="editForm.redirectUris"
          clearable
          placeholder="请输入重定向URL"
          class="form-item"
        ></el-input>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="访问Token失效时间">
            <el-input
              v-model="editForm.accessTokenTimeToLive"
              clearable
              type="number"
              placeholder="请输入访问Token失效时间"
              class="form-item"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Token授权类型">
            <ingot-select
              v-model="editForm.tokenAuthenticationMethod"
              :options="getTokenAuthMethodSelectList()"
              size="small"
              class="form-item"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" v-if="grantRefreshToken">
        <el-col :span="12">
          <el-form-item label="刷新Token失效时间">
            <el-input
              v-model="editForm.refreshTokenTimeToLive"
              clearable
              type="number"
              placeholder="请输入刷新Token失效时间"
              class="form-item"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重复使用刷新Token">
            <el-switch
              v-model="editForm.reuseRefreshTokens"
              size="small"
              class="form-item"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" v-if="grantCode">
        <el-col :span="12">
          <el-form-item label="需要提供验证密钥质询和验证器">
            <el-switch
              v-model="editForm.requireProofKey"
              size="small"
              class="form-item"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="需要授权同意">
            <el-switch
              v-model="editForm.requireAuthorizationConsent"
              size="small"
              class="form-item"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button
        :loading="loading"
        size="small"
        type="primary"
        @click="handleConfirmClick"
      >
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
export interface API {
  show(): void;
}
</script>
<script lang="ts" setup>
import {
  OAuth2RegisteredClient,
  TokenAuthMethod,
  getTokenAuthMethodSelectList,
  grantTypeList,
  AuthorizedGrantType,
  getClientAuthMethodList,
} from "@/model";
import { defineEmits, reactive, ref, defineExpose, toRaw, computed } from "vue";
import { create } from "@/api/authority/client";
import { Message } from "@/utils/message";
import { copyParams } from "@/utils/object";

const rules = {
  clientId: [{ required: true, message: "请输入客户端ID", trigger: "blur" }],
  clientSecret: [
    { required: true, message: "请输入客户端秘钥", trigger: "blur" },
  ],
  clientName: [
    { required: true, message: "请输入客户端名称", trigger: "blur" },
  ],
  scopes: [
    { required: true, message: "请输入客户端访问范围", trigger: "blur" },
  ],
};

const defaultEditForm: OAuth2RegisteredClient = {
  id: undefined,
  clientId: undefined,
  clientSecret: undefined,
  clientName: undefined,
  clientAuthenticationMethods: undefined,
  authorizationGrantTypes: undefined,
  redirectUris: undefined,
  scopes: undefined,
  requireProofKey: false,
  requireAuthorizationConsent: false,
  accessTokenTimeToLive: undefined,
  reuseRefreshTokens: false,
  refreshTokenTimeToLive: undefined,
  idTokenSignatureAlgorithm: undefined,
  tokenAuthenticationMethod: TokenAuthMethod.Standard,
};

const emits = defineEmits(["success"]);

const editFormRef = ref();
const editForm = reactive(Object.assign({}, defaultEditForm));
const loading = ref(false);
const title = ref("创建客户端");
const visible = ref(false);

const show = () => {
  visible.value = true;
  copyParams(editForm, defaultEditForm);
};

const handleConfirmClick = () => {
  editFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      const params: OAuth2RegisteredClient = toRaw(editForm);

      create(params)
        .then(() => {
          loading.value = false;
          Message.success("操作成功");
          visible.value = false;
          emits("success");
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
};

const grantRefreshToken = computed(() => {
  return (
    editForm.authorizationGrantTypes &&
    (editForm.authorizationGrantTypes as string).indexOf(
      AuthorizedGrantType.RefreshToken
    ) > -1
  );
});

const grantCode = computed(() => {
  return (
    editForm.authorizationGrantTypes &&
    (editForm.authorizationGrantTypes as string).indexOf(
      AuthorizedGrantType.Code
    ) > -1
  );
});

defineExpose({
  show,
});
</script>
<style lang="stylus" scoped>
.form-item
  width 100%
</style>
