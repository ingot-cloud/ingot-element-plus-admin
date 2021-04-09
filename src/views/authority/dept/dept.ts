import {
  deptTree,
  loading,
  handleTreeNodeClick,
  fetchDeptData
} from "./composition/dept";
import {
  DeptRoleScope,
  getDeptRoleScopeDesc,
  CommonStatus,
  getCommonStatusDesc
} from "@/model";
import {
  formModel,
  rules,
  saveOrUpdateButtonTitle,
  handleCreateButtonClick,
  handleEditButtonClick,
  handleDeleteButtonClick
} from "./composition/edit";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  components: {},
  setup() {
    onMounted(() => {
      fetchDeptData();
    });

    return {
      deptTree,
      loading,
      formModel,
      rules,
      DeptRoleScope,
      getDeptRoleScopeDesc,
      CommonStatus,
      getCommonStatusDesc,
      saveOrUpdateButtonTitle,
      handleCreateButtonClick,
      handleEditButtonClick,
      handleDeleteButtonClick,
      handleTreeNodeClick
    };
  },
  methods: {
    testClick(data: any) {
      console.log(data);
    }
  }
});
