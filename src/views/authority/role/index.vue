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
          placeholder="角色名"
        ></el-input>
        <el-button class="item" size="small" type="primary"> 搜索 </el-button>
        <el-button
          class="item"
          size="small"
          type="success"
          @click="handleCreate(editDialog)"
        >
          添加
        </el-button>
      </ingot-filter-container>
      <ingot-table :data="roleData" :headers="tableHeaders">
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
            :disabled="!item.canAction"
            @click="handleDisable(item)"
          >
            {{ disableButtonParams(item.status).title }}
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(item)"
            :disabled="!item.canAction"
          >
            删除
          </el-button>
        </template>
      </ingot-table>
    </ingot-page-card>

    <EditDialog ref="editDialog" />
  </ingot-container>
</template>
<script lang="ts" src="./role.ts"></script>
