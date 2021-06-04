import { loading, fetchDeptData } from "./composition/dept";
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
import { useStore } from "@/store";
import { defineComponent, onMounted, ref, Ref, computed } from "vue";

export default defineComponent({
  components: {},
  setup() {
    onMounted(() => {
      fetchDeptData();
    });

    const deptFormRef = ref();
    const store = useStore();
    return {
      detpData: computed(() => {
        return store.getters.deptData;
      }),
      deptFormRef,
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
