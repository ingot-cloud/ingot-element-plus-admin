<template>
  <ingot-container>
    <ingot-page-card @back="$router.back()" :content="title">
      <ingot-table
        :headers="tableHeaders"
        :data="bindPageInfo.records"
        :page="bindPageInfo"
        @handleSizeChange="fetchData"
        @handleCurrentChange="fetchData"
      >
        <template #filter>
          <el-button
            class="item"
            size="small"
            type="primary"
            @click="fetchData"
          >
            搜索
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
