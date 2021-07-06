<template>
  <ingot-container>
    <ingot-page-card :content="parent.name" @back="$router.back()">
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
          @click="handleCreate"
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
        <template #status="{ item }">
          <el-tag :type="getCommonStatusTag(item.status)">
            {{ getCommonStatusDesc(item.status) }}
          </el-tag>
        </template>
        <template #actions="{ item }">
          <el-button size="mini" type="primary" @click="handleEdit(item)">
            编辑
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
  <EditDialog ref="editDialogRef" @success="fetchData" />
</template>
<script lang="ts" src="./authority.ts"></script>
