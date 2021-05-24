import { deptTree, loading, fetchDeptData } from "./composition/dept";
import {
  DeptRoleScope,
  getDeptRoleScopeDesc,
  CommonStatus,
  getCommonStatusDesc
} from "@/model";
import {
  formModel,
  rules,
  deptEditStatus,
  handleTreeNodeClick,
  handleCreateButtonClick,
  handleEditButtonClick,
  handleDeleteButtonClick,
  handleCreateOrUpdateDept,
  handleCancelEdit
} from "./composition/edit";
import { defineComponent, onMounted, ref, Ref } from "vue";

export default defineComponent({
  components: {},
  setup() {
    onMounted(() => {
      fetchDeptData();
    });

    const deptFormRef = ref();

    return {
      deptFormRef,
      deptTree,
      loading,
      formModel,
      rules,
      deptEditStatus,
      DeptRoleScope,
      getDeptRoleScopeDesc,
      CommonStatus,
      getCommonStatusDesc,
      handleCreateButtonClick,
      handleEditButtonClick,
      handleDeleteButtonClick: () => {
        handleDeleteButtonClick(fetchDeptData);
      },
      handleCreateOrUpdateDept: (formRef: Ref) => {
        handleCreateOrUpdateDept(formRef, fetchDeptData);
      },
      handleCancelEdit,
      handleTreeNodeClick
    };
  },
  methods: {
    testClick(data: any) {
      console.log(data);
    }
  }
});
