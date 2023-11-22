<template>
  <in-filter-container>
    <template #top>
      <in-filter-item>
        <in-with-label title="角色名称">
          <el-input
            v-model="filter.roleName"
            clearable
            style="width: 200px"
            placeholder="请输入角色名称"
          ></el-input>
        </in-with-label>
        <template #rightActions>
          <in-button @click="filter.roleName = undefined"> 重置 </in-button>
          <in-button type="primary" @in-click="refreshData" :loading="loading">
            搜索
          </in-button>
        </template>
      </in-filter-item>
    </template>
    <in-table
      :loading="loading"
      :data="roleTree"
      ref="tableRef"
      rowKey="customId"
      :headers="tableHeaders"
      @refresh="refreshData"
    >
      <template #title> 角色管理 </template>
      <template #toolbar>
        <in-button type="primary" @click="handleCreate(false)">
          添加角色
        </in-button>
        <in-button type="primary" @click="handleCreate(true)">
          添加角色组
        </in-button>
      </template>
      <template #code="{ item }">
        <el-tag>
          {{ item.code || "-" }}
        </el-tag>
      </template>
      <template #status="{ item }">
        <common-status-tag :status="item.status"></common-status-tag>
      </template>
      <template #type="{ item }">
        <in-tag-enum :value="item.type" :enumObj="roleType" />
      </template>
      <template #actions="{ item }">
        <in-button text link type="primary" @click="handleEdit(item)">
          <template #icon>
            <i-ep:edit />
          </template>
          编辑
        </in-button>
        <!-- <common-status-button
          :status="item.status"
          text
          link
          @click="
            confirmStatus.exec(item.id, item.status, `角色(${item.name})`)
          "
        >
        </common-status-button>
        <el-dropdown v-if="!item.isGroup" @command="handleBindCommand" m-l-10px>
          <in-button>
            <template #icon>
              <i-material-symbols:expand-more-rounded />
            </template>
            更多
          </in-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                :command="{ data: item, type: 'bindauthority' }"
              >
                关联权限
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
      </template>
    </in-table>

    <EditDrawer ref="EditDrawerRef" @success="refreshData" />
    <RoleDrawer
      ref="RoleDrawerRef"
      :groupList="groupList"
      @success="refreshData"
    />
    <RoleGroupDrawer ref="RoleGroupDrawerRef" @success="refreshData" />
  </in-filter-container>
</template>
<script lang="ts" setup>
import { tableHeaders } from "./table";
import type { RoleGroupItemVO, Option, RoleFilterDTO } from "@/models";
import EditDrawer from "./EditDrawer.vue";
import type { TableAPI } from "@/components/table";
import { useRoleStore } from "@/stores/modules/role";
import { useOrgTypeEnums } from "@/models/enums";
import router from "@/router";
import RoleDrawer from "../components/RoleDrawer.vue";
import RoleGroupDrawer from "../components/RoleGroupDrawer.vue";

const EditDrawerRef = ref();
const RoleDrawerRef = ref();
const RoleGroupDrawerRef = ref();
const tableRef = ref<TableAPI>();

const filter = ref<RoleFilterDTO>({});
const roleTree = ref<Array<RoleGroupItemVO>>([]);
const groupList = ref<Array<Option>>([]);

const loading = ref(false);
const roleType = useOrgTypeEnums();
const roleStore = useRoleStore();

const refreshData = () => {
  loading.value = true;
  roleStore
    .fetchRoleGroupList(filter.value)
    .then((data) => {
      loading.value = false;
      roleTree.value = data.map((item) => {
        item.children = item.children?.map((child) => {
          return {
            ...child,
            customId: `r${item.id}`,
          };
        });
        return {
          ...item,
          customId: `g${item.id}`,
        };
      });
      groupList.value = roleTree.value.map((item) => {
        return {
          value: item.id!,
          label: item.name!,
        };
      });
    })
    .catch(() => {
      loading.value = false;
    });
};

const handleCreate = (isGroup: boolean): void => {
  if (isGroup) {
    RoleGroupDrawerRef.value.show();
  } else {
    RoleDrawerRef.value.show();
  }
};

const handleEdit = (params: RoleGroupItemVO): void => {
  if (params.isGroup) {
    RoleGroupDrawerRef.value.show(params);
  } else {
    RoleDrawerRef.value.show(params);
  }
};

const handleBindCommand = (params: {
  type: string;
  data: RoleGroupItemVO;
}): void => {
  const type = params.type;
  const data = params.data;
  const roleId = data.id;

  router.push({
    path: `/basic/role/${type}/${roleId}`,
    query: {
      name: data.name,
    },
  });
};

onMounted(() => {
  refreshData();
});
</script>
