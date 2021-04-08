<template>
  <ingot-container>
    <el-card>
      <template #header>
        {{ $route.meta.title }}
      </template>
      <el-row>
        <el-col :span="8">
          <el-button-group>
            <el-button type="success" size="small" icon="el-icon-plus">
              添加
            </el-button>
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
            <el-button type="danger" size="small" icon="el-icon-delete">
              删除
            </el-button>
          </el-button-group>
          <el-tree
            class="dept-tree"
            :data="deptTree.data"
            :props="deptTree.props"
            :node-key="deptTree.nodeKey"
            :default-expanded-keys="deptTree.expandedKeys"
            :highlight-current="true"
            :expand-on-click-node="false"
            @node-click="handleTreeNodeClick"
          ></el-tree>
        </el-col>
        <el-col :span="16">right</el-col>
      </el-row>
    </el-card>
  </ingot-container>
</template>

<script lang="ts" src="./dept.ts"></script>

<style lang="stylus" scoped>
.dept-tree
  margin-top 10px
</style>
