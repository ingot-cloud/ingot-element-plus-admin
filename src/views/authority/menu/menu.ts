import { defineComponent, onMounted, ref, reactive, unref } from "vue";
import { tableHeaders } from "./table";
import { MenuTreeNode, SysMenu } from "@/model";
import { getMenuTree, remove } from "@/api/authority/menu";
import { Confirm, Message } from "@/utils/message";
import EditDialog from "./EditDialog.vue";

export default defineComponent({
  components: {
    EditDialog,
  },
  setup() {
    const editDialogRef = ref();
    const loading = ref(false);
    const menuData = reactive({
      props: { children: "children", hasChildren: "hasChildren" },
      key: "id",
      data: [] as Array<MenuTreeNode>,
    });
    const selectData = ref([] as Array<MenuTreeNode>);

    const fetchData = () => {
      loading.value = true;
      getMenuTree()
        .then((response) => {
          loading.value = false;
          const data = response.data;
          menuData.data = data;
          selectData.value = [
            {
              id: undefined,
              name: "根菜单",
              children: data,
            },
          ];
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const showEditDialog = (params?: SysMenu | string) => {
      const dialog = unref(editDialogRef);
      dialog.show(params);
    };

    function handleDelete(params: SysMenu): void {
      Confirm.warning(`是否删除菜单${params.name}`).then(() => {
        remove(params.id as string).then(() => {
          Message.success("操作成功");
          fetchData();
        });
      });
    }

    onMounted(() => {
      fetchData();
    });
    return {
      editDialogRef,
      tableHeaders,
      menuData,
      selectData,
      fetchData,
      showEditDialog,
      handleDelete,
    };
  },
});
