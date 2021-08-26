<template>
  <el-dialog :title="title" v-model="visible" center>
    <div class="dialog-content">
      <el-form
        ref="roleEditFormRef"
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
            :disabled="edit"
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
import { RolePageItemVo as P } from "@/model";
export interface API {
  show(data?: P): void;
}
</script>
<script lang="ts" setup>
import { RolePageItemVo, SysRole } from "@/model";
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
import { create, update } from "@/store/composition/role";
import { store } from "@/store";
import { copyParams, copyParamsWithKeys } from "@/utils/object";

const rules = {
  name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入角色编码", trigger: "blur" }],
  type: [{ required: false }],
  remark: [{ required: false }],
};

const defaultEditForm = {
  id: null,
  name: null,
  code: null,
  type: null,
  remark: null,
};

const keys = ["id", "name", "code", "type", "remark"];

const emits = defineEmits(["success"]);

const title = ref("");
const edit = ref(false);
const visible = ref(false);
const loading = ref(false);
const roleEditFormRef = ref();
const editForm = reactive(Object.assign({}, defaultEditForm));

const show = (data?: RolePageItemVo) => {
  visible.value = true;

  // 重置数据
  copyParams(editForm, defaultEditForm);
  nextTick(() => {
    const form = unref(roleEditFormRef);
    form.clearValidate();
  });

  if (data) {
    title.value = "编辑角色";
    edit.value = true;
    copyParams(editForm, data);
  } else {
    title.value = "创建角色";
    edit.value = false;
  }
};

const handleConfirmClick = () => {
  const form = unref(roleEditFormRef);
  form.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      const params: SysRole = {};
      copyParamsWithKeys(params, toRaw(editForm), keys);

      const request = edit.value
        ? update(store, params)
        : create(store, params);
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
<style lang="stylus" scoped>
.dialog-content
  display flex
  flex-direction column
  align-items center
</style>
