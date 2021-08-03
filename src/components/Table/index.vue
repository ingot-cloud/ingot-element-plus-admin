<template>
  <ingot-filter-container>
    <slot name="filter"> </slot>
  </ingot-filter-container>
  <el-table
    size="small"
    border
    :data="data"
    @select-all="onTableSelectAll"
    @select="onTableSelect"
    @selection-change="onTableSelectionChange"
  >
    <el-table-column v-if="selection" width="55" type="selection" />
    <el-table-column
      v-for="item in headers"
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" src="./table.ts"></script>
<style lang="stylus" scoped>
.pagination-container
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
</style>
