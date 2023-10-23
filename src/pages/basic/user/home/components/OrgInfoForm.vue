<template>
  <div>
    <div class="title-container">
      <div>组织基本信息</div>
      <div>
        <div v-if="!editFlag" class="edit" @click="editFlag = true">编辑</div>
        <div v-else class="cancel" @click="editFlag = false">取消</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UserDTO, UserProfileVO } from "@/models";
import { copyParams } from "@/utils/object";
// import { UserOrgInfoAPI } from "@/api/user";

const userId = ref("");
const editFlag = ref(false);

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

  & .edit {
    cursor: pointer;
    color: var(--in-color-primary);
  }
  & .cancel {
    cursor: pointer;
    color: var(--in-color-danger);
  }
}
</style>
