<template>
  <ingot-container>
    <el-row>
      <el-col :span="4">
        <el-tree
          :data="deptData.data"
          :props="deptData.props"
          node-key="id"
          :default-expanded-keys="[1]"
        ></el-tree>
      </el-col>
      <el-col :span="20">
        <el-table :data="userData.records">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </ingot-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { deptData } from "./composition/dept";
import { userData } from "./composition/user";

export default defineComponent({
  components: {},
  setup() {
    return {
      deptData,
      userData
    };
  }
});
</script>
