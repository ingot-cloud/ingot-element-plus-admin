<template>
  <div class="role-filter">
    <el-input
      v-model="searchValue"
      placeholder="搜索角色"
      :prefix-icon="Search"
      clearable
    />

    <div class="action-box">
      <in-button>新增角色组</in-button>
      <in-button>新增角色</in-button>
      <div>
        <el-divider direction="vertical" />
        <el-dropdown trigger="click">
          <el-icon size="22" cursor-pointer>
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
    </div>

    <in-tree
      v-loading="loading"
      ref="roleTreeRef"
      class="member-role-tree"
      :data="roleTree"
      :props="TreeKeyAndProps.props"
      :node-key="TreeKeyAndProps.nodeKey"
      :filter-node-method="privateFilterNode"
      @node-click="privateOnNodeClick"
    >
      <template #default="{ node, data }">
        <div class="role-item">
          <in-icon
            v-if="data.isGroup"
            name="mingcute:group-line"
            class="icon"
          />
          <in-icon v-else name="tabler:user" class="icon" />
          <span class="text">{{ node.label }}</span>
        </div>
      </template>
    </in-tree>
  </div>
</template>
<script setup lang="ts">
import { TreeKeyAndProps } from "@/models";
import { Search } from "@element-plus/icons-vue";
import { useRoleStore } from "@/stores/modules/role";
import type { RoleTreeNode } from "@/models";

const roleStore = useRoleStore();
const roleTree = ref<Array<RoleTreeNode>>([]);
const emits = defineEmits(["onNodeClick"]);

const roleTreeRef = ref();
const loading = ref(false);
const searchValue = ref("");

watch(searchValue, (val) => {
  roleTreeRef.value!.filter(val);
});

const privateOnNodeClick = (value: RoleTreeNode) => {
  if (value.isGroup) {
    return;
  }
  emits("onNodeClick", value);
};
const privateFilterNode = (value: string, data: RoleTreeNode) => {
  if (!value || !data.name) return true;
  return data.name.indexOf(value) > -1;
};

const fetchData = () => {
  loading.value = true;
  roleStore
    .fetchRoleList()
    .then((data) => {
      loading.value = false;
      const result: Array<RoleTreeNode> = [];
      // 整理树形结构，第一层为组，第二层为角色
      data.forEach((item) => {
        if (result.findIndex((g) => g.id === item.groupId) > -1) {
          return;
        }
        result.push({
          id: item.groupId,
          name: item.groupName,
          isGroup: true,
          children: [],
        });
      });
      data.forEach((item) => {
        result
          .find((g) => g.id === item.groupId)
          ?.children?.push({
            id: item.id,
            name: item.name,
            isGroup: false,
          });
      });

      roleTree.value = result;
    })
    .catch(() => {
      loading.value = false;
    });
};

const privateHandleDeptAction = (value: boolean) => {
  privateHandleExpanded(roleTree.value, value);
};
const privateHandleExpanded = (list: Array<RoleTreeNode>, value: boolean) => {
  list.forEach((item) => {
    roleTreeRef.value.getNode(item).expanded = value;
    if (item.children && item.children.length) {
      privateHandleExpanded(item.children, value);
    }
  });
};

onMounted(() => {
  fetchData();
});
</script>
<style scoped lang="postcss">
.role-filter {
  @apply flex flex-col;

  & .action-box {
    @apply flex flex-row items-center justify-between m-t-[var(--in-common-margin)];
  }

  & .member-role-tree {
    @apply m-t-[var(--in-common-margin)];
  }

  & .role-item {
    @apply flex flex-row items-center gap-2;

    height: 100%;
    width: 100%;

    & .icon {
      color: #39a3ff;
      font-size: 14px;
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
