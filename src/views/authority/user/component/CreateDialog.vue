<template>
  <el-dialog title="创建用户" v-model="visible" fullscreen center>
    <div class="dialog-content">
      <el-form
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
        <el-form-item label="租户" prop="tenant">
          <el-select-v2
            v-model="editForm.tenantId"
            :options="tenantList"
            placeholder="请选择租户"
            size="small"
            clearable
            class="form-item"
          />
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
        <el-form-item label="角色" prop="role">
          <el-select-v2
            v-model="editForm.roleIds"
            :options="roleList"
            placeholder="请选择角色"
            multiple
            size="small"
            clearable
            class="form-item"
          />
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
      <el-button :loading="loading" size="small">确定</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    deptName: {
      type: String,
      default: "",
    },
    deptId: {
      type: String,
      default: "",
    },
    tenantList: {
      type: Array,
      default() {
        return [];
      },
    },
    roleList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: false,
      loading: false,
      editForm: {
        username: "",
        password: "",
        roleIds: [],
        tenantId: null,
        phone: "",
        realName: "",
        email: "",
      },
      rules: {
        tenant: [{ required: true, message: "请选择租户", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请再次输入登录密码", trigger: "blur" },
        ],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
  },
});
</script>
<style lang="stylus" scoped>
.dialog-content
  display flex
  flex-direction column
  align-items center
  .form
    width 50vw
    .form-item
      width 100%
</style>
