import { reactive, ref } from "vue";
import { CommonStatus, DeptRoleScope, DeptTreeNode } from "@/model";
import { selectedDeptNode } from "./dept";
import { ElMessage } from "element-plus";

export const deptEditStatus = reactive({
  saveOrUpdateButtonTitle: "添加",
  formDisabled: true
});

// 表单录入
export const formModel = reactive({
  id: "",
  pid: "",
  name: "",
  scope: DeptRoleScope.CurrentChild,
  sort: 0,
  status: CommonStatus.Enable
});

// 重置 form model
function resetFormModel(node?: DeptTreeNode) {
  formModel.id = node?.id || "";
  formModel.pid = node?.pid || "";
  formModel.name = node?.name || "";
  formModel.scope = node?.scope || DeptRoleScope.CurrentChild;
  formModel.sort = node?.sort || 0;
  formModel.status = node?.status || CommonStatus.Enable;
}

// 表达规则
export const rules = ref({
  name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
  scope: [{ required: true, message: "请选择角色范围", trigger: "blur" }],
  sort: [{ required: true, message: "请输入排序序号", trigger: "blur" }],
  status: [{ required: true, message: "请选择状态", trigger: "blur" }]
});

export function handleCreateButtonClick() {
  deptEditStatus.formDisabled = false;
  deptEditStatus.saveOrUpdateButtonTitle = "添加";
  resetFormModel();
}

export function handleEditButtonClick() {
  const keys = Object.keys(selectedDeptNode.value);
  if (keys.length === 0) {
    ElMessage({
      showClose: true,
      message: "请先选择部门",
      type: "warning"
    });
    return;
  }
  deptEditStatus.formDisabled = false;
  deptEditStatus.saveOrUpdateButtonTitle = "更新";
  resetFormModel(selectedDeptNode.value);
}

export function handleDeleteButtonClick() {
  //
}

/**
 * 处理添加或者更新部门信息
 */
export function handleCreateOrUpdateDept() {
  resetFormModel();
}

/**
 * 处理取消编辑
 */
export function handleCancelEdit() {
  deptEditStatus.formDisabled = true;

  resetFormModel();
}
