<template>
  <el-dialog :title="title" v-model="visible" center @close="loading = false">
    <el-form
      ref="editFormRef"
      class="form"
      label-width="100px"
      label-position="right"
      :model="editForm"
      :rules="rules"
      size="small"
    >
      <el-form-item label="上级菜单">
        <ingot-tree-select
          v-model="editForm.pid"
          :data="data"
          :disabled="!canEditPid"
          :props="treeSelectProps"
        />
      </el-form-item>
      <el-form-item label="权限名称" prop="name">
        <el-input
          v-model="editForm.name"
          clearable
          placeholder="请输入权限名称"
          class="form-item"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限编码" prop="code">
        <el-input
          :disabled="edit"
          v-model="editForm.code"
          clearable
          placeholder="请输入权限编码"
          class="form-item"
        ></el-input>
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input
          v-model="editForm.path"
          clearable
          placeholder="请输入路径"
          class="form-item"
        ></el-input>
      </el-form-item>
      <el-form-item label="方法" prop="method">
        <el-select
          v-model="editForm.method"
          placeholder="请选择方法"
          size="small"
          class="form-item"
        >
          <el-option
            v-for="item in methodArray"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="editForm.remark"
          clearable
          placeholder="请输入备注信息"
          class="form-item"
        ></el-input>
      </el-form-item>
    </el-form>
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
import { SysAuthority as P } from "@/model";
export interface API {
  show(data?: P | string): void;
}
</script>
<script lang="ts" setup>
import { SysAuthority } from "@/model";
import {
  reactive,
  ref,
  nextTick,
  unref,
  toRaw,
  defineEmits,
  defineExpose,
} from "vue";
import { create, update } from "@/api/authority/authority";
import { Message } from "@/utils/message";
import {
  copyParams,
  copyParamsWithKeys,
  getDiffWithIgnore,
} from "@/utils/object";

const rules = {
  name: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入权限编码", trigger: "blur" }],
  path: [{ required: true, message: "请输入权限路径", trigger: "blur" }],
  method: [{ required: true, message: "请输入路径方法", trigger: "blur" }],
};

const defaultEditForm: SysAuthority = {
  id: undefined,
  pid: undefined,
  name: undefined,
  code: undefined,
  path: undefined,
  method: "*",
  remark: undefined,
};

const keys = Object.keys(defaultEditForm);

const emits = defineEmits(["success"]);
defineProps({
  data: {
    type: Array,
  },
});

const editFormRef = ref();
const editForm = reactive(Object.assign({}, defaultEditForm));
const rawEditForm = reactive(Object.assign({}, defaultEditForm));
const loading = ref(false);
const title = ref("");
const edit = ref(false);
const canEditPid = ref(false);
const visible = ref(false);
const treeSelectProps = {
  children: "children",
  label: "name",
  value: "id",
};
const methodArray = ["*", "GET", "POST", "DELETE", "PUT"];

const show = (data?: SysAuthority | string) => {
  visible.value = true;

  // 重置数据
  copyParams(editForm, defaultEditForm);
  copyParams(rawEditForm, defaultEditForm);
  nextTick(() => {
    const form = unref(editFormRef);
    form.clearValidate();
  });

  if (data) {
    if (typeof data === "string") {
      title.value = "创建";
      edit.value = false;
      canEditPid.value = false;
      editForm.pid = data;
    } else {
      copyParams(editForm, data);
      copyParams(rawEditForm, data);
      title.value = "编辑";
      edit.value = true;
      canEditPid.value = false;
    }
  } else {
    title.value = "创建";
    edit.value = false;
    canEditPid.value = true;
  }
};
const handleConfirmClick = () => {
  const form = unref(editFormRef);
  form.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      let params: SysAuthority = {};
      let request;
      if (edit.value) {
        params = getDiffWithIgnore(rawEditForm, editForm);
        console.log(params);
        if (Object.keys(params).length === 0) {
          Message.warning("未改变数据");
          return;
        }
        params.id = rawEditForm.id;
        request = update(params);
      } else {
        copyParamsWithKeys(params, toRaw(editForm), keys);
        request = create(params);
      }
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
<style lang="stylus" scoped></style>
