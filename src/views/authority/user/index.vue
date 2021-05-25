<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <el-row>
        <el-col :span="4">
          <el-tree
            :data="deptTree.data"
            :props="deptTree.props"
            :node-key="deptTree.nodeKey"
            :default-expanded-keys="deptTree.expandedKeys"
            :highlight-current="true"
            :expand-on-click-node="false"
          ></el-tree>
        </el-col>
        <el-col :span="20">
          <el-table
            size="small"
            :loading="true"
            border
            :data="userData.records"
          >
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </ingot-page-card>
  </ingot-container>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import {
  deptTree,
  fetchDeptData
} from "@/views/authority/dept/composition/dept";
import { userData } from "./composition/user";

export default defineComponent({
  components: {},
  setup() {
    onMounted(() => {
      fetchDeptData();
    });

    return {
      deptTree,
      userData
    };
  }
});
</script>
