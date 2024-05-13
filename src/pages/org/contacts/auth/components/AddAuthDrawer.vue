<template>
  <in-drawer :title="title" v-model="show" :loading="loading" padding="0">
    <div m-t-10px>
      <in-table
        ref="BindTableRef"
        :headers="tableHeaders"
        :data="records"
        :selection="editBatch"
        :selectable="selectable"
        @refresh="fetchData"
        @selectionChange="onSelectChanged"
      >
        <template #toolbar>
          <div v-if="!editBatch">
            <in-button m-l-10px type="primary" @click="editBatch = true">
              批量绑定
            </in-button>
          </div>
          <div v-else>
            <in-button
              type="danger"
              :disabled="selectData.length === 0"
              @click="handleBatchBind"
            >
              绑定
            </in-button>
            <in-button @click="cancelEditBatch"> 取消 </in-button>
          </div>
        </template>
        <template #status="{ item }">
          <common-status-tag :status="item.status" />
        </template>
        <template #actions="{ item }">
          <in-button
            link
            text
            type="primary"
            @click="handleBind(item)"
            :disabled="!selectable(item)"
          >
            <template #icon>
              <i-mdi:relative-scale />
            </template>
            绑定
          </in-button>
        </template>
      </in-table>
    </div>
  </in-drawer>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { TableHeaderRecord } from "@/components/table";
import type { AuthorityTreeNode } from "@/models";
import { OrgAuthList, BindAuthorityAPI } from "@/api/org/auth";

const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "权限名称",
    prop: "name",
  },
  {
    label: "操作",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];

const BindTableRef = ref();

const loading = ref(false);
const show = ref(false);
const editBatch = ref(false);
const records = ref<Array<AuthorityTreeNode>>([]);
const selectData = ref<Array<AuthorityTreeNode>>([]);

const message = useMessage();
const confirm = useMessageConfirm();

const emits = defineEmits(["success"]);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  bindIds: {
    type: Array as PropType<Array<string>>,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const selectable = (row: any) => {
  return !props.bindIds.includes(row.id as string);
};

const cancelEditBatch = () => {
  editBatch.value = false;
  BindTableRef.value.clearSelection();
};

const onSelectChanged = (selection: Array<any>) => {
  selectData.value = selection;
};

const handleBind = (item: AuthorityTreeNode) => {
  confirm.warning(`是否绑定权限${item.name}`).then(() => {
    BindAuthorityAPI({ id: props.id, bindIds: [item.id as string] }).then(
      () => {
        message.success("操作成功");
        emits("success");
        fetchData();
      }
    );
  });
};

const handleBatchBind = () => {
  confirm.warning(`是否绑定权限选择的权限`).then(() => {
    const bindIds = selectData.value.map((item) => item.id as string);
    BindAuthorityAPI({ id: props.id, bindIds }).then(() => {
      message.success("操作成功");
      emits("success");
      fetchData();
    });
  });
};

const fetchData = () => {
  loading.value = true;
  OrgAuthList()
    .then((response) => {
      loading.value = false;
      nextTick(() => {
        records.value = response.data;
      });
    })
    .catch(() => {
      loading.value = false;
      nextTick(() => {
        records.value = [];
      });
    });
};

defineExpose({
  show() {
    show.value = true;
    fetchData();
  },
});
</script>
