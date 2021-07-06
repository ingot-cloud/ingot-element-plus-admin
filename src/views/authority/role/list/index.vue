<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <ingot-filter-container>
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
          @click="handleCreate(editDialog)"
        >
          添加
        </el-button>
      </ingot-filter-container>
      <ingot-table :data="roleData" :headers="tableHeaders">
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
            @click="handleEdit(editDialog, item)"
          >
            编辑
          </el-button>
          <el-dropdown @command="handleBindCommand">
            <el-button type="success" size="mini" class="action-item">
              绑定<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :command="{ data: item, type: 'user' }">
                  用户
                </el-dropdown-item>
                <el-dropdown-item :command="{ data: item, type: 'dept' }">
                  部门
                </el-dropdown-item>
                <el-dropdown-item
                  divided
                  :command="{ data: item, type: 'menu' }"
                >
                  菜单
                </el-dropdown-item>
                <el-dropdown-item :command="{ data: item, type: 'authority' }">
                  权限
                </el-dropdown-item>
                <el-dropdown-item
                  divided
                  :command="{ data: item, type: 'client' }"
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
<script lang="ts" src="./role.ts"></script>
<style lang="stylus" scoped>
.action-item
  margin-left 12px
</style>
