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
            @in-click="paging.exec"
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
      @handleSizeChange="paging.exec"
      @handleCurrentChange="paging.exec"
      @refresh="paging.exec"
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
        <in-tag
          :value="useTokenAuthMethodEnum.getTagText(item.tokenAuthType)"
        />
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
            confirmStatus.exec(item.id, item.status, `客户端(${item.clientId})`)
          "
        />
        <in-button
          text
          link
          type="danger"
          @click="
            confirmDelete.exec(item.id, `是否删除客户端(${item.clientId})`)
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
  <CreateDialog ref="CreateDialogRef" @success="paging.exec" />
</template>
<script lang="ts" setup>
import { tableHeaders } from "./table";
import type { OAuth2RegisteredClient } from "@/models";
import { useTokenAuthMethodEnum } from "@/models/enums";
import {
  ClientPageAPI,
  UpdateClientAPI,
  RemoveClientAPI,
} from "@/api/basic/client";

import CreateDialog from "./CreateDialog.vue";
import type { API as CreateDialogAPI } from "./CreateDialog.vue";
import router from "@/router";

onMounted(() => {
  paging.exec();
});

const CreateDialogRef = ref<CreateDialogAPI>();
const paging = usePaging(transformPageAPI(ClientPageAPI));
const confirmStatus = useConfirmStatus(
  transformUpdateAPI(UpdateClientAPI),
  paging.exec
);
const confirmDelete = useConfirmDelete(
  transformDeleteAPI(RemoveClientAPI),
  paging.exec
);

const handleCreate = (): void => {
  CreateDialogRef.value?.show();
};

const handleManager = (params: OAuth2RegisteredClient): void => {
  router.push({
    path: `/basic/client/details/${params.id}`,
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
