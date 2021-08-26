<template>
  <ingot-container>
    首页
    <div>{{ user.username }}</div>
    <div>{{ roles }}</div>
  </ingot-container>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import {
  user as userComputed,
  roles as rolesComputed,
} from "@/store/composition/auth";
const store = useStore();
const user = userComputed(store);
const roles = rolesComputed(store);
</script>
