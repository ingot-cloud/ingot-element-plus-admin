import { reactive, ref, unref, Ref } from "vue";
import { CommonStatus, DeptRoleScope, DeptTreeNode } from "@/model";
import { ElMessage, ElMessageBox } from "element-plus";
import { createDept, removeDept, updateDept } from "@/api/authority/dept";

const node: DeptTreeNode = {};
// 选定的节点
export const selectedDeptNode = ref(node);

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

/**
 * 处理节点点击事件
 * @param node 部门树节点
 */
export function handleTreeNodeClick(node: DeptTreeNode) {
  selectedDeptNode.value = node;
  resetFormModel(node);
}

export function handleCreateButtonClick() {
  deptEditStatus.formDisabled = false;
  deptEditStatus.saveOrUpdateButtonTitle = "添加";
  resetFormModel();
}

function checkSelected() {
  const keys = Object.keys(selectedDeptNode.value);
  if (keys.length === 0) {
    ElMessage({
      showClose: true,
      message: "请先选择部门",
      type: "warning"
    });
    return false;
  }
  return true;
}

export function handleEditButtonClick() {
  if (!checkSelected()) {
    return;
  }
  deptEditStatus.formDisabled = false;
  deptEditStatus.saveOrUpdateButtonTitle = "更新";
}

export function handleDeleteButtonClick() {
  if (!checkSelected()) {
    return;
  }
  ElMessageBox.confirm(`是否删除部门${selectedDeptNode.value.name}`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    // todo
  });
}

/**
 * 处理添加或者更新部门信息
 */
export function handleCreateOrUpdateDept(formRef: Ref) {
  resetFormModel();
  const form = unref(formRef);
  form.validate((valid: boolean) => {
    // todo
  });
}

/**
 * 处理取消编辑
 */
export function handleCancelEdit() {
  deptEditStatus.formDisabled = true;
  selectedDeptNode.value = {};
  resetFormModel();
}
