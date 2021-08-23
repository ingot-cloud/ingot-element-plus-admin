import { defineComponent, onMounted, ref } from "vue";
import { fetchDeptTree, computedDeptTreeData } from "@/store/composition/dept";
import {
  fetchCacheData as fetchRoleData,
  computedRecords as computedRoleRecords,
} from "@/store/composition/role";
import {
  showDept,
  condition,
  pageInfo,
  fetchUserData,
  handleTreeNodeClick,
  handleCreateUser,
  handleDetailUser,
  handleDeleteUser,
  handleDisableUser,
  currentDeptNode,
} from "./biz/user";
import { tableHeaders } from "./biz/table";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  getDisableButtonParams,
} from "@/model";
import { useStore } from "@/store";
import CreateDialog from "./component/CreateDialog.vue";

export default defineComponent({
  components: {
    CreateDialog,
  },
  setup() {
    const createDialog = ref();
    const deptTree = computedDeptTreeData();
    const roleRecords = computedRoleRecords();
    const store = useStore();

    onMounted(() => {
      fetchDeptTree(store).then((data) => {
        handleTreeNodeClick(data[0]);
      });
      fetchRoleData(store);
    });

    return {
      showDept,
      createDialog,
      tableHeaders,
      deptTree,
      roleRecords,
      condition,
      pageInfo,
      currentDeptNode,
      getCommonStatusTag,
      getCommonStatusDesc,
      getDisableButtonParams,
      fetchUserData,
      handleTreeNodeClick,
      handleCreateUser,
      handleDetailUser,
      handleDeleteUser,
      handleDisableUser,
    };
  },
});
