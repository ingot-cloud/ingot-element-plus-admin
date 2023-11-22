<template>
  <in-drawer :title="title" v-model="visible">
    <in-form ref="roleEditFormRef" :model="editForm" :rules="rules">
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="editForm.name"
          clearable
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="code">
        <el-input
          :disabled="edit"
          v-model="editForm.code"
          clearable
          placeholder="请输入角色编码"
        ></el-input>
      </el-form-item>

      <el-form-item label="角色类型" prop="type">
        <in-select
          w-full
          v-model="editForm.type"
          placeholder="请选择角色类型"
          :options="roleTypeEnum.getOptions()"
          clearable
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="editForm.remark"
          clearable
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
    </in-form>
    <template #footer>
      <in-button v-if="edit" type="danger" @click="handleRemoveClick">
        删除
      </in-button>
      <in-button :loading="loading" type="primary" @click="handleConfirmClick">
        确定
      </in-button>
    </template>
  </in-drawer>
</template>
<script lang="ts" setup>
import type { RolePageItemVO, SysRole } from "@/models";
import { Message } from "@/utils/message";
import { copyParams, copyParamsWithKeys } from "@/utils/object";
import { useRoleStore } from "@/stores/modules/role";
import { useOrgTypeEnums } from "@/models/enums";

const rules = {
  name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入角色编码", trigger: "blur" }],
  type: [{ required: true, message: "请选择角色类型", trigger: "blur" }],
  remark: [{ required: false }],
};

const defaultEditForm = {
  id: null,
  name: null,
  code: null,
  type: "",
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

const roleTypeEnum = useOrgTypeEnums();
const roleStore = useRoleStore();
const confirmDelete = useConfirmDelete(roleStore.removeRole, () => {
  Message.success("操作成功");
  visible.value = false;
  emits("success");
});

const handleRemoveClick = () => {
  confirmDelete.exec(editForm.id!, `是否删除角色(${editForm.name})`);
};

const handleConfirmClick = () => {
  const form = unref(roleEditFormRef);
  form.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      const params: SysRole = {};
      copyParamsWithKeys(params, toRaw(editForm), keys);

      const request = edit.value
        ? roleStore.updateRole(params)
        : roleStore.createRole(params);
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
  show(data?: RolePageItemVO) {
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
      title.value = "添加角色";
      edit.value = false;
    }
  },
});
</script>
