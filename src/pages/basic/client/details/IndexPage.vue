<template>
  <in-container>
    <in-page-header @back="$router.back()">
      <template #title>
        <div>客户端编辑</div>
      </template>
      <template #action>
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
      </template>

      <el-form
        m-t-20px
        p-20px
        ref="editFormRef"
        label-width="200px"
        label-position="right"
        :model="editForm"
        :disabled="!edit"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户端ID" prop="clientId">
              <el-input
                disabled
                v-model="editForm.clientId"
                placeholder="请输入客户端ID"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户端秘钥" prop="clientSecret">
              <el-input
                v-model="editForm.clientSecret"
                disabled
                placeholder="请输入客户端秘钥"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户端名称" prop="clientName">
              <el-input
                v-model="editForm.clientName"
                disabled
                placeholder="请输入客户端名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider />

        <el-row>
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
          <el-col :span="12">
            <el-form-item label="重定向URL">
              <el-input
                v-model="editForm.redirectUris"
                clearable
                placeholder="请输入重定向URL"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="Client认证方式">
              <in-select
                w-full
                v-model="editForm.clientAuthenticationMethods"
                :options="useClientAuthMethodEnum.getOptions()"
                placeholder="请选择Client认证方式"
                split=","
                multiple
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="授权授予类型">
              <in-select
                w-full
                v-model="editForm.authorizationGrantTypes"
                :options="useAuthorizedGrantTypeEnum.getOptions()"
                placeholder="请选择允许授予类型"
                split=","
                multiple
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="访问Token失效时间">
              <el-input
                v-model="editForm.accessTokenTimeToLive"
                clearable
                type="number"
                placeholder="请输入访问Token失效时间"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Token认证类型">
              <in-select
                w-full
                v-model="editForm.tokenAuthType"
                :options="useTokenAuthMethodEnum.getOptions()"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="grantRefreshToken">
            <el-form-item label="刷新Token失效时间">
              <el-input
                v-model="editForm.refreshTokenTimeToLive"
                clearable
                type="number"
                placeholder="请输入刷新Token失效时间"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="grantRefreshToken">
            <el-form-item label="重复使用刷新Token">
              <el-switch v-model="editForm.reuseRefreshTokens" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6" v-if="grantCode">
            <el-form-item label="需要提供验证密钥质询和验证器">
              <el-switch v-model="editForm.requireProofKey" />
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="grantCode">
            <el-form-item label="需要授权同意">
              <el-switch v-model="editForm.requireAuthorizationConsent" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </in-page-header>
  </in-container>
</template>
<script lang="ts" setup>
import type { OAuth2RegisteredClient } from "@/models";
import {
  useTokenAuthMethodEnum,
  useAuthorizedGrantTypeEnum,
  AuthorizedGrantType,
  useClientAuthMethodEnum,
} from "@/models/enums";
import { GetClientInfoAPI, UpdateClientAPI } from "@/api/basic/client";
import { copyParams, getDiffWithIgnore } from "@/utils/object";
import { Message } from "@/utils/message";

const defaultEditForm: OAuth2RegisteredClient = {
  id: undefined,
  clientId: undefined,
  clientIdIssuedAt: undefined,
  clientSecret: undefined,
  clientName: undefined,
  clientAuthenticationMethods: undefined,
  authorizationGrantTypes: undefined,
  redirectUris: undefined,
  scopes: undefined,
  requireProofKey: undefined,
  requireAuthorizationConsent: undefined,
  accessTokenTimeToLive: undefined,
  reuseRefreshTokens: undefined,
  refreshTokenTimeToLive: undefined,
  idTokenSignatureAlgorithm: undefined,
  tokenAuthType: undefined,
  status: undefined,
};

const edit = ref(false);
const editFormRef = ref();
const editForm = reactive(Object.assign({}, defaultEditForm));
const rawForm = reactive(Object.assign({}, defaultEditForm));

const props = defineProps(["id"]);

const handleSaveEdit = () => {
  if (editForm.scopes === "") {
    Message.warning("访问范围不能为空");
    return;
  }
  console.log(rawForm);
  console.log(editForm);
  const params = getDiffWithIgnore(rawForm, editForm, ["id"]);

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
