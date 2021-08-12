import { defineComponent, reactive, toRaw, onMounted, ref, unref } from "vue";
import { useRoute } from "vue-router";
import { getBindUsers, bindUser } from "@/api/authority/role";
import { tableHeaders } from "./header";
import { Page, SysUser, PageChangeParams, RoleBindParams } from "@/model";
import { Confirm, Message } from "@/utils/message";
import BindView from "./BindView.vue";

export default defineComponent({
  props: ["id"],
  components: {
    BindView,
  },
  setup(props) {
    const route = useRoute();
    const headers = ref(Object.assign([], tableHeaders));
    const editBatch = ref(false);
    const bindTable = ref();
    const bindView = ref();
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
          bindPageInfo.current = 1;
          bindPageInfo.size = 20;
        } else {
          params = params as PageChangeParams;
          bindPageInfo[params.type] = params.value;
        }
      }
      getBindUsers(
        { current: bindPageInfo.current, size: bindPageInfo.size },
        props.id,
        true,
        toRaw(queryCondition)
      ).then((response) => {
        bindPageInfo.records = response.data.records;
        bindPageInfo.total = Number(response.data.total);
      });
    };

    const handleUnbind = (item: SysUser) => {
      Confirm.warning(`是否解绑用户:${item.username}`).then(() => {
        bindUser({ id: props.id, removeIds: [item.id as string] }).then(() => {
          Message.success("操作成功");
          fetchData();
          // 更新未绑定数据
          const view = unref(bindView);
          view.fetchData();
        });
      });
    };

    const handleBatchUnbind = () => {
      Confirm.warning("是否解绑所选用户?").then(() => {
        const removeIds = selectData.value.map((item) => item.id as string);
        bindUser({ id: props.id, removeIds }).then(() => {
          Message.success("操作成功");
          fetchData();
          // 更新未绑定数据
          const view = unref(bindView);
          view.fetchData();
        });
      });
    };

    onMounted(() => {
      fetchData(true);
    });

    return {
      title: `角色：${route.query.name}`,
      bindTable,
      bindView,
      editBatch,
      headers,
      bindPageInfo,
      bindParams,
      selectData,
      queryCondition,
      fetchData,
      handleUnbind,
      handleBatchUnbind,
      cancelEditBatch() {
        editBatch.value = false;
        const table = unref(bindTable);
        table.clearSelection();
      },
      editTableColumn() {
        editBatch.value = false;
        const table = unref(bindTable);
        table.editHeader();
      },
      onSelectChanged(selection: Array<any>) {
        selectData.value = selection;
      },
      showBindMoreView() {
        editBatch.value = false;
        const view = unref(bindView);
        view.show();
      },
    };
  },
});
