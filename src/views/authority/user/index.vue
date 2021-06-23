<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <template #action>
        <ingot-tenant-options size="small" />
      </template>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-tree
            :data="deptTree.data"
            :props="deptTree.props"
            :node-key="deptTree.nodeKey"
            :default-expanded-keys="deptTree.expandedKeys"
            :highlight-current="true"
            :expand-on-click-node="false"
            @node-click="handleTreeNodeClick"
          ></el-tree>
        </el-col>
        <el-col :span="20">
          <ingot-filter-container>
            <template #title> 部门：{{ currentDeptNode.name }} </template>
            <el-input
              v-model="condition.username"
              class="item"
              size="small"
              clearable
              style="width: 200px"
              placeholder="用户名"
            ></el-input>
            <el-button
              class="item"
              size="small"
              type="primary"
              @click="fetchUserData"
            >
              搜索
            </el-button>
            <el-button
              class="item"
              size="small"
              type="success"
              @click="
                handleCreateUser(createDialog, roleRecords, tenantRecords)
              "
            >
              添加
            </el-button>
          </ingot-filter-container>
          <ingot-table
            :data="pageInfo.records"
            :headers="tableHeaders"
            :page="pageInfo"
          >
            <template #status="{ item }">
              <el-tag :type="getCommonStatusTag(item.status)">
                {{ getCommonStatusDesc(item.status) }}
              </el-tag>
            </template>
            <template #actions="{ item }">
              <el-button
                size="mini"
                type="primary"
                @click="handleEditUser(item)"
              >
                编辑
              </el-button>
              <el-button
                size="mini"
                :type="disableButtonParams(item.status).type"
                @click="handleDisableUser(item)"
              >
                {{ disableButtonParams(item.status).title }}
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteUser(item)"
              >
                删除
              </el-button>
            </template>
          </ingot-table>
        </el-col>
      </el-row>
    </ingot-page-card>
  </ingot-container>

  <CreateDialog
    ref="createDialog"
    :deptName="currentDeptNode.name"
    :deptId="currentDeptNode.id"
    :roleList="roleRecords"
  />
</template>

<script lang="ts" src="./user.ts"></script>
