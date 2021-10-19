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
            <el-form-item label="秘钥" prop="clientSecret">
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
            <el-form-item label="资源ID" prop="resourceId">
              <el-input
                v-model="editForm.resourceId"
                disabled
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
import { defineProps, reactive, ref, onMounted } from "vue";
import {
  OAuth2RegisteredClient,
  getAuthTypeSelectList,
  grantTypeList,
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
  const params = getDiffWithIgnore(rawForm, editForm, ["clientId"]);
  update(params).then(() => {
    Message.success("操作成功");
  });
};

const handleCancelEdit = () => {
  edit.value = false;
  copyParams(editForm, rawForm);
};

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
