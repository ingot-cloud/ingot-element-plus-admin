import { defineComponent, onMounted } from "vue";
import { fetchDeptTree, getDeptData } from "@/store/composition/dept";
import {
  condition,
  pageInfo,
  fetchUserData,
  handleTreeNodeClick,
  handleCreateUser,
  handleEditUser,
  handleDeleteUser,
  handleDisableUser,
  currentDeptNode
} from "./composition/user";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  CommonStatus
} from "@/model/common";

export default defineComponent({
  components: {},
  data() {
    return {
      listHeaders: [
        {
          label: "序号",
          prop: "id",
          type: "index"
        },
        {
          label: "用户名",
          prop: "username"
        },
        {
          label: "手机号",
          prop: "phone"
        },
        {
          label: "email",
          prop: "email"
        },
        {
          label: "状态",
          prop: "status"
        },
        {
          label: "注册时间",
          prop: "createdAt"
        },
        {
          label: "操作",
          width: "210",
          prop: "actions"
        }
      ]
    };
  },
  setup() {
    const deptTree = getDeptData();

    onMounted(() => {
      fetchDeptTree().then(deptData => {
        handleTreeNodeClick(deptData.data[0]);
      });
    });

    return {
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
              type: "danger"
            };
          case CommonStatus.Lock:
            return {
              title: "解锁",
              type: "success"
            };
        }
      },
      fetchUserData,
      handleTreeNodeClick,
      handleCreateUser,
      handleEditUser,
      handleDeleteUser,
      handleDisableUser
    };
  }
});
