<template>
  <ingot-container>
    <ingot-page-card @back="$router.back()" :content="title">
      <el-row :gutter="20">
        <el-col :span="12">1</el-col>
        <el-col :span="12">2</el-col>
      </el-row>
    </ingot-page-card>
  </ingot-container>
</template>
<script lang="ts" src="./binduser.ts"></script>
