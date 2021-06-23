<template>
  <el-dialog :title="title" v-model="visible" center>
    <div class="dialog-content">
      <el-form
        ref="editFormRef"
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
            :disabled="edit"
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
import { defineComponent, reactive, ref, nextTick, unref, toRaw } from "vue";
import { create, update } from "@/store/composition/tenant";
import { store } from "@/store";
import { Message } from "@/utils/message";
import { copyParams } from "@/utils/object";

const rules = {
  name: [{ required: true, message: "请输入租户名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入租户编码", trigger: "blur" }],
  daterange: [{ required: false }],
};

const defaultEditForm = {
  id: null,
  name: null,
  code: null,
  startAt: null,
  endAt: null,
  daterange: ["", ""],
};

export default defineComponent({
  emits: ["success"],
  setup(_, { emit }) {
    const editFormRef = ref();
    const editForm = reactive(Object.assign({}, defaultEditForm));
    const loading = ref(false);
    const title = ref("");
    const edit = ref(false);
    const visible = ref(false);

    return {
      editFormRef,
      title,
      edit,
      visible,
      loading,
      editForm,
      rules,
      show: (data?: SysTenant) => {
        visible.value = true;

        // 重置数据
        copyParams(defaultEditForm, editForm);
        nextTick(() => {
          const form = unref(editFormRef);
          form.clearValidate();
        });

        if (data) {
          title.value = "编辑租户";
          edit.value = true;
          Object.assign(editForm, data);
          if (data.startAt && data.endAt) {
            editForm.daterange = [data.startAt, data.endAt];
          }
        } else {
          title.value = "创建租户";
          edit.value = false;
        }
      },
      handleConfirmClick() {
        const form = unref(editFormRef);
        form.validate((valid: boolean) => {
          if (valid) {
            loading.value = true;
            const params: SysTenant = {};
            Object.assign(params, toRaw(editForm));
            if (editForm.daterange && editForm.daterange.length > 1) {
              params.startAt = editForm.daterange[0];
              params.endAt = editForm.daterange[1];
            } else {
              params.startAt = undefined;
              params.endAt = undefined;
            }

            const request = edit.value
              ? update(store, params)
              : create(store, params);

            request
              .then(() => {
                loading.value = false;
                Message.success("操作成功");
                visible.value = false;
                emit("success");
              })
              .catch(() => {
                loading.value = false;
              });
          }
        });
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
