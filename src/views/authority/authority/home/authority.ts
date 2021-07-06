import { defineComponent, onMounted } from "vue";
import { tableHeaders } from "./biz/table";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  getDisableButtonParams,
} from "@/model/common";
import {
  fetchData,
  handleCreate,
  handleDelete,
  handleEdit,
  handleDisable,
  condition,
  pageInfo,
  editDialogRef,
} from "./biz/authority";
import EditDialog from "./component/EditDialog.vue";

export default defineComponent({
  components: {
    EditDialog,
  },
  setup() {
    onMounted(() => {
      fetchData();
    });

    return {
      editDialogRef,
      tableHeaders,
      pageInfo,
      condition,
      getCommonStatusTag,
      getCommonStatusDesc,
      getDisableButtonParams,
      fetchData,
      handleCreate,
      handleEdit,
      handleDisable,
      handleDelete,
    };
  },
});
