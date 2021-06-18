<template>
  <el-dialog title="创建用户" v-model="visible" fullscreen>
    <el-form label-width="100px" size="small">
      <el-form-item label="用户名">
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :loading="loading">确定</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    deptName: {
      type: String,
      default: ""
    },
    deptId: {
      type: String,
      default: ""
    },
    roleList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      visible: false,
      loading: false
    };
  },
  methods: {
    show() {
      this.visible = true;
    }
  }
});
</script>
