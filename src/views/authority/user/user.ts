import { defineComponent, onMounted, ref } from "vue";
import { fetchDeptTree, computedDeptData } from "@/store/composition/dept";
import {
  condition,
  pageInfo,
  fetchUserData,
  handleTreeNodeClick,
  handleCreateUser,
  handleEditUser,
  handleDeleteUser,
  handleDisableUser,
  currentDeptNode,
} from "./biz/user";
import { Headers as listHeaders } from "./biz/table";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  CommonStatus,
} from "@/model/common";
import { useStore } from "@/store";
import CreateDialog from "./component/CreateDialog.vue";

export default defineComponent({
  components: {
    CreateDialog,
  },
  setup() {
    const createDialog = ref();
    const deptTree = computedDeptData();
    const store = useStore();

    onMounted(() => {
      fetchDeptTree(store).then((deptData) => {
        handleTreeNodeClick(deptData.data[0]);
      });
    });

    return {
      createDialog,
      listHeaders,
      deptTree,
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
      handleEditUser,
      handleDeleteUser,
      handleDisableUser,
    };
  },
});
