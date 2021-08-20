<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <ingot-table
        :data="menuData.data"
        :headers="tableHeaders"
        :row-key="menuData.key"
        :tree-props="menuData.props"
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
          <el-button
            class="item"
            size="small"
            type="success"
            @click="showEditDialog()"
          >
            添加
          </el-button>
        </template>
        <template #icon="{ item }">
          <ingot-icon
            v-if="item.icon"
            :icon="item.icon"
            style="width: 20px; height: 20px"
          />
        </template>
        <template #status="{ item }">
          <ingot-common-status-tag :status="item.status" />
        </template>
        <template #actions="{ item }">
          <el-button
            size="mini"
            type="success"
            @click="showEditDialog(item.id)"
          >
            新增
          </el-button>
          <el-button size="mini" type="primary" @click="showEditDialog(item)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(item)">
            删除
          </el-button>
        </template>
      </ingot-table>
    </ingot-page-card>
  </ingot-container>
  <EditDialog ref="editDialogRef" :data="selectData" @success="fetchData" />
</template>
<script lang="ts" src="./menu.ts"></script>
<style lang="stylus" scoped></style>
