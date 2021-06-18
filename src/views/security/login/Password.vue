<template>
  <div class="title-container">密码登录</div>
  <el-form ref="formRef" :model="formModel" :rules="rules" label-width="0px">
    <el-form-item class="form-item" prop="username">
      <el-input
        v-model="formModel.username"
        placeholder="会员名称"
        clearable
        @keyup.enter="handleLogin"
      ></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input
        v-model="formModel.password"
        placeholder="请输入登录密码"
        type="password"
        clearable
        @keyup.enter="handleLogin"
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
import { useRouter } from "vue-router";
import password from "./biz/password";
export default defineComponent({
  setup() {
    const { formModel, rules, loading, handleLogin } = password;
    const formRef = ref();

    const router = useRouter();

    return {
      formRef,
      formModel,
      rules,
      loading,
      handleLogin: () => {
        handleLogin(formRef, router);
      },
    };
  },
});
</script>
<style lang="stylus" scoped>
.title-container
  margin-top 80px
  margin-bottom 22px
  font-size 18px
  font-weight 400
  color #373d41
.form-item
  width 330px
  .login-btn
    width 100%
</style>
