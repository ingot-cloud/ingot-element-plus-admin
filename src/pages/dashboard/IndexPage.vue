<template>
  <in-container>
    首页
    <div>{{ getUsername }}</div>
    <div>{{ getRoles }}</div>
    <div>{{ getUserInfoWhetherExist }}</div>
    <div>{{ getIsInitPwd }}</div>
  </in-container>
</template>

<script lang="ts" setup>
import { useUserInfoStore } from "@/stores/modules/auth";

const { getUsername, getRoles, getUserInfoWhetherExist, getIsInitPwd } =
  storeToRefs(useUserInfoStore());
</script>
