<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <ingot-filter-container>
        <el-input
          v-model="condition.clientId"
          class="item"
          size="small"
          clearable
          style="width: 200px"
          placeholder="客户端ID"
        ></el-input>
        <el-button class="item" size="small" type="primary" @click="fetchData">
          搜索
        </el-button>
        <el-button
          class="item"
          size="small"
          type="success"
          @click="handleCreate()"
        >
          添加
        </el-button>
      </ingot-filter-container>
      <ingot-table
        :data="pageInfo.records"
        :headers="tableHeaders"
        :page="pageInfo"
        @handleSizeChange="fetchData"
        @handleCurrentChange="fetchData"
      >
        <template #authorizedGrantTypes="{ item }">
          <el-tag
            style="margin: 1px"
            v-for="grant in grantTypeList(item.authorizedGrantTypes)"
            :key="grant"
          >
            {{ grant }}
          </el-tag>
        </template>

        <template #status="{ item }">
          <el-tag :type="getCommonStatusTag(item.status)">
            {{ getCommonStatusDesc(item.status) }}
          </el-tag>
        </template>
        <template #actions="{ item }">
          <el-button size="mini" type="primary" @click="handleManager(item)">
            管理
          </el-button>
          <el-button
            size="mini"
            :type="getDisableButtonParams(item.status).type"
            @click="handleDisable(item, fetchData)"
          >
            {{ getDisableButtonParams(item.status).title }}
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(item, fetchData)"
          >
            删除
          </el-button>
        </template>
      </ingot-table>
    </ingot-page-card>
  </ingot-container>
  <CreateDialog ref="createDialogRef" @success="fetchData" />
</template>
<script lang="ts" src="./client.ts"></script>
