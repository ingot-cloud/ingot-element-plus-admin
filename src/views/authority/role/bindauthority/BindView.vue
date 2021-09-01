<template>
  <el-drawer
    :title="title"
    v-model="isShow"
    direction="ltr"
    :modal="false"
    size="70%"
  >
    <ingot-container>
      <ingot-table
        :headers="headers"
        :data="bindPageInfo.records"
        :row-key="treeData.key"
        :tree-props="treeData.props"
        :selection="editBatch"
        :index="!editBatch"
        :selectable="selectable"
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
            v-model="queryCondition.name"
            placeholder="权限名称"
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
        <template #scope="{ item }">
          {{ getDeptRoleScopeDesc(item.scope) }}
        </template>
        <template #status="{ item }">
          <ingot-common-status-tag :status="item.status" />
        </template>
        <template #actions="{ item }">
          <el-button
            size="mini"
            type="success"
            @click="handleBind(item)"
            :disabled="!selectable(item)"
          >
            绑定
          </el-button>
        </template>
      </ingot-table>
    </ingot-container>
  </el-drawer>
</template>
<script lang="ts" setup>
import {
  defineProps,
  defineEmits,
  defineExpose,
  PropType,
  computed,
} from "vue";
import { useRoute } from "vue-router";
import { getBindAuthorities, bindAuthority } from "@/api/authority/role";
import { tableHeaders } from "./header";
import {
  Page,
  SysAuthority,
  AuthorityTreeNode,
  IngotResponse,
  RoleBindParams,
  getDeptRoleScopeDesc,
} from "@/model";
import { unbindSetup } from "@/views/authority/role/common/bind";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  bindArray: {
    type: Array as PropType<Array<AuthorityTreeNode>>,
    required: true,
  },
});
const emits = defineEmits(["dataChanged"]);
const route = useRoute();
const treeData = {
  props: { children: "children", hasChildren: "hasChildren" },
  key: "id",
};

const stretch = (tree: Array<AuthorityTreeNode>): Array<string> => {
  let ids: Array<string> = [];

  tree.forEach((item) => {
    ids.push(item.id as string);
    if (item.children) {
      ids = ids.concat(stretch(item.children));
    }
  });

  return ids;
};

const bindIds = computed(() => stretch(props.bindArray));

const selectable = (row: AuthorityTreeNode) => {
  return !bindIds.value.includes(row.id as string);
};
const {
  title,
  isShow,
  bindTable,
  editBatch,
  headers,
  bindPageInfo,
  selectData,
  queryCondition,
  fetchData,
  handleBind,
  handleBatchBind,
  cancelEditBatch,
  onSelectChanged,
  show,
} = unbindSetup({
  title: `角色：${route.query.name} - 关联更多权限`,
  id: props.id,
  tableHeaders,
  singleConfirmMessage(item: SysAuthority) {
    return `是否绑定权限:${item.name}`;
  },
  batchConfirmMessage: "是否绑定所选权限?",
  fetchData(
    page: Page,
    id: string,
    isBind: boolean,
    condition?: SysAuthority
  ): Promise<IngotResponse<Page<AuthorityTreeNode>>> {
    return new Promise((resolve, reject) => {
      getBindAuthorities(id, isBind, condition)
        .then((response) => {
          resolve({
            code: response.code,
            message: response.message,
            data: {
              total: response.data.length,
              records: response.data,
            },
            headers: response.headers,
          });
        })
        .catch((re) => {
          reject(re);
        });
    });
  },
  bind(bindParams: RoleBindParams): Promise<IngotResponse<void>> {
    return bindAuthority(bindParams);
  },
  emit: emits,
});

defineExpose({
  show,
  fetchData,
});
</script>
