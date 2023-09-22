<template>
  <in-drawer :title="title" v-model="show">
    <el-form
      v-loading="loading"
      ref="editFormRef"
      label-width="100px"
      label-position="right"
      :model="editForm"
      :rules="rules"
    >
      <el-form-item label="头像">
        <in-common-upload-avatar
          dir="public/user/avatar"
          v-model="editForm.avatar"
        />
      </el-form-item>

      <el-form-item label="名称" prop="nickname">
        <el-input
          v-model="editForm.nickname"
          clearable
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="部门" prop="deptIds">
        <el-tree-select
          w-full
          v-model="editForm.deptIds"
          multiple
          :data="deptTree"
          :node-key="TreeKeyAndProps.nodeKey"
          :value-key="TreeKeyAndProps.nodeKey"
          :props="TreeKeyAndProps.props"
          :check-strictly="true"
        />
      </el-form-item>

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

      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="editForm.username"
          clearable
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="newPassword">
        <el-input
          v-model="editForm.newPassword"
          clearable
          placeholder="请输入新密码"
          show-password
          type="password"
        ></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="editForm.phone"
          clearable
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>

      <el-form-item label="email" prop="email">
        <el-input
          v-model="editForm.email"
          clearable
          placeholder="请输入email"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <in-button type="primary" @click="handleActionButton">确定</in-button>
    </template>
  </in-drawer>
</template>
<script setup lang="ts">
import type { UserPageItemVO } from "@/models";
import { UpdateUserAPI, UserProfileAPI, CreateUserAPI } from "@/api/basic/user";
import { TreeKeyAndProps } from "@/models";
import { useRoleStore } from "@/stores/modules/role";
import { useDeptStore } from "@/stores/modules/dept";
import { Message } from "@/utils/message";
import { copyParamsWithKeys, getDiffWithIgnore } from "@/utils/object";

const rawForm = {
  id: undefined,
  deptIds: [],
  roleIds: [],
  username: undefined,
  newPassword: undefined,
  nickname: undefined,
  phone: undefined,
  email: undefined,
  avatar: undefined,
  createdAt: undefined,
};

const keys = [
  "deptIds",
  "roleIds",
  "username",
  "newPassword",
  "nickname",
  "phone",
  "email",
  "avatar",
  "createdAt",
];

const title = ref("");
const show = ref(false);
const userId = ref();

const rules = {
  deptIds: [{ required: true, message: "请选择部门", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  roleIds: [{ required: true, message: "请选择角色", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  nickname: [{ required: true, message: "请输入名称", trigger: "blur" }],
};

const emits = defineEmits(["success"]);

const deptStore = useDeptStore();
const roleStore = useRoleStore();
const { deptTree } = storeToRefs(deptStore);
const { roleOptions } = storeToRefs(roleStore);

const editFormRef = ref();
const editForm = reactive(Object.assign({}, rawForm));
const rawEditForm = Object.assign({}, rawForm);
const loading = ref(false);
const isEdit = ref(false);

const handleActionButton = () => {
  const form = unref(editFormRef);
  form.validate((valid: boolean) => {
    if (valid) {
      const params = getDiffWithIgnore(rawEditForm, editForm);
      if (Object.keys(params).length === 0) {
        Message.warning("未改变数据");
        return;
      }
      let request;
      if (isEdit.value) {
        params.id = userId.value;
        request = UpdateUserAPI(params);
      } else {
        request = CreateUserAPI(params);
      }

      loading.value = true;
      request
        .then(() => {
          Message.success("操作成功");
          emits("success");
          show.value = false;
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
};

const fetchData = (id: string) => {
  loading.value = true;
  UserProfileAPI(id)
    .then((response) => {
      loading.value = false;

      copyParamsWithKeys(editForm, response.data, keys);
      copyParamsWithKeys(rawEditForm, response.data, keys);
    })
    .catch(() => {
      loading.value = false;
    });
};

onMounted(() => {
  deptStore.fetchDeptTree();
  roleStore.fetchRoleOptions();
});

defineExpose({
  show(data?: UserPageItemVO) {
    isEdit.value = Boolean(data);
    show.value = true;
    nextTick(() => {
      const form = unref(editFormRef);
      form.resetFields();

      if (isEdit.value) {
        title.value = data?.nickname!;
        userId.value = data?.userId!;
        fetchData(userId.value);
      } else {
        title.value = "添加成员";
        copyParamsWithKeys(editForm, rawForm, keys);
        copyParamsWithKeys(rawEditForm, rawForm, keys);
      }
    });
  },
});
</script>
