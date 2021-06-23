<template>
  <el-dialog title="创建用户" v-model="visible" fullscreen center>
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
import { RolePageItemVo } from "@/model";
import { defineComponent, computed } from "vue";
import { Message } from "@/utils/message";
// import { create } from "@/api/authority/user";

interface Props {
  deptName: string;
  deptId: string;
  roleList: Array<RolePageItemVo>;
}

function setup(props: Props): any {
  return {
    roleRecords: computed(() =>
      props.roleList.map((item) => {
        return { label: item.name, value: item.id };
      })
    ),
  };
}

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
  setup(props) {
    return setup(props as any as Props);
  },
  data() {
    return {
      visible: false,
      loading: false,
      editForm: {
        username: "",
        password: "",
        confirmPassword: "",
        roleIds: [],
        tenantId: null,
        phone: "",
        realName: "",
        email: "",
      },
      rules: {
        tenantId: [{ required: true, message: "请选择租户", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请再次输入登录密码", trigger: "blur" },
        ],
        roleIds: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    handleConfirmClick() {
      (this.$refs.createForm as any).validate((valid: boolean) => {
        if (valid) {
          if (this.editForm.password !== this.editForm.confirmPassword) {
            Message.warning("两次密码不一致");
            return;
          }

          this.loading = true;
          const params = { deptId: this.deptId };
          Object.assign(params, this.editForm);
          console.log(params);
        }
      });
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
