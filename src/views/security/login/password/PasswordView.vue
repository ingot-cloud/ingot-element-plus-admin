<template>
  <div class="title-container">密码登录</div>
  <el-form ref="formRef" :model="formModel" :rules="rules" label-width="0px">
    <el-form-item class="form-item" prop="username">
      <el-input
        v-model="formModel.username"
        placeholder="登录名称"
        clearable
        @keyup.enter="handleLogin"
      ></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input
        v-model="formModel.password"
        placeholder="登录密码"
        type="password"
        clearable
        show-password
        @keyup.enter="handleLogin"
      ></el-input>
    </el-form-item>
    <el-form-item class="form-item">
      <in-button
        type="primary"
        class="login-btn"
        @click="handleLogin"
        :loading="loading"
      >
        {{ loading ? "登录中..." : "登录" }}
      </in-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import password from "./password";

const { formModel, rules, loading } = password;
const formRef = ref();
const router = useRouter();

const handleLogin = () => {
  password.handleLogin(formRef, router);
};
</script>
<style lang="postcss" scoped>
.title-container {
  margin-top: 80px;
  margin-bottom: 22px;
  font-size: 18px;
  font-weight: 400;
  color: var(--in-text-color-secondary);
}

.form-item {
  width: 330px;
}

.login-btn {
  width: 100%;
}
</style>
