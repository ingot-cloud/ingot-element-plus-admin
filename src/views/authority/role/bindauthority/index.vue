<template>
  <ingot-container>
    <ingot-page-card @back="$router.back()"> 绑定用户 </ingot-page-card>
  </ingot-container>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
defineProps(["id"]);
</script>
