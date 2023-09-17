<template>
  <div class="dept-filter">
    <el-input
      v-model="searchValue"
      placeholder="搜索部门"
      :prefix-icon="Search"
      clearable
    />

    <in-tree
      v-loading="loading"
      ref="deptTreeRef"
      class="member-dept-tree"
      :data="deptTree"
      :props="TreeKeyAndProps.props"
      :node-key="TreeKeyAndProps.nodeKey"
      :filter-node-method="privateFilterNode"
      @node-click="privateOnNodeClick"
    >
      <template #default="{ node, data }">
        <div class="dept-item">
          <img src="@/assets/logo.png" class="logo" v-if="data.mainFlag" />
          <span class="text">{{ node.label }}</span>
        </div>
      </template>
    </in-tree>
  </div>
</template>
<script setup lang="ts">
import { TreeKeyAndProps } from "@/models";
import { Search } from "@element-plus/icons-vue";
import { useDeptStore } from "@/stores/modules/dept";
import type { DeptTreeNode } from "@/models";

const deptStore = useDeptStore();
const deptTree = ref<Array<DeptTreeNode>>([]);

const deptTreeRef = ref();
const loading = ref(false);
const searchValue = ref("");

watch(searchValue, (val) => {
  deptTreeRef.value!.filter(val);
});

const privateOnNodeClick = (value: DeptTreeNode) => {
  // emits("onNodeClick", value);
  console.log(value);
};
const privateFilterNode = (value: string, data: DeptTreeNode) => {
  if (!value || !data.name) return true;
  return data.name.indexOf(value) > -1;
};

const fetchData = () => {
  loading.value = true;
  deptStore
    .fetchDeptTree()
    .then((data) => {
      loading.value = false;
      const result: Array<DeptTreeNode> = [];
      data.forEach((item) => {
        if (item.mainFlag) {
          result.push({
            name: item.name,
            scope: item.scope,
            sort: item.sort,
            mainFlag: item.mainFlag,
            status: item.status,
            id: item.id,
          });
          if (item.children && item.children.length !== 0) {
            item.children.forEach((child) => {
              result.push(child);
            });
          }
          return;
        }
        result.push(item);
      });
      deptTree.value = result;
      if (deptTree.value.length > 0) {
        // console.log(deptTree.value[0]);
        // deptTreeRef.value?.setCurrentNode({ id: 1 }, false);
        // console.log(deptTreeRef.value?.getCurrentNode());
      }
    })
    .catch(() => {
      loading.value = false;
    });
};

onMounted(() => {
  fetchData();
});
</script>
<style scoped lang="postcss">
.dept-filter {
  @apply flex flex-col;

  & .member-dept-tree {
    @apply m-t-[var(--in-common-margin)];
  }

  & .dept-item {
    @apply flex flex-row items-center gap-2;

    height: 100%;
    width: 100%;

    & .logo {
      height: 30px;
      width: 30px;
    }

    & .text {
      flex: 1;
      max-width: 120px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
    }
  }
}
</style>
