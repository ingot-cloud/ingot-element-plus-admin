import { ref, reactive, unref } from "vue";
import { MenuTreeNode, CommonStatus, SysMenu } from "@/model";
import { copyParamsWithKeys, getDiff } from "@/utils/object";
import { Message, Confirm } from "@/utils/message";
import { getMenuTree, create, update, remove } from "@/api/authority/menu";

const rawEditForm = {
  id: undefined,
  pid: undefined,
  pName: undefined,
  name: undefined,
  path: undefined,
  viewPath: undefined,
  icon: undefined,
  sort: undefined,
  isCache: false,
  hidden: false,
  params: undefined,
  status: CommonStatus.Enable,
  remark: undefined,
};

const keys = Object.keys(rawEditForm);
const sysMenuKeys = keys.filter((f) => f !== "pName");

export const menuFormRef = ref();
export const menuTreeRef = ref();

export const rules = {
  name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
  path: [{ required: true, message: "请输入菜单url", trigger: "blur" }],
  viewPath: [{ required: true, message: "请输入视图路径", trigger: "blur" }],
};

export const loading = ref(false);
export const selectNode = reactive({} as MenuTreeNode);
export const menuData = reactive({
  props: {
    children: "children",
    label: "name",
  },
  nodeKey: "id",
  expandedKeys: [] as Array<string>,
  data: [] as Array<MenuTreeNode>,
});
export const editForm = reactive(Object.assign({}, rawEditForm));
const selectEditForm = reactive(Object.assign({}, rawEditForm));
export const editStatus = reactive({
  isEdit: false,
  saveOrUpdateButtonTitle: "添加",
  formDisabled: true,
});

function checkSelected() {
  if (!editForm.id) {
    Message.warning("请先选择菜单");
    return false;
  }
  return true;
}

export function fetchData(): void {
  loading.value = true;
  getMenuTree()
    .then((response) => {
      loading.value = false;
      const data = response.data;
      const expandedKeys: Array<string> = [];
      data.forEach((root) => {
        if (root.id) {
          expandedKeys.push(root.id);
        }
      });
      menuData.data = data;
      menuData.expandedKeys = expandedKeys;
    })
    .catch(() => {
      loading.value = false;
    });
}

export function handleCreateRadioClick(): void {
  copyParamsWithKeys(editForm, rawEditForm, keys);
  editStatus.formDisabled = false;
  editStatus.isEdit = false;
  editStatus.saveOrUpdateButtonTitle = "添加";
  editForm.pid = selectEditForm.id;
  editForm.pName = selectEditForm.name;
}

export function handleEditRadioClick(): void {
  if (!checkSelected()) {
    return;
  }
  editStatus.formDisabled = false;
  editStatus.isEdit = true;
  editStatus.saveOrUpdateButtonTitle = "更新";
}

export function handleDeleteRadioClick(callback?: FunctionConstructor): void {
  if (!checkSelected()) {
    return;
  }
  Confirm.warning(`是否删除菜单${selectEditForm.name}`).then(() => {
    const id = selectEditForm.id || "";
    remove(id).then(() => {
      Message.success("操作成功");
      handleFormCancel();
      if (callback) {
        callback();
      }
    });
  });
}

export function handleCancelSelectRadioClick(): void {
  const tree = unref(menuTreeRef);
  tree.setCurrentKey(null);
  copyParamsWithKeys(selectEditForm, rawEditForm, keys);
  copyParamsWithKeys(editForm, rawEditForm, keys);
}

export function handleTreeNodeClick(params: MenuTreeNode): void {
  copyParamsWithKeys(editForm, params, keys);
  copyParamsWithKeys(selectEditForm, params, keys);
}

export function handleFormCreateOrUpdate(callback?: FunctionConstructor): void {
  const form = unref(menuFormRef);
  form.validate((valid: boolean) => {
    if (valid) {
      const params: SysMenu = {};

      let request;
      if (editStatus.isEdit) {
        const params = getDiff(selectEditForm, editForm);
        if (Object.keys(params).length === 0) {
          Message.warning("未改变数据");
          return;
        }
        params.id = selectEditForm.id;
        request = update(params);
      } else {
        copyParamsWithKeys(params, editForm, sysMenuKeys);
        request = create(params);
      }

      loading.value = true;
      request
        .then(() => {
          loading.value = false;
          Message.success("操作成功");
          handleFormCancel();
          if (callback) {
            callback();
          }
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
}

export function handleFormCancel(): void {
  editStatus.formDisabled = true;
  handleCancelSelectRadioClick();
}
