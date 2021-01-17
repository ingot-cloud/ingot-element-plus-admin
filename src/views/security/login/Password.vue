<template>
  <el-form ref="formRef" :model="formModel" :rules="rules" label-width="0px">
    <el-form-item class="form-item" prop="username">
      <el-input
        v-model="formModel.username"
        placeholder="会员名称"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input
        v-model="formModel.password"
        placeholder="请输入登录密码"
        type="password"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item class="form-item">
      <el-button
        type="primary"
        class="login-btn"
        @click="handleLogin"
        :loading="loading"
      >
        {{ loading ? "登录中..." : "登录" }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import password from "./composition/password";
export default defineComponent({
  setup() {
    const { formModel, rules, loading, handleLogin } = password;
    const formRef = ref();
    return {
      formRef,
      formModel,
      rules,
      loading,
      handleLogin: () => {
        handleLogin(formRef);
      }
    };
  }
});
</script>
<style lang="stylus" scoped>
.form-item
  width 330px
  .login-btn
    width 100%
</style>
