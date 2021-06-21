<template>
  <el-dialog :title="title" v-model="visible" center>
    <div class="dialog-content">
      <el-form
        ref="editForm"
        class="form"
        label-width="100px"
        label-position="left"
        :model="editForm"
        :rules="rules"
        size="small"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="editForm.name"
            clearable
            placeholder="请输入角色名称"
            class="form-item"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input
            v-model="editForm.code"
            clearable
            placeholder="请输入角色编码"
            class="form-item"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色类型" prop="type">
          <el-input
            v-model="editForm.type"
            clearable
            placeholder="请输入角色类型"
            class="form-item"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="editForm.remark"
            clearable
            placeholder="请输入备注"
            class="form-item"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button
        :loading="loading"
        size="small"
        type="primary"
        @click="handleConfirmClick"
      >
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { RolePageItemVo, SysRole } from "@/model";
import { defineComponent } from "vue";
import { Message } from "@/utils/message";

export default defineComponent({
  props: {
    tenantId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      title: "",
      edit: false,
      visible: false,
      loading: false,
      editForm: {
        id: null,
        name: null,
        code: null,
        type: null,
        remark: null,
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入角色编码", trigger: "blur" }],
        type: [{ required: false }],
        remark: [{ required: false }],
      },
    };
  },
  methods: {
    show(data?: RolePageItemVo) {
      this.visible = true;

      if (data) {
        this.title = "编辑角色";
        this.edit = true;
        Object.assign(this.editForm, data);
      } else {
        this.title = "创建角色";
        this.$nextTick(() => {
          (this.$refs.editForm as any).resetFields();
        });
      }
    },
    handleConfirmClick() {
      (this.$refs.createForm as any).validate((valid: boolean) => {
        if (valid) {
          this.loading = true;
          const params = {};
          Object.assign(params, this.editForm);
          console.log(params);
        }
      });
    },
  },
});
</script>
<style lang="stylus" scoped>
.dialog-content
  display flex
  flex-direction column
  align-items center
</style>
