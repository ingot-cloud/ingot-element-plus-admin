import { defineComponent, onMounted, ref, reactive, unref } from "vue";
import { tableHeaders } from "../table";
import {
  MenuTreeNode,
  CommonStatus,
  SysMenu,
  getCommonStatusDesc,
  getCommonStatusTag,
  getDisableButtonParams,
} from "@/model";
import { copyParamsWithKeys, getDiff } from "@/utils/object";
import { Message, Confirm } from "@/utils/message";
import { getMenuTree, create, update, remove } from "@/api/authority/menu";
import EditDialog from "../EditDialog.vue";

export default defineComponent({
  components: {
    EditDialog,
  },
  setup() {
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

    const menuFormRef = ref();
    const menuTreeRef = ref();

    const rules = {
      name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
      path: [{ required: true, message: "请输入菜单url", trigger: "blur" }],
      viewPath: [
        { required: true, message: "请输入视图路径", trigger: "blur" },
      ],
    };

    const loading = ref(false);
    const menuData = reactive({
      props: {
        children: "children",
        label: "name",
      },
      nodeKey: "id",
      expandedKeys: [] as Array<string>,
      data: [] as Array<MenuTreeNode>,
    });
    const editForm = reactive(Object.assign({}, rawEditForm));
    const selectEditForm = reactive(Object.assign({}, rawEditForm));
    const editStatus = reactive({
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

    function fetchData(): void {
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

    function handleCreateRadioClick(): void {
      copyParamsWithKeys(editForm, rawEditForm, keys);
      editStatus.formDisabled = false;
      editStatus.isEdit = false;
      editStatus.saveOrUpdateButtonTitle = "添加";
      editForm.pid = selectEditForm.id;
      editForm.pName = selectEditForm.name;
    }

    function handleEditRadioClick(): void {
      if (!checkSelected()) {
        return;
      }
      editStatus.formDisabled = false;
      editStatus.isEdit = true;
      editStatus.saveOrUpdateButtonTitle = "更新";
    }

    function handleDeleteRadioClick(callback?: FunctionConstructor): void {
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

    function handleCancelSelectRadioClick(): void {
      const tree = unref(menuTreeRef);
      tree.setCurrentKey(null);
      copyParamsWithKeys(selectEditForm, rawEditForm, keys);
      copyParamsWithKeys(editForm, rawEditForm, keys);
    }

    function handleTreeNodeClick(params: MenuTreeNode): void {
      copyParamsWithKeys(editForm, params, keys);
      copyParamsWithKeys(selectEditForm, params, keys);
    }

    function handleFormCreateOrUpdate(callback?: FunctionConstructor): void {
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

    function handleFormCancel(): void {
      editStatus.formDisabled = true;
      handleCancelSelectRadioClick();
    }

    onMounted(() => {
      fetchData();
    });
    return {
      tableHeaders,
      menuTreeRef,
      menuFormRef,
      menuData,
      editForm,
      editStatus,
      rules,
      CommonStatus,
      fetchData,
      getCommonStatusDesc,
      getCommonStatusTag,
      getDisableButtonParams,
      handleCreateRadioClick,
      handleEditRadioClick,
      handleDeleteRadioClick,
      handleCancelSelectRadioClick,
      handleTreeNodeClick,
      handleFormCreateOrUpdate,
      handleFormCancel,
    };
  },
});
