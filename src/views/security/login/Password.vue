<template>
  <div class="title-container">密码登录</div>
  <el-form ref="formRef" :model="formModel" :rules="rules" label-width="0px">
    <el-form-item class="form-item" prop="tenant">
      <el-select
        v-model="formModel.tenant"
        @change="onTenantChanged"
        class="select"
      >
        <el-option
          v-for="item in simpleRecords"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
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
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import password from "./biz/password";
import {
  fetchSimpleList,
  computedSimpleRecords,
} from "@/store/composition/tenant";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const { formModel, rules, loading, handleLogin } = password;
    const formRef = ref();
    const router = useRouter();

    const store = useStore();
    const simpleRecords = computedSimpleRecords();

    onMounted(() => {
      fetchSimpleList(store).then((data) => {
        formModel.tenant = data[0].id;
      });
    });

    return {
      formRef,
      formModel,
      rules,
      loading,
      simpleRecords,
      onTenantChanged: (value: string) => {
        formModel.tenant = value;
      },
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
  .select
    width 100%
  .login-btn
    width 100%
</style>
