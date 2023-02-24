<template>
  <in-dialog :title="title" v-model="visible" width="600">
    <el-form
      ref="editFormRef"
      label-width="80px"
      label-position="right"
      :model="editForm"
      :rules="rules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="租户名称" prop="name">
            <el-input
              v-model="editForm.name"
              clearable
              placeholder="请输入租户名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="租户编码" prop="code">
            <el-input
              :disabled="edit"
              v-model="editForm.code"
              clearable
              placeholder="请输入租户编码"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :span="24">
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
      </el-col>
    </el-form>
    <template #footer>
      <in-button :loading="loading" type="primary" @click="handleConfirmClick">
        确定
      </in-button>
    </template>
  </in-dialog>
</template>
<script lang="ts">
import type { SysTenant as P } from "@/models";
export interface API {
  show(data?: P): void;
}
</script>
<script lang="ts" setup>
import type { SysTenant } from "@/models";
import { Message } from "@/utils/message";
import { copyParams } from "@/utils/object";
import { useTenantStore } from "@/stores/modules/tenant";

const rules = {
  name: [{ required: true, message: "请输入租户名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入租户编码", trigger: "blur" }],
  daterange: [{ required: false }],
};

const defaultEditForm: {
  id?: string;
  name?: string;
  code?: string;
  startAt?: string;
  endAt?: string;
  daterange?: [string, string];
} = {
  id: undefined,
  name: undefined,
  code: undefined,
  startAt: undefined,
  endAt: undefined,
  daterange: ["", ""],
};

const emits = defineEmits(["success"]);

const editFormRef = ref();
const editForm = reactive(Object.assign({}, defaultEditForm));
const loading = ref(false);
const title = ref("");
const edit = ref(false);
const visible = ref(false);
const tenantStore = useTenantStore();

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
