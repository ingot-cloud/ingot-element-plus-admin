<template>
  <el-dialog title="请选择租户" v-model="visible" center>
    <div class="dialog-content">
      <ingot-tenant-options size="small" />
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const visible = ref(false);
    return {
      visible,
      show: () => {
        visible.value = true;
      },
    };
  },
});
</script>
<style lang="stylus" scoped>
.dialog-content
  display flex
  flex-direction column
  align-items center
</style>
