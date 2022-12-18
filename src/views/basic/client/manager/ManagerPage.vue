<template>
  <in-container>
    <div flex flex-row justify-between items-center m-b-10px>
      <div>客户端编辑</div>
      <div>
        <in-button
          v-if="!edit"
          type="primary"
          :disabled="edit"
          @click="edit = true"
        >
          编辑
        </in-button>
        <div justify="center" v-else>
          <in-button type="primary" @click="handleSaveEdit"> 保存 </in-button>
          <in-button @click="handleCancelEdit">取消</in-button>
        </div>
      </div>
    </div>

    <el-form
      ref="editFormRef"
      label-width="150px"
      label-position="right"
      :model="editForm"
      :disabled="!edit"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="客户端ID" prop="clientId">
            <el-input
              disabled
              v-model="editForm.clientId"
              placeholder="请输入客户端ID"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户端秘钥" prop="clientSecret">
            <el-input
              v-model="editForm.clientSecret"
              disabled
              placeholder="请输入客户端秘钥"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="客户端名称" prop="clientName">
            <el-input
              v-model="editForm.clientName"
              disabled
              placeholder="请输入客户端名称"
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
        <in-select
          v-model="editForm.clientAuthenticationMethods"
          :options="getClientAuthMethodList()"
          placeholder="请选择Client认证方式"
          split=","
          multiple
        />
      </el-form-item>

      <el-form-item label="授权授予类型">
        <in-select
          v-model="editForm.authorizationGrantTypes"
          :options="grantTypeList()"
          placeholder="请选择允许授予类型"
          split=","
          multiple
        />
      </el-form-item>
      <el-form-item label="重定向URL">
        <el-input
          v-model="editForm.redirectUris"
          clearable
          placeholder="请输入重定向URL"
        ></el-input>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="访问Token失效时间">
            <el-input
              v-model="editForm.accessTokenTimeToLive"
              clearable
              type="number"
              placeholder="请输入访问Token失效时间"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Token授权类型">
            <in-select
              v-model="editForm.tokenAuthType"
              :options="getTokenAuthMethodSelectList()"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="grantRefreshToken">
        <el-col :span="12">
          <el-form-item label="刷新Token失效时间">
            <el-input
              v-model="editForm.refreshTokenTimeToLive"
              clearable
              type="number"
              placeholder="请输入刷新Token失效时间"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重复使用刷新Token">
            <el-switch v-model="editForm.reuseRefreshTokens" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-if="grantCode">
        <el-col :span="12">
          <el-form-item label="需要提供验证密钥质询和验证器">
            <el-switch v-model="editForm.requireProofKey" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="需要授权同意">
            <el-switch v-model="editForm.requireAuthorizationConsent" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </in-container>
</template>
<script lang="ts" setup>
import { defineProps, reactive, ref, onMounted, computed } from "vue";
import type { OAuth2RegisteredClient } from "@/models";
import {
  getTokenAuthMethodSelectList,
  grantTypeList,
  AuthorizedGrantType,
  getClientAuthMethodList,
} from "@/models/enums";
import { GetClientInfoAPI, UpdateClientAPI } from "@/api/basic/client";
import { copyParams, getDiffWithIgnore } from "@/utils/object";
import { Message } from "@/utils/message";

const edit = ref(false);
const editFormRef = ref();
const editForm = reactive({} as OAuth2RegisteredClient);
const rawForm = reactive({} as OAuth2RegisteredClient);

const props = defineProps(["id"]);

const handleSaveEdit = () => {
  if (editForm.scopes === "") {
    Message.warning("访问范围不能为空");
    return;
  }
  const params = getDiffWithIgnore(rawForm, editForm, ["clientId"]);
  UpdateClientAPI(params).then(() => {
    Message.success("操作成功");
    fetchData();
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

const fetchData = () => {
  GetClientInfoAPI(props.id).then((response) => {
    copyParams(editForm, response.data);
    copyParams(rawForm, response.data);
  });
};

onMounted(() => {
  fetchData();
});
</script>
