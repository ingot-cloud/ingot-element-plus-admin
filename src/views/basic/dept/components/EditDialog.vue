<template>
  <el-dialog :title="title" v-model="visible">
    <el-form
      ref="editFormRef"
      label-width="80px"
      :model="editForm"
      :rules="rules"
    >
      <el-form-item label="上级菜单">
        <el-tree-select
          v-model="editForm.pid"
          :data="data"
          :disabled="!canEditPid"
          :props="treeSelectProps"
          :highlight-current="true"
          :expand-on-click-node="false"
        />
      </el-form-item>
      <el-form-item prop="name" label="部门名称">
        <el-input
          v-model="editForm.name"
          placeholder="请输入部门名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="scope" label="权限范围">
        <el-radio-group v-model="editForm.scope">
          <el-radio-button :label="DeptRoleScope.Current">
            {{ getDeptRoleScopeDesc(DeptRoleScope.Current) }}
          </el-radio-button>
          <el-radio-button :label="DeptRoleScope.CurrentChild">
            {{ getDeptRoleScopeDesc(DeptRoleScope.CurrentChild) }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="status" label="状态">
            <el-radio-group v-model="editForm.status">
              <el-radio-button :label="CommonStatus.Enable">
                {{ getCommonStatusDesc(CommonStatus.Enable) }}
              </el-radio-button>
              <el-radio-button :label="CommonStatus.Lock">
                {{ getCommonStatusDesc(CommonStatus.Lock) }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="sort" label="排序">
            <el-input
              v-model="editForm.sort"
              placeholder="请输入排序序号"
              type="number"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button :loading="loading" type="primary" @click="handleConfirmClick">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import type { SysDept as P } from "@/models";
export interface API {
  show(data?: P | string): void;
}
</script>
<script lang="ts" setup>
import {
  reactive,
  ref,
  nextTick,
  unref,
  toRaw,
  defineEmits,
  defineExpose,
  defineProps,
} from "vue";
import {
  DeptRoleScope,
  getDeptRoleScopeDesc,
  CommonStatus,
  getCommonStatusDesc,
} from "@/models";
import type { SysDept } from "@/models";
import { useDeptStore } from "@/stores/modules/dept";
import { Message } from "@/utils/message";
import { copyParams, getDiff } from "@/utils/object";

const defaultEditForm: SysDept = {
  id: undefined,
  pid: undefined,
  name: undefined,
  scope: DeptRoleScope.Current,
  sort: 999,
  status: CommonStatus.Enable,
};

const rules = {
  name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
};

const treeSelectProps = {
  children: "children",
  label: "name",
  value: "id",
};

const emits = defineEmits(["success"]);
defineProps({
  data: {
    type: Array,
  },
});

const deptStore = useDeptStore();
const editFormRef = ref();
const editForm = reactive(Object.assign({}, defaultEditForm));
const rawForm: SysDept = {};
const loading = ref(false);
const title = ref("");
const edit = ref(false);
const canEditPid = ref(false);
const visible = ref(false);

const handleConfirmClick = () => {
  const form = unref(editFormRef);
  form.validate((valid: boolean) => {
    if (valid) {
      let request;
      if (edit.value) {
        const params = getDiff<SysDept>(rawForm, editForm);
        if (Object.keys(params).length === 0) {
          Message.warning("未改变数据");
          return;
        }
        params.id = rawForm.id;
        request = deptStore.updateDept(params);
      } else {
        request = deptStore.createDept(Object.assign({}, toRaw(editForm)));
      }

      loading.value = true;
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

const show = (data?: SysDept | string) => {
  visible.value = true;

  // 重置数据
  copyParams(editForm, defaultEditForm);
  copyParams(rawForm, defaultEditForm);
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
      copyParams(rawForm, data);
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

defineExpose({
  show,
});
</script>
