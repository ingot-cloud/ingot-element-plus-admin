<template>
  <in-container>
    首页
    <div>{{ getUsername }}</div>
    <div>{{ getRoles }}</div>
    <div>{{ getUserInfoWhetherExist }}</div>
  </in-container>
</template>

<script lang="ts" setup>
import { useUserInfoStore } from "@/stores/modules/auth";
import { storeToRefs } from "pinia";

const { getUsername, getRoles, getUserInfoWhetherExist } = storeToRefs(
  useUserInfoStore()
);
</script>
