import { defineComponent, onMounted } from "vue";
import {
  menuData,
  menuFormRef,
  editForm,
  editStatus,
  rules,
  fetchData,
  handleCreateRadioClick,
  handleEditRadioClick,
  handleCancelRadioClick,
  handleTreeNodeClick,
  handleFormCreateOrUpdate,
  handleFormCancel,
} from "./biz/menu";
import { CommonStatus, getCommonStatusDesc } from "@/model";

export default defineComponent({
  setup() {
    onMounted(() => {
      fetchData();
    });
    return {
      menuFormRef,
      menuData,
      editForm,
      editStatus,
      rules,
      CommonStatus,
      getCommonStatusDesc,
      handleCreateRadioClick,
      handleEditRadioClick,
      handleCancelRadioClick,
      handleTreeNodeClick,
      handleFormCreateOrUpdate,
      handleFormCancel,
    };
  },
});
