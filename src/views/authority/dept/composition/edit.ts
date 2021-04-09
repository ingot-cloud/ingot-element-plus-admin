import { reactive, ref } from "vue";
import { CommonStatus, DeptRoleScope } from "@/model";

export const saveOrUpdateButtonTitle = ref("保存");

export function handleCreateButtonClick() {
  saveOrUpdateButtonTitle.value = "添加";
}

export function handleEditButtonClick() {
  saveOrUpdateButtonTitle.value = "更新";
}

export function handleDeleteButtonClick() {
  //
}

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
