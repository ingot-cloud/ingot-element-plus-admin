<template>
  <div class="password-box">
    <div class="title-container">
      <img class="logo-image" src="@/assets/logo.png" />
      <div class="login-title">{{ app.login.title }}</div>
      <div class="login-desc">{{ app.login.desc }}</div>
    </div>

    <div class="login-container">
      <el-input
        class="login-input"
        v-model="formModel.username"
        placeholder="请输入账号"
        clearable
        @keyup.enter="handleLogin"
      ></el-input>
      <el-input
        class="login-input"
        v-model="formModel.password"
        placeholder="请输入密码"
        type="password"
        clearable
        show-password
        @keyup.enter="handleLogin"
      >
        <template #append>
          <div class="forgot">忘记密码</div>
        </template>
      </el-input>
      <in-button
        type="primary"
        class="login-btn"
        @click="handleLogin"
        :loading="loading"
        :disabled="!canLogin"
      >
        {{ loading ? "登录中..." : "登录" }}
      </in-button>
    </div>
  </div>
  <Verify
    @success="verifySuccess"
    :mode="'pop'"
    :captchaType="'blockPuzzle'"
    :imgSize="{ width: '330px', height: '155px' }"
    ref="VerifyRef"
  />
</template>
<script lang="ts" setup>
import { useAppStore } from "@/stores/modules/app";
import password from "./password";

const { app } = useAppStore();

const { formModel, rules, loading } = password;
const formRef = ref();
const router = useRouter();
const canLogin = computed(() => {
  return formModel.username.length > 0 && formModel.password.length > 0;
});
const VerifyRef = ref(); // 定义verify组件引用

const handleLogin = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      VerifyRef.value.show();
    }
  });
};

// 滑块验证码校验成功调用后台登录接口
const verifySuccess = (params: any) => {
  formModel.code = params.captchaVerification;
  password.handleLogin(formRef, router);
};
</script>
<style lang="postcss" scoped>
.password-box {
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .title-container {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 45px;
    color: var(--in-text-color-secondary);
    display: flex;
    flex-direction: column;
    align-items: center;

    & .logo-image {
      width: 48px;
      height: 48px;
    }

    & .login-title {
      margin: 10px auto 0;
      line-height: 30px;
      font-size: 20px;
      color: #171a1d;
      text-align: center;
      font-weight: bold;
    }

    & .login-desc {
      margin: 0 auto;
      line-height: 30px;
      font-size: 16px;
      color: #171a1d;
      text-align: center;
    }
  }

  & .login-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    grid-gap: 12px;
    width: 310px;

    & .login-input {
      --el-input-bg-color: #f2f2f6;
      --el-fill-color-light: #f2f2f6;
      --el-border-color: #00000000;
      --el-color-danger: #00000000;
      --el-input-hover-border-color: #00000000;
      --el-input-focus-border-color: #00000000;

      height: var(--login-item-height);
      border-radius: 8px;

      & .el-input-group__append {
      }
      & .forgot {
        height: var(--login-item-height);
        line-height: var(--login-item-height);
        font-size: 14px;
        color: rgba(23, 26, 29, 0.6);
        text-align: center;
        cursor: pointer;
      }
    }

    & .login-btn {
      --el-button-disabled-bg-color: var(--in-color-primary);
      --el-button-disabled-text-color: rgba(255, 255, 255, 0.4);

      width: 100%;
      height: var(--login-item-height);
      font-size: 16px;
      border-radius: 8px;
    }
  }
}
</style>
