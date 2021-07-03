import { defineComponent, onMounted, reactive, ref } from "vue";
import { tableHeaders } from "./biz/table";
import { useStore } from "@/store";
import { SysRole } from "@/model";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  getDisableButtonParams,
} from "@/model/common";
import {
  handleCreate,
  handleDelete,
  handleEdit,
  handleDisable,
} from "./biz/tenant";
import { fetchData, computedRecords } from "@/store/composition/tenant";
import EditDialog from "./component/EditDialog.vue";

export default defineComponent({
  components: {
    EditDialog,
  },
  setup() {
    const condition = reactive({} as SysRole);
    const store = useStore();
    const records = computedRecords();
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
      records,
      getCommonStatusTag,
      getCommonStatusDesc,
      getDisableButtonParams,
      refreshData,
      handleCreate,
      handleEdit,
      handleDisable,
      handleDelete,
    };
  },
});
