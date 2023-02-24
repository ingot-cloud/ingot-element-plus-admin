<template>
  <div
    flex
    flex-row
    items-center
    justify-start
    b-b
    class="b-[var(--in-border-color)] p-b-[var(--in-common-padding)]"
  >
    <div flex-1>部门列表</div>

    <el-input
      class="w-150px! m-r-5px"
      v-model="filterText"
      clearable
      placeholder="搜索"
    />

    <el-divider direction="vertical" />
    <el-dropdown trigger="click">
      <el-icon size="22">
        <i-material-symbols:more-vert />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="privateHandleDeptAction(true)">
            <el-icon><i-material-symbols:expand-rounded /></el-icon>全部展开
          </el-dropdown-item>
          <el-dropdown-item @click="privateHandleDeptAction(false)">
            <el-icon><i-mdi:arrow-vertical-collapse /></el-icon>全部折叠
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <el-tree
    ref="deptTreeRef"
    class="m-t-[var(--in-common-margin)]"
    :data="deptTree"
    :props="TreeKeyAndProps.props"
    :node-key="TreeKeyAndProps.nodeKey"
    :default-expanded-keys="expandedKeys"
    :highlight-current="true"
    :expand-on-click-node="false"
    :filter-node-method="privateFilterNode"
    @node-click="privateOnNodeClick"
  ></el-tree>
</template>
<script lang="ts" setup>
import { TreeKeyAndProps } from "@/models";
import { useDeptStore } from "@/stores/modules/dept";
import type { DeptTreeNode } from "@/models";

const deptStore = useDeptStore();
const { deptTree, expandedKeys } = storeToRefs(deptStore);
const deptTreeRef = ref();
const filterText = ref("");

const emits = defineEmits(["onNodeClick"]);

watch(filterText, (val) => {
  deptTreeRef.value!.filter(val);
});

const privateHandleDeptAction = (value: boolean) => {
  deptTreeRef.value.store._getAllNodes().forEach((item: any) => {
    item.expanded = value;
  });
};
const privateOnNodeClick = (value: DeptTreeNode) => {
  emits("onNodeClick", value);
};
const privateFilterNode = (value: string, data: DeptTreeNode) => {
  if (!value || !data.name) return true;
  return data.name.indexOf(value) > -1;
};

onMounted(() => {
  deptStore.fetchDeptTree();
});
</script>
