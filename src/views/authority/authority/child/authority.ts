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
  parent,
} from "./biz/authority";
import EditDialog from "./component/EditDialog.vue";
import { useRoute } from "vue-router";
import { copyParams } from "@/utils/object";

export default defineComponent({
  components: {
    EditDialog,
  },
  setup() {
    const route = useRoute();

    onMounted(() => {
      copyParams(parent, route.query);
      fetchData();
    });

    return {
      parent,
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
