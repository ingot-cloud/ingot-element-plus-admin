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
import { getDeptData, fetchDeptTree } from "@/store/composition/dept";
import { defineComponent, onMounted, ref, Ref } from "vue";

export default defineComponent({
  components: {},
  setup() {
    onMounted(() => {
      fetchDeptTree();
    });

    const deptFormRef = ref();
    const deptData = getDeptData();
    return {
      deptData,
      deptFormRef,
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
        handleDeleteButtonClick(fetchDeptTree);
      },
      handleCreateOrUpdateDept: (formRef: Ref) => {
        handleCreateOrUpdateDept(formRef, fetchDeptTree);
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
