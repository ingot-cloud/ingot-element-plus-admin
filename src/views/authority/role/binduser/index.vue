<template>
  <ingot-container>
    <ingot-page-card @back="$router.back()" :content="title">
      <ingot-table
        :headers="headers"
        :data="bindPageInfo.records"
        :page="bindPageInfo"
        :selection="edit"
        :index="!edit"
        ref="bindTable"
        @handleSizeChange="fetchData"
        @handleCurrentChange="fetchData"
        @selectionChange="onSelectChanged"
      >
        <template #filter>
          <div v-if="!edit">
            <el-button size="small" type="primary" @click="fetchData">
              搜索
            </el-button>
            <el-button size="small" type="success" @click="edit = true">
              编辑
            </el-button>
          </div>
          <div v-else>
            <el-button
              size="small"
              type="danger"
              :disabled="selectData.length === 0"
              @click="handleBatchUnbind"
            >
              解绑
            </el-button>
            <el-button size="small" type="warning" @click="cancelEdit">
              取消
            </el-button>
          </div>
          <el-button size="small" @click="editColumn" style="margin-left: 10px">
            编辑列
          </el-button>
        </template>
        <template #status="{ item }">
          <ingot-common-status-tag :status="item.status" />
        </template>
        <template #actions="{ item }">
          <el-button size="mini" type="danger" @click="handleUnbind(item)">
            解绑
          </el-button>
        </template>
      </ingot-table>
    </ingot-page-card>
  </ingot-container>
</template>
<script lang="ts" src="./binduser.ts"></script>
