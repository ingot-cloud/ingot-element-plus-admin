import { defineComponent, onMounted, reactive, ref } from "vue";
import { tableHeaders } from "./biz/table";
import { useStore } from "@/store";
import { SysRole } from "@/model";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  getDisableButtonParams,
} from "@/model/common";
import { fetchData, computedRecords } from "@/store/composition/role";
import {
  handleCreate,
  handleDelete,
  handleEdit,
  handleDisable,
  handleBindCommand,
} from "./biz/role";
import EditDialog from "./component/EditDialog.vue";

export default defineComponent({
  components: {
    EditDialog,
  },
  setup() {
    const condition = reactive({} as SysRole);
    const store = useStore();
    const roleData = computedRecords();
    const editDialog = ref();

    const refreshData = () => {
      fetchData(store, condition);
    };

    onMounted(() => {
      refreshData();
    });

    return {
      editDialog,
      condition,
      tableHeaders,
      roleData,
      getCommonStatusTag,
      getCommonStatusDesc,
      getDisableButtonParams,
      handleBindCommand,
      refreshData,
      handleCreate,
      handleEdit,
      handleDelete,
      handleDisable,
    };
  },
});
