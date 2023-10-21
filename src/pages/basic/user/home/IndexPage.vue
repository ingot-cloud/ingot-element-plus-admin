<template>
  <in-filter-container>
    <template #top>
      <in-filter-item>
        <in-with-label title="手机号">
          <el-input
            v-model="ops.condition.phone"
            clearable
            style="width: 200px"
            placeholder="请输入手机号"
          ></el-input>
        </in-with-label>

        <template #rightActions>
          <in-button @click="ops.resetFilter"> 重置 </in-button>
          <in-button
            type="primary"
            :loading="ops.loading.value"
            @click="ops.fetchUserData"
          >
            搜索
          </in-button>
        </template>
      </in-filter-item>
    </template>

    <in-table
      :loading="ops.loading.value"
      :data="ops.pageInfo.records"
      :headers="tableHeaders"
      :page="ops.pageInfo"
      ref="tableRef"
      @refresh="ops.fetchUserData"
      @handleSizeChange="ops.fetchUserData"
      @handleCurrentChange="ops.fetchUserData"
    >
      <template #toolbar>
        <in-button type="primary" @click="handleCreateUser">
          添加用户
        </in-button>
      </template>
      <template #avatar="{ item }">
        <div flex flex-row items-center gap-2>
          <el-image
            v-if="item.avatar"
            class="w-30px h-30px"
            :src="item.avatar"
            fit="cover"
          />
          {{ item.nickname }}
        </div>
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status" />
      </template>
      <template #actions="{ item }">
        <in-button link text type="primary" @click="handleDetailUser(item)">
          <template #icon>
            <i-mdi:card-account-details-outline />
          </template>
          详情
        </in-button>
        <common-status-button
          text
          link
          :status="item.status"
          @click="ops.handleDisableUser(item)"
        />
      </template>
    </in-table>
  </in-filter-container>

  <CreateDrawer ref="CreateDrawerRef" @success="ops.fetchUserData" />
  <EditDrawer ref="EditDrawerRef" @success="ops.fetchUserData" />
</template>

<script lang="ts" setup>
import type { TableAPI } from "@/components/table";
import type { SysUser } from "@/models";
import { useOps } from "./useOps";
import { tableHeaders } from "./table";
import CreateDrawer from "./CreateDrawer.vue";
import EditDrawer from "./EditDrawer.vue";

const ops = useOps();

const CreateDrawerRef = ref();
const EditDrawerRef = ref();
const tableRef = ref<TableAPI>();

const handleCreateUser = (): void => {
  CreateDrawerRef.value?.show();
};

const handleDetailUser = (params: SysUser): void => {
  EditDrawerRef.value.show(params);
};

onMounted(() => {
  ops.fetchUserData();
});
</script>
