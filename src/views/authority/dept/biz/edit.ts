import { reactive, ref, unref, Ref } from "vue";
import { CommonStatus, DeptRoleScope, DeptTreeNode, SysDept } from "@/model";
import { Message, Confirm } from "@/utils/message";
import { createDept, removeDept, updateDept } from "@/store/composition/dept";
import { getDiff } from "@/utils/object";
import { IngotStore } from "@/store/types";

type EditStatus = "create" | "edit";
let currentStatus: EditStatus = "create";

const node: DeptTreeNode = {};
// 选定的节点
export const selectedDeptNode = ref(node);

export const deptEditStatus = reactive({
  saveOrUpdateButtonTitle: "添加",
  formDisabled: true,
});

// 表单录入
export const formModel = reactive({
  id: "",
  pid: "",
  pName: "",
  name: "",
  scope: DeptRoleScope.CurrentChild,
  sort: 0,
  status: CommonStatus.Enable,
});

// 重置 form model
function resetFormModel(node?: DeptTreeNode, pNode?: DeptTreeNode) {
  formModel.id = node?.id || "";
  formModel.pid = pNode?.id || "";
  formModel.pName = pNode?.name || "";
  formModel.name = node?.name || "";
  formModel.scope = node?.scope || DeptRoleScope.CurrentChild;
  formModel.sort = node?.sort || 0;
  formModel.status = node?.status || CommonStatus.Enable;
}

// formModel 转 SysDept
function formModelToSysDept() {
  const dept: SysDept = {};

  dept.id = formModel.id;
  dept.pid = formModel.pid;
  dept.name = formModel.name;
  dept.scope = formModel.scope;
  dept.sort = formModel.sort;
  dept.status = formModel.status;

  return dept;
}

function selectedDeptNodeToSysDept() {
  const dept: SysDept = {};

  dept.id = selectedDeptNode.value.id;
  dept.pid = selectedDeptNode.value.pid;
  dept.name = selectedDeptNode.value.name;
  dept.scope = selectedDeptNode.value.scope;
  dept.sort = selectedDeptNode.value.sort;
  dept.status = selectedDeptNode.value.status;

  return dept;
}

// 表达规则
export const rules = ref({
  name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
  scope: [{ required: true, message: "请选择角色范围", trigger: "blur" }],
  sort: [{ required: true, message: "请输入排序序号", trigger: "blur" }],
  status: [{ required: true, message: "请选择状态", trigger: "blur" }],
});

/**
 * 处理节点点击事件
 * @param node 部门树节点
 */
export function handleTreeNodeClick(node: DeptTreeNode): void {
  selectedDeptNode.value = node;
  resetFormModel(node);
}

export function handleCreateButtonClick(): void {
  deptEditStatus.formDisabled = false;
  deptEditStatus.saveOrUpdateButtonTitle = "添加";
  currentStatus = "create";
  resetFormModel({}, selectedDeptNode.value);
}

function checkSelected() {
  const keys = Object.keys(selectedDeptNode.value);
  if (keys.length === 0) {
    Message.warning("请先选择部门");
    return false;
  }
  return true;
}

export function handleEditButtonClick(): void {
  if (!checkSelected()) {
    return;
  }
  deptEditStatus.formDisabled = false;
  deptEditStatus.saveOrUpdateButtonTitle = "更新";
  currentStatus = "edit";
}

/**
 * 处理取消编辑
 */
export function handleCancelEdit(): void {
  deptEditStatus.formDisabled = true;
  selectedDeptNode.value = {};
  resetFormModel();
}

/**
 * 处理删除部门
 */
export function handleDeleteButtonClick(
  store: IngotStore,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback?: Function
): void {
  if (!checkSelected()) {
    return;
  }
  Confirm.warning(`是否删除部门${selectedDeptNode.value.name}`).then(() => {
    const id = selectedDeptNode.value.id as string;
    removeDept(store, id).then(() => {
      Message.success("操作成功");
      handleCancelEdit();
      if (callback) {
        callback();
      }
    });
  });
}

/**
 * 处理添加或者更新部门信息
 */
export function handleCreateOrUpdateDept(
  store: IngotStore,
  formRef: Ref,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback?: Function
): void {
  const form = unref(formRef);
  form.validate((valid: boolean) => {
    if (!valid) {
      return;
    }
    let request;
    if (currentStatus === "create") {
      request = createDept(store, formModelToSysDept());
    } else {
      const params = getDiff<SysDept>(
        selectedDeptNodeToSysDept(),
        formModelToSysDept()
      );
      if (Object.keys(params).length === 0) {
        Message.warning("未改变数据");
        return;
      }
      params.id = selectedDeptNode.value.id;
      request = updateDept(store, params);
    }

    request.then(() => {
      Message.success("操作成功");
      handleCancelEdit();
      if (callback) {
        callback();
      }
    });
  });
}
