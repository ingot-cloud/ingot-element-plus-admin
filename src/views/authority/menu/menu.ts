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
import { CommonStatus, getCommonStatusDesc } from "@/model";

export default defineComponent({
  setup() {
    onMounted(() => {
      fetchData();
    });
    return {
      menuTreeRef,
      menuFormRef,
      menuData,
      editForm,
      editStatus,
      rules,
      CommonStatus,
      fetchData,
      getCommonStatusDesc,
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
