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

export default defineComponent({
  emits: ["success"],
  setup(_, { emit }) {
    const editFormRef = ref();
    const editForm = reactive(Object.assign({}, defaultEditForm));
    const rawEditForm = reactive(Object.assign({}, defaultEditForm));
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
      rules,
      show: (data?: SysAuthority) => {
        visible.value = true;

        // 重置数据
        copyParams(editForm, defaultEditForm);
        copyParams(rawEditForm, defaultEditForm);
        nextTick(() => {
          const form = unref(editFormRef);
          form.clearValidate();
        });

        if (data) {
          title.value = "编辑";
          edit.value = true;
          copyParams(editForm, data);
          copyParams(rawEditForm, data);
        } else {
          title.value = "创建";
          edit.value = false;
        }
      },
      handleConfirmClick() {
        const form = unref(editFormRef);
        form.validate((valid: boolean) => {
          if (valid) {
            loading.value = true;
            let params: SysAuthority = {};
            let request;
            if (edit.value) {
              params = getDiffWithIgnore(rawEditForm, editForm, ["id"]);
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
