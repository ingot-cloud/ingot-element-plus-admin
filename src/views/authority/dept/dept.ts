import { defineComponent, onMounted, ref, unref } from "vue";
import { tableHeaders } from "./table";
import { DeptTreeNode, SysDept } from "@/model";
import { useStore } from "@/store";
import {
  computedDeptTreeListData,
  fetchDeptTree,
  removeDept,
} from "@/store/composition/dept";
import { Confirm, Message } from "@/utils/message";
import EditDialog from "./EditDialog.vue";

export default defineComponent({
  components: {
    EditDialog,
  },
  setup() {
    const store = useStore();
    const editDialogRef = ref();
    const loading = ref(false);
    const treeData = computedDeptTreeListData();
    const selectData = ref([] as Array<DeptTreeNode>);

    const fetchData = () => {
      loading.value = true;
      fetchDeptTree(store)
        .then((data) => {
          loading.value = false;
          selectData.value = [
            {
              id: undefined,
              name: "根部门",
              children: data,
            },
          ];
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const showEditDialog = (params?: SysDept | string) => {
      const dialog = unref(editDialogRef);
      dialog.show(params);
    };

    function handleDelete(params: SysDept): void {
      Confirm.warning(`是否删除部门${params.name}`).then(() => {
        removeDept(store, params.id as string).then(() => {
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
      treeData,
      selectData,
      fetchData,
      showEditDialog,
      handleDelete,
    };
  },
});
