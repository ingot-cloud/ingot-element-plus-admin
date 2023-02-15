<template>
  <in-filter-container>
    <template #top>
      <div flex flex-row justify-between>
        <in-with-label title="客户端ID">
          <el-input
            v-model="paging.condition.clientId"
            clearable
            style="width: 180px"
            placeholder="请输入客户端ID"
          ></el-input>
        </in-with-label>
        <div>
          <in-button @click="paging.condition.clientId = undefined">
            重置
          </in-button>
          <in-button
            type="primary"
            :loading="paging.loading.value"
            @in-click="paging.fetchData"
          >
            搜索
          </in-button>
        </div>
      </div>
    </template>
    <in-table
      stripe
      :loading="paging.loading.value"
      :data="paging.pageInfo.records"
      :headers="tableHeaders"
      :page="paging.pageInfo"
      @handleSizeChange="paging.fetchData"
      @handleCurrentChange="paging.fetchData"
      @refresh="paging.fetchData"
    >
      <template #toolbar>
        <in-button type="primary" @click="handleCreate()"> 添加 </in-button>
      </template>
      <template #authorizationGrantTypes="{ item }">
        <el-tag
          style="margin: 1px"
          v-for="grant in stringToArray(item.authorizationGrantTypes)"
          :key="grant"
        >
          {{ grant }}
        </el-tag>
      </template>
      <template #scopes="{ item }">
        <el-tag
          style="margin: 1px"
          v-for="scope in stringToArray(item.scopes)"
          :key="scope"
        >
          {{ scope }}
        </el-tag>
      </template>
      <template #tokenAuthType="{ item }">
        <el-tag :type="getTokenAuthMethodTag(item.tokenAuthType)">
          {{ getTokenAuthMethodLabel(item.tokenAuthType) }}
        </el-tag>
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status" />
      </template>
      <template #actions="{ item }">
        <in-button type="primary" text link @click="handleManager(item)">
          <template #icon>
            <i-material-symbols:vpn-key-outline-rounded />
          </template>
          管理
        </in-button>
        <common-status-button
          text
          link
          :status="item.status"
          @click="
            confirmUpdate.handleUpdate(
              { id: item.id, status: getCommonStatusToggle(item.status) },
              `是否${getCommonStatusActionDesc(
                getCommonStatusToggle(item.status)
              )}客户端(${item.clientId})`
            )
          "
        />
        <in-button
          text
          link
          type="danger"
          @click="
            confirmDelete.handleDelete(
              item.id,
              `是否删除客户端(${item.clientId})`
            )
          "
        >
          <template #icon>
            <i-ep:delete />
          </template>
          删除
        </in-button>
      </template>
    </in-table>
  </in-filter-container>
  <CreateDialog ref="CreateDialogRef" @success="paging.fetchData" />
</template>
<script lang="ts" setup>
import { tableHeaders } from "./table";
import type { OAuth2RegisteredClient } from "@/models";
import {
  getTokenAuthMethodTag,
  getTokenAuthMethodLabel,
  getCommonStatusActionDesc,
  getCommonStatusToggle,
} from "@/models/enums";
import {
  ClientPageAPI,
  UpdateClientAPI,
  RemoveClientAPI,
} from "@/api/basic/client";
import {
  usePaging,
  useConfirmDelete,
  useConfirmUpdate,
  transformPage,
  transformDelete,
  transformUpdate,
} from "@/composables/biz/usePaging";
import CreateDialog from "./CreateDialog.vue";
import type { API as CreateDialogAPI } from "./CreateDialog.vue";
import router from "@/router";

onMounted(() => {
  paging.fetchData();
});

const CreateDialogRef = ref<CreateDialogAPI>();
const paging = usePaging(transformPage(ClientPageAPI));
const confirmUpdate = useConfirmUpdate(
  transformUpdate(UpdateClientAPI),
  paging.fetchData
);
const confirmDelete = useConfirmDelete(
  transformDelete(RemoveClientAPI),
  paging.fetchData
);

const handleCreate = (): void => {
  CreateDialogRef.value?.show();
};

const handleManager = (params: OAuth2RegisteredClient): void => {
  router.push({
    path: `/basic/client/${params.id}`,
  });
};

const stringToArray = (target: string, split = ",") => {
  if (!target) {
    return [];
  }
  const arr = target.split(split);
  if (!arr || arr.length === 0) {
    return null;
  }
  return arr;
};
</script>
