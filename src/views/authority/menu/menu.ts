import { defineComponent, onMounted } from "vue";
import {
  menuData,
  menuFormRef,
  menuTreeRef,
  editForm,
  editStatus,
  rules,
  fetchData,
  handleCreateRadioClick,
  handleEditRadioClick,
  handleDeleteRadioClick,
  handleCancelSelectRadioClick,
  handleTreeNodeClick,
  handleFormCreateOrUpdate,
  handleFormCancel,
} from "./biz/menu";
import { tableHeaders } from "./biz/table";
import {
  CommonStatus,
  getCommonStatusDesc,
  getCommonStatusTag,
  getDisableButtonParams,
} from "@/model/common";

export default defineComponent({
  setup() {
    onMounted(() => {
      fetchData();
    });
    return {
      condition: {},
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
