<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <ingot-table
        :data="pageInfo.records"
        :headers="tableHeaders"
        :page="pageInfo"
        @handleSizeChange="fetchData"
        @handleCurrentChange="fetchData"
      >
        <template #filter>
          <el-input
            v-model="condition.name"
            class="item"
            size="small"
            clearable
            style="width: 200px"
            placeholder="权限名称"
          ></el-input>
          <el-button
            class="item"
            size="small"
            type="primary"
            @click="fetchData"
          >
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
        </template>
        <template #status="{ item }">
          <el-tag :type="getCommonStatusTag(item.status)">
            {{ getCommonStatusDesc(item.status) }}
          </el-tag>
        </template>
        <template #actions="{ item }">
          <el-button size="mini" type="primary" @click="handleEdit(item)">
            编辑
          </el-button>
          <el-button size="mini" type="warning" @click="handleChild(item)">
            子权限
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
