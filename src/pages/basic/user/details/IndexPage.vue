<template>
  <in-container>
    <in-page-header @back="$router.back()">
      <template #title> 用户详情 </template>
      <template #action>
        <div>
          <in-button
            type="primary"
            :loading="loading"
            @click="handleActionButton"
          >
            {{ editDisabled ? "编辑" : "确定" }}
          </in-button>
          <in-button
            type="danger"
            v-if="!editDisabled"
            @click="handleCancelButton"
          >
            取消
          </in-button>
        </div>
      </template>

      <el-form
        m-t-12px
        ref="editFormRef"
        label-width="100px"
        label-position="right"
        :model="editForm"
        :rules="rules"
        :disabled="editDisabled"
      >
        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="6">
            <el-form-item label="部门名称">
              <el-tree-select
                w-full
                v-model="editForm.deptId"
                :data="deptTree"
                :node-key="TreeKeyAndProps.nodeKey"
                :value-key="TreeKeyAndProps.nodeKey"
                :props="TreeKeyAndProps.props"
                :check-strictly="true"
              />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="editForm.username"
                clearable
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="6">
            <el-form-item label="角色" prop="roleIds">
              <in-select
                w-full
                v-model="editForm.roleIds"
                placeholder="请选择角色"
                :options="roleOptions"
                multiple
                clearable
              />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="密码" prop="newPassword">
              <el-input
                v-model="editForm.newPassword"
                clearable
                placeholder="请输入新密码"
                show-password
                type="password"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="6">
            <el-form-item label="昵称" prop="nickname">
              <el-input
                v-model="editForm.nickname"
                clearable
                placeholder="请输入昵称"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="editForm.phone"
                clearable
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="6">
            <el-form-item label="email" prop="email">
              <el-input
                v-model="editForm.email"
                clearable
                placeholder="请输入email"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="editForm.status">
                <el-radio-button label="0">正常</el-radio-button>
                <el-radio-button label="9">锁定</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </in-page-header>
  </in-container>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, reactive, unref } from "vue";
import { UserProfileAPI, UpdateUserAPI } from "@/api/basic/user";
import { TreeKeyAndProps } from "@/models";
import { useRoleStore } from "@/stores/modules/role";
import { useDeptStore } from "@/stores/modules/dept";
import { Message } from "@/utils/message";
import { copyParamsWithKeys, getDiffWithIgnore } from "@/utils/object";

const rawForm = {
  id: undefined,
  deptId: undefined,
  roleIds: [],
  username: undefined,
  newPassword: undefined,
  nickname: undefined,
  phone: undefined,
  email: undefined,
  status: undefined,
  createdAt: undefined,
};

const keys = [
  "deptId",
  "roleIds",
  "username",
  "newPassword",
  "nickname",
  "phone",
  "email",
  "status",
  "createdAt",
];

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  roleIds: [{ required: true, message: "请选择角色", trigger: "blur" }],
};

const props = defineProps(["id"]);
const deptStore = useDeptStore();
const roleStore = useRoleStore();
const { deptTree } = storeToRefs(deptStore);
const { roleOptions } = storeToRefs(roleStore);

const editDisabled = ref(true);
const editFormRef = ref();
const editForm = reactive(rawForm);
const rawEditForm = Object.assign({}, rawForm);
const loading = ref(false);

const refreshProfile = () => {
  UserProfileAPI(props.id).then((response) => {
    copyParamsWithKeys(editForm, response.data, keys);
    copyParamsWithKeys(rawEditForm, response.data, keys);
  });
};

const handleCancelButton = () => {
  editDisabled.value = true;
  copyParamsWithKeys(editForm, rawEditForm, keys);
};

const handleActionButton = () => {
  if (editDisabled.value) {
    editDisabled.value = false;
    return;
  }
  const form = unref(editFormRef);
  form.validate((valid: boolean) => {
    if (valid) {
      const params = getDiffWithIgnore(rawEditForm, editForm);
      if (Object.keys(params).length === 0) {
        Message.warning("未改变数据");
        return;
      }
      params.id = props.id;
      loading.value = true;
      UpdateUserAPI(params)
        .then(() => {
          Message.success("操作成功");
          loading.value = false;
          editDisabled.value = true;
          refreshProfile();
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
};

onMounted(() => {
  deptStore.fetchDeptTree();
  roleStore.fetchRoleOptions();
  refreshProfile();
});
</script>
