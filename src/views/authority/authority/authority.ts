import { defineComponent, onMounted, reactive, ref } from "vue";
import { tableHeaders } from "./biz/table";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  CommonStatus,
} from "@/model/common";
import {
  fetchData,
  handleCreate,
  handleDelete,
  handleEdit,
  handleDisable,
  condition,
  pageInfo,
} from "./biz/authority";

export default defineComponent({
  setup() {
    return {
      tableHeaders,
      pageInfo,
      condition,
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
      fetchData,
      handleCreate,
      handleEdit,
      handleDisable,
      handleDelete,
    };
  },
});
