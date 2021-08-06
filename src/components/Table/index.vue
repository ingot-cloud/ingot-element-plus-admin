<template>
  <ingot-filter-container>
    <template #title>
      <slot name="filter-title"> </slot>
    </template>
    <slot name="filter"> </slot>
  </ingot-filter-container>
  <el-table
    size="small"
    border
    ref="ingotTable"
    :data="data"
    @select-all="privateOnTableSelectAll"
    @select="privateOnTableSelect"
    @selection-change="privateOnTableSelectionChange"
  >
    <el-table-column
      v-if="selection"
      width="50"
      align="center"
      type="selection"
    />
    <el-table-column
      v-if="index"
      width="50"
      align="center"
      :label="indexLabel"
      type="index"
    />

    <el-table-column
      v-for="item in headersEnable"
      :key="item.prop"
      :label="item.label"
      :type="item.type || null"
      :width="item.width || null"
      :fixed="item.fixed || null"
      :align="item.align || 'left'"
    >
      <template #="scope" v-if="!item.type">
        <slot :name="item.prop" :item="scope.row" :index="scope.$index">
          {{ scope.row[item.prop] }}
        </slot>
      </template>
    </el-table-column>
  </el-table>
  <div v-if="page" class="pagination-container">
    <el-pagination
      :current-page="current"
      :page-size="size"
      :total="total"
      :page-sizes="pageSize"
      background
      size="small"
      :layout="pageLayout"
      @size-change="privateHandleSizeChange"
      @current-change="privateHandleCurrentChange"
    />
  </div>
  <el-drawer
    title="编辑列"
    v-model="headerDrawer"
    direction="rtl"
    :modal="false"
    :size="600"
  >
    <div class="table-header-drawer">
      <el-transfer
        v-model="headersEnableValue"
        :data="headers"
        :props="headerTransferProps"
        :titles="headerTransferTitles"
        @change="privateOnHeaderChanged"
      />
    </div>
  </el-drawer>
</template>
<script lang="ts" src="./table.ts"></script>
<style lang="stylus" scoped>
.pagination-container
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
.table-header-drawer
  display flex
  flex-direction column
  align-items center
</style>
