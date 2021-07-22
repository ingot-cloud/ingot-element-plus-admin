<template>
  <ingot-container>
    <ingot-page-card @back="$router.back()" :content="title">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <template #header> 已绑用户 </template>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <template #header> 所有用户 </template>
          </el-card>
        </el-col>
      </el-row>
    </ingot-page-card>
  </ingot-container>
</template>
<script lang="ts" src="./binduser.ts"></script>
