<template>
  <in-drawer :title="title" v-model="visible">
    <in-form ref="editFormRef" :model="editForm" :rules="rules">
      <el-form-item label="logo">
        <in-common-upload-avatar
          dir="public/tenant"
          v-model="editForm.avatar"
        />
      </el-form-item>
      <el-form-item label="组织名称" prop="name">
        <el-input
          v-model="editForm.name"
          clearable
          placeholder="请输入组织名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="组织编码" prop="code">
        <el-input
          disabled
          v-model="editForm.code"
          clearable
          placeholder="请输入组织编码"
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
    </in-form>
    <template #footer>
      <in-button type="danger" @click="handleRemoveClick"> 删除 </in-button>
      <in-button :loading="loading" type="primary" @click="handleConfirmClick">
        确定
      </in-button>
    </template>
  </in-drawer>
</template>
<script lang="ts" setup>
import type { SysTenant } from "@/models";
import { Message } from "@/utils/message";
import { copyParams, copyParamsWithoutKeys } from "@/utils/object";
import { useTenantStore } from "@/stores/modules/tenant";

const rules = {
  name: [{ required: true, message: "请输入组织名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入组织编码", trigger: "blur" }],
  daterange: [{ required: false }],
};

const defaultEditForm: {
  id?: string;
  name?: string;
  code?: string;
  startAt?: string;
  endAt?: string;
  daterange?: [string, string];
  avatar?: string;
} = {
  id: undefined,
  name: undefined,
  code: undefined,
  startAt: undefined,
  endAt: undefined,
  daterange: ["", ""],
  avatar: undefined,
};

const emits = defineEmits(["success"]);

const editFormRef = ref();
const editForm = reactive(Object.assign({}, defaultEditForm));
const loading = ref(false);
const title = ref("编辑组织");
const visible = ref(false);
const tenantStore = useTenantStore();

const confirmDelete = useConfirmDelete(tenantStore.removeTenant, () => {
  Message.success("操作成功");
  visible.value = false;
  emits("success");
});

const handleRemoveClick = () => {
  confirmDelete.exec(editForm.id!, `是否删除组织(${editForm.name})`);
};

const handleConfirmClick = () => {
  const form = unref(editFormRef);
  form.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      const params: SysTenant = {};
      copyParamsWithoutKeys(params, toRaw(editForm), ["daterange"]);

      if (editForm.daterange && editForm.daterange.length > 1) {
        params.startAt = editForm.daterange[0];
        params.endAt = editForm.daterange[1];
      } else {
        params.startAt = undefined;
        params.endAt = undefined;
      }

      tenantStore
        .updateTenant(params)
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
  show(data: SysTenant) {
    visible.value = true;

    // 重置数据
    copyParams(editForm, defaultEditForm);
    nextTick(() => {
      const form = unref(editFormRef);
      form.clearValidate();
    });

    copyParams(editForm, data);
    if (data.startAt && data.endAt) {
      editForm.daterange = [data.startAt, data.endAt];
    }
  },
});
</script>
