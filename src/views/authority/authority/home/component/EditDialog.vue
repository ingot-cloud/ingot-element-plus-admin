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
        <el-form-item label="权限组" v-if="pName">
          {{ pName }}
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
        <el-form-item label="路径">
          <el-input
            v-model="editForm.path"
            clearable
            placeholder="请输入路径"
            class="form-item"
          ></el-input>
        </el-form-item>
        <el-form-item label="方法">
          <el-select
            v-model="editForm.method"
            placeholder="请选择方法"
            size="small"
            clearable
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
import { SysAuthority } from "@/model";
import { defineComponent, reactive, ref, nextTick, unref, toRaw } from "vue";
import { create, update } from "@/api/authority/authority";
import { Message } from "@/utils/message";
import { copyParams, copyParamsWithKeys } from "@/utils/object";

const rules = {
  name: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入权限编码", trigger: "blur" }],
};

const defaultEditForm: SysAuthority = {
  id: undefined,
  pid: undefined,
  name: undefined,
  code: undefined,
  path: undefined,
  method: undefined,
  remark: undefined,
};

const keys = Object.keys(defaultEditForm);

export default defineComponent({
  emits: ["success"],
  setup(_, { emit }) {
    const editFormRef = ref();
    const editForm = reactive(Object.assign({}, defaultEditForm));
    const pName = ref("");
    const loading = ref(false);
    const title = ref("");
    const edit = ref(false);
    const visible = ref(false);

    return {
      methodArray: ["*", "GET", "POST", "DELETE", "PUT"],
      editFormRef,
      title,
      edit,
      visible,
      loading,
      editForm,
      pName,
      rules,
      show: (data?: SysAuthority, parent?: SysAuthority) => {
        visible.value = true;

        // 重置数据
        copyParams(defaultEditForm, editForm);
        nextTick(() => {
          const form = unref(editFormRef);
          form.clearValidate();
        });

        if (data) {
          title.value = "编辑";
          edit.value = true;
          copyParams(data, editForm);
        } else {
          title.value = "创建";
          edit.value = false;
        }
        if (parent) {
          editForm.pid = parent.id;
          pName.value = parent.name as string;
        } else {
          editForm.pid = undefined;
          pName.value = "";
        }
      },
      handleConfirmClick() {
        const form = unref(editFormRef);
        form.validate((valid: boolean) => {
          if (valid) {
            loading.value = true;
            const params: SysAuthority = {};
            copyParamsWithKeys(toRaw(editForm), params, keys);

            const request = edit.value ? update(params) : create(params);

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
