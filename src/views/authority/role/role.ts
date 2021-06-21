import { defineComponent, onMounted, reactive, ref } from "vue";
import { tableHeaders } from "./biz/table";
import { useStore } from "@/store";
import { SysRole } from "@/model";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  CommonStatus,
} from "@/model/common";
import { fetchData, computedRecords } from "@/store/composition/role";
import {
  fetchData as fetchTenantData,
  computedRecords as computedTenantRecords,
} from "@/store/composition/tenant";
import {
  handleCreate,
  handleDelete,
  handleEdit,
  handleDisable,
} from "./biz/role";
import EditDialog from "./component/EditDialog.vue";

export default defineComponent({
  components: {
    EditDialog,
  },
  setup() {
    const condition = reactive({} as SysRole);
    const store = useStore();
    const roleData = computedRecords();
    const editDialog = ref();

    onMounted(() => {
      fetchData(store, condition);
    });

    return {
      editDialog,
      condition,
      tableHeaders,
      roleData,
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
      handleCreate,
      handleEdit,
      handleDelete,
      handleDisable,
    };
  },
});
