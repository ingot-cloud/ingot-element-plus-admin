import { defineComponent, onMounted } from "vue";
import { tableHeaders } from "./biz/table";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  getDisableButtonParams,
} from "@/model/common";
import {
  createDialogRef,
  fetchData,
  handleCreate,
  handleDelete,
  handleManager,
  handleDisable,
  condition,
  pageInfo,
} from "./biz/client";
import CreateDialog from "./component/CreateDialog.vue";

export default defineComponent({
  components: {
    CreateDialog,
  },
  setup() {
    onMounted(() => {
      fetchData();
    });

    const grantTypeList = (authorizedGrantTypes: string) => {
      if (!authorizedGrantTypes) {
        return [];
      }
      const arr = authorizedGrantTypes.split(",");
      if (!arr || arr.length === 0) {
        return null;
      }
      return arr;
    };

    return {
      createDialogRef,
      tableHeaders,
      pageInfo,
      condition,
      getCommonStatusTag,
      getCommonStatusDesc,
      getDisableButtonParams,
      grantTypeList,
      fetchData,
      handleCreate,
      handleManager,
      handleDisable,
      handleDelete,
    };
  },
});
