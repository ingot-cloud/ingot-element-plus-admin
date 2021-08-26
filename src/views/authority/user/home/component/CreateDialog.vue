<template>
  <el-dialog title="创建用户" v-model="visible" center>
    <div class="dialog-content">
      <el-form
        ref="createForm"
        class="form"
        label-width="100px"
        label-position="left"
        :model="editForm"
        :rules="rules"
        size="small"
      >
        <el-form-item label="部门名称">
          {{ deptName }}
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="editForm.username"
            clearable
            placeholder="请输入用户名"
            class="form-item"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="editForm.password"
            clearable
            placeholder="请输入密码"
            class="form-item"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="editForm.confirmPassword"
            clearable
            placeholder="请再次输入密码"
            class="form-item"
            type="password"
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
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
      </el-form>
    </div>
    <template #footer>
      <el-button
        :loading="loading"
        size="small"
        type="primary"
        @click="handleConfirmClick"
        >确定</el-button
      >
    </template>
  </el-dialog>
</template>
<script lang="ts">
export interface API {
  show(): void;
}
</script>
<script lang="ts" setup>
import { RolePageItemVo } from "@/model";
import {
  defineProps,
  defineEmits,
  defineExpose,
  computed,
  ref,
  reactive,
  unref,
  nextTick,
  PropType,
} from "vue";
import { Message } from "@/utils/message";
import { copyParamsWithKeys, copyParams } from "@/utils/object";
import { create } from "@/api/authority/user";

const keys = ["username", "roleIds", "phone", "realName", "email"];

interface CreateUser {
  username?: string;
  password?: string;
  confirmPassword?: string;
  roleIds?: Array<string>;
  phone?: string;
  realName?: string;
  email?: string;
}

const defaultEditForm: CreateUser = {
  username: undefined,
  password: undefined,
  confirmPassword: undefined,
  roleIds: [],
  phone: undefined,
  realName: undefined,
  email: undefined,
};

const emits = defineEmits(["success"]);
const props = defineProps({
  deptName: {
    type: String,
    default: "",
  },
  deptId: {
    type: String,
    default: "",
  },
  roleList: {
    type: Array as PropType<Array<RolePageItemVo>>,
    default: () => [],
  },
});

const visible = ref(false);
const loading = ref(false);
const editForm = reactive(Object.assign({}, defaultEditForm));
const createForm = ref();

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请再次输入登录密码", trigger: "blur" },
  ],
  roleIds: [{ required: true, message: "请选择角色", trigger: "blur" }],
};

const roleRecords = computed(() =>
  props.roleList.map((item) => {
    return { label: item.name, value: item.id };
  })
);

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
        deptId: (props as any).deptId,
        newPassword: editForm.password,
      };
      copyParamsWithKeys(params, editForm, keys);
      create(params)
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
<style lang="stylus" scoped>
.dialog-content
  display flex
  flex-direction column
  align-items center
  .form
    width 100%
    .form-item
      width 100%
</style>
