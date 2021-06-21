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
        <el-form-item label="租户名称" prop="name">
          <el-input
            v-model="editForm.name"
            clearable
            placeholder="请输入租户名称"
            class="form-item"
          ></el-input>
        </el-form-item>
        <el-form-item label="租户编码" prop="code">
          <el-input
            v-model="editForm.code"
            clearable
            placeholder="请输入租户编码"
            class="form-item"
          ></el-input>
        </el-form-item>
        <el-form-item label="周期" prop="daterange">
          <el-date-picker
            v-model="editForm.daterange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            @change="onDaterangeChanged"
          >
          </el-date-picker>
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
import { SysTenant } from "@/model";
import { defineComponent } from "vue";
import { create, update } from "@/store/composition/tenant";
import { store } from "@/store";
import Message from "@/utils/message";

export default defineComponent({
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
        startAt: null,
        endAt: null,
        daterange: ["", ""],
      },
      rules: {
        name: [{ required: true, message: "请输入租户名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入租户编码", trigger: "blur" }],
        daterange: [{ required: false }],
      },
    };
  },
  methods: {
    show(data?: SysTenant) {
      this.visible = true;

      if (data) {
        this.title = "编辑租户";
        this.edit = true;
        Object.assign(this.editForm, data);
        if (data.startAt && data.endAt) {
          this.editForm.daterange = [data.startAt, data.endAt];
        }
      } else {
        this.title = "创建租户";
        this.$nextTick(() => {
          (this.$refs.editForm as any).resetFields();
        });
      }
    },
    handleConfirmClick() {
      (this.$refs.editForm as any).validate((valid: boolean) => {
        if (valid) {
          this.loading = true;
          const params: SysTenant = {};
          Object.assign(params, this.editForm);
          if (this.editForm.daterange && this.editForm.daterange.length > 1) {
            params.startAt = this.editForm.daterange[0];
            params.endAt = this.editForm.daterange[1];
          } else {
            params.startAt = undefined;
            params.endAt = undefined;
          }

          const request = this.edit
            ? update(store, params)
            : create(store, params);

          request
            .then(() => {
              this.loading = false;
              Message.success("操作成功");
              this.visible = false;
              this.$emit("success");
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    onDaterangeChanged(value: any) {
      console.log(value);
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
