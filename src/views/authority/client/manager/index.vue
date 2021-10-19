<template>
  <ingot-container>
    <ingot-page-card @back="$router.back()">
      <template #action>
        <el-button
          size="small"
          type="primary"
          :disabled="edit"
          @click="edit = true"
        >
          编辑
        </el-button>
      </template>

      <el-form
        ref="editFormRef"
        class="form"
        label-width="150px"
        label-position="right"
        :model="editForm"
        size="small"
        :disabled="!edit"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="客户端ID" prop="clientId">
              <el-input
                disabled
                v-model="editForm.clientId"
                placeholder="请输入客户端ID"
                class="form-item"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户端秘钥" prop="clientSecret">
              <el-input
                v-model="editForm.clientSecret"
                disabled
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
                disabled
                placeholder="请输入客户端名称"
                class="form-item"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="访问范围">
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

        <el-form-item label="授权授予类型">
          <ingot-select
            v-model="editForm.authorizationGrantTypes"
            :options="grantTypeList()"
            placeholder="请选择允许授予类型"
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
                :options="getAuthTypeSelectList()"
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
      <el-row justify="center" v-if="edit">
        <el-button size="small" type="primary" @click="handleSaveEdit">
          保存
        </el-button>
        <el-button size="small" @click="handleCancelEdit">取消</el-button>
      </el-row>
    </ingot-page-card>
  </ingot-container>
</template>
<script lang="ts" setup>
import { defineProps, reactive, ref, onMounted, computed } from "vue";
import {
  OAuth2RegisteredClient,
  getAuthTypeSelectList,
  grantTypeList,
  AuthorizedGrantType,
  getClientAuthMethodList,
} from "@/model";
import { getOne, update } from "@/api/authority/client";
import { copyParams, getDiffWithIgnore } from "@/utils/object";
import { Message } from "@/utils/message";

const editFormRef = ref();
const editForm = reactive({} as OAuth2RegisteredClient);
const rawForm = reactive({} as OAuth2RegisteredClient);

const edit = ref(false);

const props = defineProps(["id"]);

const handleSaveEdit = () => {
  if (editForm.scopes === "") {
    Message.warning("访问范围不能为空");
    return;
  }
  const params = getDiffWithIgnore(rawForm, editForm, ["clientId"]);
  update(params).then(() => {
    Message.success("操作成功");
    edit.value = false;
  });
};

const handleCancelEdit = () => {
  edit.value = false;
  copyParams(editForm, rawForm);
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

onMounted(() => {
  getOne(props.id).then((response) => {
    copyParams(editForm, response.data);
    copyParams(rawForm, response.data);
  });
});
</script>
<style lang="stylus" scoped>
.form-item
  width 100%
</style>
