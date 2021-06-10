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
} from "./biz/edit";
import { computedDeptData, fetchDeptTree } from "@/store/composition/dept";
import { defineComponent, onMounted, ref, Ref } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  components: {},
  setup() {
    const deptFormRef = ref();
    const deptData = computedDeptData();
    const store = useStore();

    const innerFetchDeptTree = () => {
      fetchDeptTree(store);
    };

    onMounted(() => {
      innerFetchDeptTree();
    });
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
        handleDeleteButtonClick(store, innerFetchDeptTree);
      },
      handleCreateOrUpdateDept: (formRef: Ref) => {
        handleCreateOrUpdateDept(store, formRef, innerFetchDeptTree);
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
