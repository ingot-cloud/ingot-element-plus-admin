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
          <el-form-item label="资源ID" prop="resourceId">
            <el-input
              v-model="editForm.resourceId"
              clearable
              placeholder="请输入客户端资源ID"
              class="form-item"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="访问范围">
            <el-input
              v-model="editForm.scope"
              clearable
              placeholder="请输入客户端scope"
              class="form-item"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="允许授权类型">
        <ingot-select
          v-model="editForm.authorizedGrantTypes"
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
          v-model="editForm.webServerRedirectUri"
          clearable
          placeholder="请输入重定向URL"
          class="form-item"
        ></el-input>
      </el-form-item>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="访问Token失效时间">
            <el-input
              v-model="editForm.accessTokenValidity"
              clearable
              type="number"
              placeholder="请输入访问Token失效时间"
              class="form-item"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="刷新Token失效时间">
            <el-input
              v-model="editForm.refreshTokenValidity"
              clearable
              type="number"
              placeholder="请输入刷新Token失效时间"
              class="form-item"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="授权类型">
            <ingot-select
              v-model="editForm.authType"
              :options="getAuthTypeSelectList()"
              size="small"
              class="form-item"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注">
            <el-input
              v-model="editForm.remark"
              clearable
              placeholder="请输入备注信息"
              class="form-item"
            ></el-input>
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
  SysOauthClientDetails,
  AuthType,
  getAuthTypeSelectList,
  grantTypeList,
} from "@/model";
import { defineEmits, reactive, ref, defineExpose, toRaw } from "vue";
import { create } from "@/api/authority/client";
import { Message } from "@/utils/message";
import { copyParams } from "@/utils/object";

const rules = {
  clientId: [{ required: true, message: "请输入客户端ID", trigger: "blur" }],
  clientSecret: [
    { required: true, message: "请输入客户端秘钥", trigger: "blur" },
  ],
  resourceId: [{ required: true, message: "请输入资源ID", trigger: "blur" }],
};

const defaultEditForm: SysOauthClientDetails = {
  id: undefined,
  clientId: undefined,
  clientSecret: undefined,
  resourceId: undefined,
  resourceIds: undefined,
  scope: undefined,
  authorizedGrantTypes: undefined,
  webServerRedirectUri: undefined,
  authorities: undefined,
  accessTokenValidity: 7200,
  refreshTokenValidity: 7200,
  additionalInformation: undefined,
  autoapprove: undefined,
  authType: AuthType.Standard,
  type: undefined,
  remark: undefined,
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
      const params: SysOauthClientDetails = toRaw(editForm);

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

defineExpose({
  show,
});
</script>
<style lang="stylus" scoped>
.form-item
  width 100%
</style>
