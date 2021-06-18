import { defineComponent, onMounted, reactive } from "vue";
import { tableHeaders } from "./biz/table";
import { useStore } from "@/store";
import { SysRole } from "@/model";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  CommonStatus,
} from "@/model/common";
import { fetchData, computedRecords } from "@/store/composition/tenant";

export default defineComponent({
  setup() {
    const condition = reactive({} as SysRole);
    const store = useStore();
    const records = computedRecords();

    onMounted(() => {
      fetchData(store);
    });

    return {
      condition,
      tableHeaders,
      records,
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
    };
  },
});
