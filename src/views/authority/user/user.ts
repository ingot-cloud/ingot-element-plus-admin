import { defineComponent, onMounted, ref } from "vue";
import { fetchDeptTree, computedDeptData } from "@/store/composition/dept";
import {
  fetchCacheData as fetchRoleData,
  computedRecords as computedRoleRecords,
} from "@/store/composition/role";
import {
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
import { getCommonStatusDesc, getCommonStatusTag, CommonStatus } from "@/model";
import { useStore } from "@/store";
import CreateDialog from "./component/CreateDialog.vue";

export default defineComponent({
  components: {
    CreateDialog,
  },
  setup() {
    const createDialog = ref();
    const deptTree = computedDeptData();
    const roleRecords = computedRoleRecords();
    const store = useStore();

    onMounted(() => {
      fetchDeptTree(store).then((deptData) => {
        handleTreeNodeClick(deptData.data[0]);
      });
      fetchRoleData(store);
    });

    return {
      createDialog,
      tableHeaders,
      deptTree,
      roleRecords,
      condition,
      pageInfo,
      currentDeptNode,
      getCommonStatusTag,
      getCommonStatusDesc,
      disableButtonParams: (status: CommonStatus) => {
        switch (status) {
          case CommonStatus.Enable:
            return {
              title: "锁定",
              type: "danger",
            };
          case CommonStatus.Lock:
            return {
              title: "解锁",
              type: "success",
            };
        }
      },
      fetchUserData,
      handleTreeNodeClick,
      handleCreateUser,
      handleDetailUser,
      handleDeleteUser,
      handleDisableUser,
    };
  },
});
