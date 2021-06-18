<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <ingot-filter-container>
        <el-input
          v-model="condition.name"
          class="item"
          size="small"
          clearable
          style="width: 200px"
          placeholder="租户名称"
        ></el-input>
        <el-button class="item" size="small" type="primary"> 搜索 </el-button>
        <el-button class="item" size="small" type="success"> 添加 </el-button>
      </ingot-filter-container>
      <ingot-table :data="records" :headers="tableHeaders">
        <template #status="{ item }">
          <el-tag :type="getCommonStatusTag(item.status)">
            {{ getCommonStatusDesc(item.status) }}
          </el-tag>
        </template>
        <template #actions="{ item }">
          <el-button size="mini" type="primary" @click="handleEditUser(item)">
            编辑
          </el-button>
          <el-button
            size="mini"
            :type="disableButtonParams(item.status).type"
            @click="handleDisableUser(item)"
          >
            {{ disableButtonParams(item.status).title }}
          </el-button>
          <el-button size="mini" type="danger" @click="handleDeleteUser(item)">
            删除
          </el-button>
        </template>
      </ingot-table>
    </ingot-page-card>
  </ingot-container>
</template>
<script lang="ts" src="./tenant.ts"></script>
