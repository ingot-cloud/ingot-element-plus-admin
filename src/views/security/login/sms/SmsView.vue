<template>
  <div class="title-container">短信登录</div>
  <el-form ref="formRef" :model="formModel" :rules="rules" label-width="0px">
    <el-form-item class="form-item" prop="phone">
      <el-input
        v-model="formModel.phone"
        placeholder="手机号"
        clearable
        @keyup.enter="handleLogin"
      ></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="code">
      <el-input
        v-model="formModel.code"
        placeholder="验证码"
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
import sms from "./sms";

const { formModel, rules, loading } = sms;
const formRef = ref();
const router = useRouter();

const handleLogin = () => {
  sms.handleLogin(formRef, router);
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
