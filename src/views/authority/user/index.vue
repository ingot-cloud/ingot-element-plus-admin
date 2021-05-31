<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <el-row>
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
          <ingot-table
            :data="pageInfo.records"
            :headers="listHeaders"
            :page="pageInfo"
          >
            <template #username="{ item }">
              {{ item.username }}
            </template>
          </ingot-table>
        </el-col>
      </el-row>
    </ingot-page-card>
  </ingot-container>
</template>

<script lang="ts" src="./user.ts"></script>
