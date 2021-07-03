import { defineComponent, onMounted } from "vue";
import { tableHeaders } from "./biz/table";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  getDisableButtonParams,
} from "@/model/common";
import {
  fetchData,
  handlePageChange,
  handleCreate,
  handleDelete,
  handleEdit,
  handleDisable,
  condition,
  pageInfo,
} from "./biz/client";

export default defineComponent({
  setup() {
    onMounted(() => {
      //
    });

    return {
      tableHeaders,
      pageInfo,
      condition,
      getCommonStatusTag,
      getCommonStatusDesc,
      getDisableButtonParams,
      fetchData,
      handlePageChange,
      handleCreate,
      handleEdit,
      handleDisable,
      handleDelete,
    };
  },
});
