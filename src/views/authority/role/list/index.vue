<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <ingot-table :data="roleData" :headers="tableHeaders">
        <template #filter>
          <el-input
            v-model="condition.name"
            class="item"
            size="small"
            clearable
            style="width: 200px"
            placeholder="角色名"
          ></el-input>
          <el-button
            class="item"
            size="small"
            type="primary"
            @click="refreshData"
          >
            搜索
          </el-button>
          <el-button
            class="item"
            size="small"
            type="success"
            @click="handleCreate"
          >
            添加
          </el-button>
        </template>
        <template #status="{ item }">
          <el-tag :type="getCommonStatusTag(item.status)">
            {{ getCommonStatusDesc(item.status) }}
          </el-tag>
        </template>
        <template #actions="{ item }">
          <el-button
            class="action-item"
            size="mini"
            type="primary"
            @click="handleEdit(item)"
          >
            编辑
          </el-button>
          <el-dropdown @command="handleBindCommand">
            <el-button type="success" size="mini" class="action-item">
              绑定<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :command="{ data: item, type: 'binduser' }">
                  用户
                </el-dropdown-item>
                <el-dropdown-item :command="{ data: item, type: 'binddept' }">
                  部门
                </el-dropdown-item>
                <el-dropdown-item
                  divided
                  :command="{ data: item, type: 'bindmenu' }"
                >
                  菜单
                </el-dropdown-item>
                <el-dropdown-item
                  :command="{ data: item, type: 'bindauthority' }"
                >
                  权限
                </el-dropdown-item>
                <el-dropdown-item
                  divided
                  :command="{ data: item, type: 'bindclient' }"
                >
                  客户端
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button
            class="action-item"
            size="mini"
            :type="getDisableButtonParams(item.status).type"
            :disabled="!item.canAction"
            @click="handleDisable(item, refreshData)"
          >
            {{ getDisableButtonParams(item.status).title }}
          </el-button>
          <el-button
            class="action-item"
            size="mini"
            type="danger"
            @click="handleDelete(item, refreshData)"
            :disabled="!item.canAction"
          >
            删除
          </el-button>
        </template>
      </ingot-table>
    </ingot-page-card>

    <EditDialog ref="editDialog" @success="refreshData" />
  </ingot-container>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { tableHeaders } from "./biz/table";
import { useStore } from "@/store";
import { SysRole, RolePageItemVo } from "@/model";
import {
  getCommonStatusDesc,
  getCommonStatusTag,
  getDisableButtonParams,
} from "@/model/common";
import { fetchData, computedRecords } from "@/store/composition/role";
import { handleDelete, handleDisable, handleBindCommand } from "./biz/role";
import EditDialog from "./component/EditDialog.vue";
import type { API as EditDialogAPI } from "./component/EditDialog.vue";

const condition = reactive({} as SysRole);
const store = useStore();
const roleData = computedRecords();
const editDialog = ref<EditDialogAPI>();

const refreshData = () => {
  fetchData(store, condition);
};

const handleCreate = (): void => {
  editDialog.value?.show();
};

const handleEdit = (params: RolePageItemVo): void => {
  editDialog.value?.show(params);
};

onMounted(() => {
  refreshData();
});
</script>
<style lang="stylus" scoped>
.action-item
  margin-left 12px
</style>
