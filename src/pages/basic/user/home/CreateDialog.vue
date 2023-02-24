<template>
  <in-dialog title="创建用户" v-model="visible">
    <el-form
      ref="createForm"
      label-width="100px"
      label-position="left"
      :model="editForm"
      :rules="rules"
    >
      <el-form-item label="部门名称">
        <el-tree-select
          w-full
          v-model="editForm.deptId"
          :data="deptTree"
          :node-key="TreeKeyAndProps.nodeKey"
          :value-key="TreeKeyAndProps.nodeKey"
          :props="TreeKeyAndProps.props"
          :check-strictly="true"
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
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="editForm.password"
          clearable
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="editForm.confirmPassword"
          clearable
          placeholder="请再次输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roleIds">
        <in-select
          w-full
          v-model="editForm.roleIds"
          placeholder="请选择角色"
          :options="roleList"
          multiple
          clearable
        />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input
          v-model="editForm.nickname"
          clearable
          placeholder="请输入昵称"
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
      <in-button :loading="loading" type="primary" @click="handleConfirmClick">
        确定
      </in-button>
    </template>
  </in-dialog>
</template>
<script lang="ts">
export interface API {
  show(): void;
}
</script>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { Option } from "@/models";
import { TreeKeyAndProps } from "@/models";
import { Message } from "@/utils/message";
import { copyParamsWithKeys, copyParams } from "@/utils/object";
import { CreateUserAPI } from "@/api/basic/user";
import { useDeptStore } from "@/stores/modules/dept";

const keys = ["username", "roleIds", "phone", "nickname", "email"];

interface CreateUser {
  username?: string;
  password?: string;
  confirmPassword?: string;
  roleIds?: Array<string>;
  phone?: string;
  nickname?: string;
  email?: string;
  deptId?: string;
}

const defaultEditForm: CreateUser = {
  username: undefined,
  password: undefined,
  confirmPassword: undefined,
  roleIds: [],
  phone: undefined,
  nickname: undefined,
  email: undefined,
  deptId: undefined,
};

const emits = defineEmits(["success"]);
defineProps({
  deptName: {
    type: String,
    default: "",
  },
  deptId: {
    type: String,
    default: "",
  },
  roleList: {
    type: Array as PropType<Array<Option<string>>>,
    default: () => [],
  },
});

const visible = ref(false);
const loading = ref(false);
const editForm = reactive(Object.assign({}, defaultEditForm));
const createForm = ref();
const deptStore = useDeptStore();
const { deptTree } = storeToRefs(deptStore);

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请再次输入登录密码", trigger: "blur" },
  ],
  roleIds: [{ required: true, message: "请选择角色", trigger: "blur" }],
};

const show = () => {
  visible.value = true;
  copyParams(editForm, defaultEditForm);
  nextTick(() => {
    const form = unref(createForm);
    form.clearValidate();
  });
};

const handleConfirmClick = () => {
  const form = unref(createForm);
  form.validate((valid: boolean) => {
    if (valid) {
      if (editForm.password !== editForm.confirmPassword) {
        Message.warning("两次密码不一致");
        return;
      }
      loading.value = true;
      const params = {
        newPassword: editForm.password,
      };
      copyParamsWithKeys(params, editForm, keys);
      CreateUserAPI(params)
        .then(() => {
          loading.value = false;
          visible.value = false;
          Message.success("操作成功");
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
