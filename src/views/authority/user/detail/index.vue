<template>
  <ingot-container>
    <ingot-page-card @back="$router.back()">
      <div class="content">
        <el-form
          ref="editFormRef"
          class="form"
          label-width="100px"
          label-position="left"
          :model="editForm"
          :rules="rules"
          size="small"
          :disabled="editDisabled"
        >
          <el-form-item label="部门名称">
            <el-select
              v-model="editForm.deptId"
              placeholder="请选择部门"
              size="small"
              clearable
              class="form-item"
            >
              <el-option
                v-for="item in deptRecords"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="editForm.username"
              clearable
              placeholder="请输入用户名"
              class="form-item"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="roleIds">
            <el-select
              v-model="editForm.roleIds"
              placeholder="请选择角色"
              multiple
              size="small"
              clearable
              class="form-item"
            >
              <el-option
                v-for="item in roleRecords"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="newPassword">
            <el-input
              v-model="editForm.newPassword"
              clearable
              placeholder="请输入密码"
              class="form-item"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="realName">
            <el-input
              v-model="editForm.realName"
              clearable
              placeholder="请输入姓名"
              class="form-item"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="editForm.phone"
              clearable
              placeholder="请输入手机号"
              class="form-item"
            ></el-input>
          </el-form-item>
          <el-form-item label="email" prop="email">
            <el-input
              v-model="editForm.email"
              clearable
              placeholder="请输入email"
              class="form-item"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="editForm.status">
              <el-radio-button label="0">正常</el-radio-button>
              <el-radio-button label="9">锁定</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <div>
          <el-button
            size="small"
            type="success"
            :loading="loading"
            @click="handleActionButton"
          >
            {{ editDisabled ? "编辑" : "确定" }}
          </el-button>
          <el-button
            size="small"
            type="danger"
            v-if="!editDisabled"
            @click="editDisabled = true"
          >
            取消
          </el-button>
        </div>
      </div>
    </ingot-page-card>
  </ingot-container>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, ref, reactive, unref } from "vue";
import { userProfile, update } from "@/api/authority/user";
import {
  fetchCacheData as fetchRoleData,
  computedRecords as computedRoleRecords,
} from "@/store/composition/role";
import { fetchDeptTree, computedList } from "@/store/composition/dept";
import { useStore } from "@/store";
import { Message } from "@/utils/message";
import { copyParamsWithKeys } from "@/utils/object";

const rawForm = {
  deptId: null,
  roleIds: [],
  username: null,
  newPassword: null,
  realName: null,
  phone: null,
  email: null,
  status: null,
  createdAt: null,
};

const keys = [
  "deptId",
  "roleIds",
  "username",
  "newPassword",
  "realName",
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
const store = useStore();
const deptRecords = computedList();
const roleRecords = computedRoleRecords();
const editDisabled = ref(true);

const editFormRef = ref();
const editForm = reactive(rawForm);
const loading = ref(false);

const refreshProfile = () => {
  userProfile(props.id).then((response) => {
    copyParamsWithKeys(editForm, response.data, keys);
  });
};

const handleActionButton = () => {
  if (editDisabled.value) {
    editDisabled.value = false;
    return;
  }
  const form = unref(editFormRef);
  form.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;

      const params = { id: props.id };
      copyParamsWithKeys(params, editForm, keys);

      update(params)
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
  fetchDeptTree(store);
  fetchRoleData(store);
  refreshProfile();
});
</script>
<style lang="stylus" scoped>
.content
  display flex
  flex-direction column
  align-items center
  .form
    width 50%
</style>
