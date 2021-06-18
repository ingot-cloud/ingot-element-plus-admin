<template>
  <el-dialog title="创建用户" v-model="visible" fullscreen>
    <el-form
      label-width="100px"
      label-position="left"
      :model="editForm"
      size="small"
    >
      <el-form-item label="部门名称">
        {{ deptName }}
      </el-form-item>
      <el-form-item label="租户" prop="tenant">
        <el-select-v2
          v-model="editForm.tenantId"
          :options="tenantList"
          placeholder="请选择"
          style="width: 200px;"
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
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="confirmPassword">
        <el-input
          v-model="editForm.confirmPassword"
          clearable
          placeholder="请再次输入密码"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :loading="loading" size="small">确定</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    deptName: {
      type: String,
      default: '',
    },
    deptId: {
      type: String,
      default: '',
    },
    tenantList: {
      type: Array,
      default() {
        return []
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
        username: '',
        password: '',
        roleIds: null,
        tenantId: null,
        phone: '',
        realName: '',
        email: '',
      },
    }
  },
  methods: {
    show() {
      this.visible = true
    },
  },
})
</script>
