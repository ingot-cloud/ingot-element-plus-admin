<template>
  <el-table size="small" border :data="data">
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
      :current-page="page.current"
      :page-size="page.size"
      :total="page.total"
      :page-sizes="[20, 30, 40, 50]"
      background
      size="small"
      layout="total, sizes, prev, pager, next, jumper"
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
