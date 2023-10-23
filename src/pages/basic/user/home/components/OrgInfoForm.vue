<template>
  <div>
    <div class="title-container">组织基本信息</div>
  </div>
</template>
<script setup lang="ts">
import type { UserDTO, UserProfileVO } from "@/models";
import { copyParams } from "@/utils/object";
// import { UserOrgInfoAPI } from "@/api/user";
const userId = ref("");

defineExpose({
  setData(id: string, params: UserProfileVO) {
    userId.value = id;
    console.log(params);
  },
});
</script>
<style scoped lang="postcss">
.title-container {
  font-weight: 500;
  font-size: 12px;
  line-height: 22px;
  padding: 4px 20px;
  background: #f2f2f6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
