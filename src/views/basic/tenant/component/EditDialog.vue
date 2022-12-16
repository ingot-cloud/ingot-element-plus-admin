<template>
  <el-dialog
    :title="title"
    v-model="visible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    center
    width="600"
  >
    <div flex flex-col items-center>
      <el-form
        ref="editFormRef"
        :inline="true"
        inline-message
        label-width="80px"
        label-position="right"
        :model="editForm"
        :rules="rules"
      >
        <div>
          <el-form-item label="租户名称" prop="name">
            <el-input
              v-model="editForm.name"
              clearable
              placeholder="请输入租户名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="租户编码" prop="code">
            <el-input
              :disabled="edit"
              v-model="editForm.code"
              clearable
              placeholder="请输入租户编码"
            ></el-input>
          </el-form-item>
        </div>

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
import type { SysTenant as P } from "@/models";
export interface API {
  show(data?: P): void;
}
</script>
<script lang="ts" setup>
import type { SysTenant } from "@/models";
import {
  defineEmits,
  defineExpose,
  reactive,
  ref,
  nextTick,
  unref,
  toRaw,
} from "vue";
import { Message } from "@/utils/message";
import { copyParams } from "@/utils/object";
import { useTenant } from "@/stores/modules/tenant";

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

const emits = defineEmits(["success"]);

const editFormRef = ref();
const editForm = reactive(Object.assign({}, defaultEditForm));
const loading = ref(false);
const title = ref("");
const edit = ref(false);
const visible = ref(false);
const tenantStore = useTenant();

const show = (data?: SysTenant) => {
  visible.value = true;

  // 重置数据
  copyParams(editForm, defaultEditForm);
  nextTick(() => {
    const form = unref(editFormRef);
    form.clearValidate();
  });

  if (data) {
    title.value = "编辑租户";
    edit.value = true;
    copyParams(editForm, data);
    if (data.startAt && data.endAt) {
      editForm.daterange = [data.startAt, data.endAt];
    }
  } else {
    title.value = "创建租户";
    edit.value = false;
  }
};
const handleConfirmClick = () => {
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
        ? tenantStore.updateTenant(params)
        : tenantStore.createTenant(params);

      request
        .then(() => {
          loading.value = false;
          Message.success("操作成功");
          visible.value = false;
          emits("success");
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
};

defineExpose({
  show,
});
</script>
