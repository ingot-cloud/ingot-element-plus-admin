<template>
  <ingot-container>
    <el-card>
      <template #header>
        {{ $route.meta.title }}
      </template>
      <el-row>
        <el-col :span="4">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="primary" icon="el-icon-share"></el-button>
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-button-group>
          <el-tree
            class="dept-tree"
            :data="deptData.data"
            :props="deptData.props"
            node-key="id"
            :default-expanded-keys="[1]"
            :highlight-current="true"
            :expand-on-click-node="false"
          ></el-tree>
        </el-col>
        <el-col :span="20">right</el-col>
      </el-row>
    </el-card>
  </ingot-container>
</template>

<script lang="ts" src="./dept.ts"></script>

<style lang="stylus" scoped>
.dept-tree
  margin-top 10px
</style>
