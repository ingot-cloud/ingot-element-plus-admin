<template>
  <el-drawer
    title="绑定更多"
    v-model="isShow"
    direction="ltr"
    :modal="false"
    size="70%"
  >
    <ingot-container>
      <ingot-table
        :headers="headers"
        :data="bindPageInfo.records"
        :page="bindPageInfo"
        :selection="editBatch"
        :index="!editBatch"
        ref="bindTable"
        @handleSizeChange="fetchData"
        @handleCurrentChange="fetchData"
        @selectionChange="onSelectChanged"
      >
        <template #filter-title>
          <el-input
            class="item"
            size="small"
            clearable
            style="width: 200px"
            v-model="queryCondition.username"
            placeholder="用户名"
          ></el-input>
          <el-button
            size="small"
            type="primary"
            class="item"
            @click="fetchData"
          >
            搜索
          </el-button>
        </template>
        <template #filter>
          <div v-if="!editBatch" class="item">
            <el-button size="small" @click="editBatch = true">
              批量绑定
            </el-button>
          </div>
          <div v-else class="item">
            <el-button
              size="small"
              type="danger"
              class="item"
              :disabled="selectData.length === 0"
              @click="handleBatchBind"
            >
              绑定
            </el-button>
            <el-button size="small" type="warning" @click="cancelEditBatch">
              取消
            </el-button>
          </div>
        </template>
        <template #status="{ item }">
          <ingot-common-status-tag :status="item.status" />
        </template>
        <template #actions="{ item }">
          <el-button size="mini" type="success" @click="handleBind(item)">
            绑定
          </el-button>
        </template>
      </ingot-table>
    </ingot-container>
  </el-drawer>
</template>
<script lang="ts">
import { defineComponent, reactive, toRaw, ref, unref, onMounted } from "vue";
import { getBindUsers, bindUser } from "@/api/authority/role";
import { tableHeaders } from "./header";
import { Page, SysUser, PageChangeParams, RoleBindParams } from "@/model";
import { Confirm, Message } from "@/utils/message";
export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  emits: ["dataChanged"],
  setup(props, { emit }) {
    const isShow = ref(false);
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
      getBindUsers(pageParams, props.id, false, queryCondition).then(
        (response) => {
          bindPageInfo.records = response.data.records;
          bindPageInfo.total = Number(response.data.total);
        }
      );
    };

    const handleBind = (item: SysUser) => {
      Confirm.warning(`是否绑定用户:${item.username}`).then(() => {
        bindUser({ id: props.id, bindIds: [item.id as string] }).then(() => {
          Message.success("操作成功");
          emit("dataChanged");
          fetchData();
        });
      });
    };

    const handleBatchBind = () => {
      Confirm.warning("是否绑定所选用户?").then(() => {
        const bindIds = selectData.value.map((item) => item.id as string);
        bindUser({ id: props.id, bindIds }).then(() => {
          Message.success("操作成功");
          emit("dataChanged");
          fetchData();
        });
      });
    };

    onMounted(() => {
      if (bindPageInfo.records?.length === 0) {
        fetchData();
      }
    });

    return {
      isShow,
      bindTable,
      bindView,
      editBatch,
      headers,
      bindPageInfo,
      bindParams,
      selectData,
      queryCondition,
      fetchData,
      handleBind,
      handleBatchBind,
      cancelEditBatch() {
        editBatch.value = false;
        const table = unref(bindTable);
        table.clearSelection();
      },
      onSelectChanged(selection: Array<SysUser>) {
        selectData.value = selection;
      },
      show() {
        isShow.value = true;
      },
    };
  },
});
</script>
