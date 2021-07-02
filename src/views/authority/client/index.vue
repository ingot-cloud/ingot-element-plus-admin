<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <template #action>
        <ingot-tenant-options size="small" />
      </template>

      <ingot-filter-container>
        <el-input
          v-model="condition.name"
          class="item"
          size="small"
          clearable
          style="width: 200px"
          placeholder="权限名称"
        ></el-input>
        <el-button class="item" size="small" type="primary" @click="fetchData">
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
            @click="handleEdit(editDialog, item)"
          >
            编辑
          </el-button>
          <el-button
            size="mini"
            :type="disableButtonParams(item.status).type"
            @click="handleDisable(item)"
          >
            {{ disableButtonParams(item.status).title }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(item)">
            删除
          </el-button>
        </template>
      </ingot-table>
    </ingot-page-card>
  </ingot-container>
</template>
<script lang="ts" src="./client.ts"></script>
