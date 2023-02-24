<template>
  <in-dialog :title="title" v-model="visible" width="700">
    <el-form
      ref="editFormRef"
      label-width="80px"
      :model="editForm"
      :rules="rules"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item prop="pid" label="上级部门">
            <el-tree-select
              w-full
              v-model="editForm.pid"
              :data="selectData"
              :disabled="!canEditPid"
              :node-key="TreeKeyAndProps.nodeKey"
              :value-key="TreeKeyAndProps.nodeKey"
              :props="TreeKeyAndProps.props"
              :check-strictly="true"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="scope" label="权限范围">
            <el-radio-group v-model="editForm.scope">
              <el-radio-button :label="DeptRoleScope.Current">
                {{
                  useDeptRoleScopeEnum.getTagText(DeptRoleScope.Current).text
                }}
              </el-radio-button>
              <el-radio-button :label="DeptRoleScope.CurrentChild">
                {{
                  useDeptRoleScopeEnum.getTagText(DeptRoleScope.CurrentChild)
                    .text
                }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="name" label="部门名称">
            <el-input
              v-model="editForm.name"
              placeholder="请输入部门名称"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="status" label="状态">
            <el-radio-group v-model="editForm.status">
              <el-radio-button :label="CommonStatus.Enable">
                {{ statusEnum.getTagText(CommonStatus.Enable).text }}
              </el-radio-button>
              <el-radio-button :label="CommonStatus.Lock">
                {{ statusEnum.getTagText(CommonStatus.Lock).text }}
              </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
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
    </el-form>
    <template #footer>
      <in-button :loading="loading" type="primary" @click="handleConfirmClick">
        确定
      </in-button>
    </template>
  </in-dialog>
</template>
<script lang="ts">
import type { SysDept as P } from "@/models";
export interface API {
  show(data?: P | string): void;
}
</script>
<script lang="ts" setup>
import {
  DeptRoleScope,
  useDeptRoleScopeEnum,
  CommonStatus,
  CommonStatusEnumExtArray,
} from "@/models/enums";
import { TreeKeyAndProps } from "@/models";
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
  pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
  name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
};

const emits = defineEmits(["success"]);
defineProps({
  selectData: {
    type: Array,
  },
});

const statusEnum = useEnum(CommonStatusEnumExtArray);
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
