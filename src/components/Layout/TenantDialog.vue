<template>
  <el-dialog title="请选择租户" v-model="visible" center>
    <div class="dialog-content">
      <ingot-tenant-options size="small" />
    </div>
  </el-dialog>
</template>
<script lang="ts">
export interface API {
  show(): void;
}
</script>
<script lang="ts" setup>
import { defineExpose, ref } from "vue";

const visible = ref(false);
const show = () => {
  visible.value = true;
};
defineExpose({
  show,
});
</script>
<style lang="stylus" scoped>
.dialog-content
  display flex
  flex-direction column
  align-items center
</style>
