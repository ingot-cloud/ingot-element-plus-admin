import { ref, reactive, unref } from "vue";
import { MenuTreeNode, CommonStatus } from "@/model";
import { copyParamsWithKeys } from "@/utils/object";
import { Message, Confirm } from "@/utils/message";
import { getMenuTree } from "@/api/authority/menu";

const rawEditForm = {
  id: null,
  pid: null,
  pName: null,
  name: null,
  path: null,
  viewPath: null,
  icon: null,
  sort: null,
  cache: false,
  hidden: false,
  params: null,
  status: CommonStatus.Enable,
  remark: null,
};

const keys = Object.keys(rawEditForm);

export const menuFormRef = ref();

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
export const editStatus = reactive({
  saveOrUpdateButtonTitle: "添加",
  formDisabled: true,
});

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
  editStatus.formDisabled = false;
}

export function handleEditRadioClick(): void {
  // todo
}

export function handleCancelRadioClick(): void {
  editStatus.formDisabled = true;
}

export function handleTreeNodeClick(params: MenuTreeNode): void {
  copyParamsWithKeys(params, editForm, keys);
}

export function handleFormCreateOrUpdate(): void {
  const form = unref(menuFormRef);
  form.validate((valid: boolean) => {
    console.log(valid);
  });
}

export function handleFormCancel(): void {
  editStatus.formDisabled = true;
}
