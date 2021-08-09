import { defineComponent, reactive, toRaw, onMounted, ref, unref } from "vue";
import { useRoute } from "vue-router";
import { getBindUsers, bindUser } from "@/api/authority/role";
import { tableHeaders } from "./header";
import { Page, SysUser, PageChangeParams, RoleBindParams } from "@/model";
import { Confirm, Message } from "@/utils/message";

export default defineComponent({
  props: ["id"],
  setup(props) {
    const route = useRoute();
    const headers = ref(Object.assign([], tableHeaders));
    const edit = ref(false);
    const bindTable = ref();
    const selectData = ref([] as Array<SysUser>);
    const bindPageInfo = reactive({
      current: 1,
      size: 20,
      total: 0,
      records: [],
    } as Page<SysUser>);
    const queryCondition = reactive({} as SysUser);

    const bindParams = reactive({ id: props.id } as RoleBindParams);

    const fetchData = (params?: PageChangeParams | boolean) => {
      if (params) {
        if (params instanceof Boolean) {
          bindPageInfo.current = 0;
          bindPageInfo.size = 20;
        } else {
          params = params as PageChangeParams;
          bindPageInfo[params.type] = params.value;
        }
      }
      const pageParams = toRaw(bindPageInfo);
      pageParams.total = undefined;
      pageParams.records = undefined;
      getBindUsers(pageParams, props.id, true, queryCondition).then(
        (response) => {
          bindPageInfo.records = response.data.records;
          bindPageInfo.total = Number(response.data.total);
        }
      );
    };

    const handleUnbind = (item: SysUser) => {
      Confirm.warning(`是否解绑用户:${item.username}`).then(() => {
        bindUser({ id: props.id, removeIds: [item.id as string] }).then(() => {
          Message.success("操作成功");
          fetchData();
        });
      });
    };

    const handleBatchUnbind = () => {
      Confirm.warning("是否解绑所选用户?").then(() => {
        const removeIds = selectData.value.map((item) => item.id as string);
        bindUser({ id: props.id, removeIds }).then(() => {
          Message.success("操作成功");
          fetchData();
        });
      });
    };

    onMounted(() => {
      fetchData(true);
    });

    return {
      title: `角色：${route.query.name}`,
      bindTable,
      edit,
      headers,
      bindPageInfo,
      bindParams,
      selectData,
      queryCondition,
      fetchData,
      handleUnbind,
      handleBatchUnbind,
      cancelEdit() {
        edit.value = false;
        const table = unref(bindTable);
        table.clearSelection();
      },
      editColumn() {
        edit.value = false;
        const table = unref(bindTable);
        table.editHeader();
      },
      onSelectChanged(selection: Array<SysUser>) {
        selectData.value = selection;
      },
    };
  },
});
