import { reactive, ref } from "vue";
import { CommonStatus, DeptRoleScope } from "@/model";

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

export const rules = ref({
  name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
  scope: [{ required: true, message: "请选择角色范围", trigger: "blur" }],
  sort: [{ required: true, message: "请输入排序序号", trigger: "blur" }],
  status: [{ required: true, message: "请选择状态", trigger: "blur" }]
});

export function handleCreateButtonClick() {
  deptEditStatus.formDisabled = false;
  deptEditStatus.saveOrUpdateButtonTitle = "添加";
}

export function handleEditButtonClick() {
  deptEditStatus.formDisabled = false;
  deptEditStatus.saveOrUpdateButtonTitle = "更新";
}

export function handleDeleteButtonClick() {
  //
}

/**
 * 处理添加或者更新部门信息
 */
export function handleCreateOrUpdateDept() {
  //
}

/**
 * 处理取消编辑
 */
export function handleCancelEdit() {
  deptEditStatus.formDisabled = true;
}
