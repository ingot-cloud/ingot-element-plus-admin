<template>
  <in-drawer :title="user.nickname" v-model="visible" padding="0">
    <in-biz-tabs v-model="currentTab">
      <in-biz-tab-panel title="基础信息" name="1">
        <BaseInfoForm ref="BaseInfoFormRef" />
      </in-biz-tab-panel>
      <in-biz-tab-panel title="组织信息" name="2">bbb</in-biz-tab-panel>
    </in-biz-tabs>
    <template #footer>
      <in-button @click="visible = false">取消</in-button>
      <in-button type="danger" @click="handleRemoveClick">删除</in-button>
      <in-button :loading="loading" type="primary" @click="handleConfirmClick">
        确定
      </in-button>
    </template>
  </in-drawer>
</template>
<script lang="ts" setup>
import type { UserDTO, SysUser } from "@/models";
import { CreateUserAPI, RemoveUserAPI } from "@/api/basic/user";
import BaseInfoForm from "./BaseInfoForm.vue";

const emits = defineEmits(["success"]);

const currentTab = ref("1");

const BaseInfoFormRef = ref();

const user = ref<SysUser>({});
const visible = ref(false);
const loading = ref(false);
const message = useMessage();
const confirmDelete = useConfirmDelete(
  transformDeleteAPI(RemoveUserAPI),
  () => {
    visible.value = false;
    message.success("操作成功");
    emits("success");
  }
);

const show = (params: SysUser) => {
  user.value = params;
  visible.value = true;
  BaseInfoFormRef.value.reset();
};

const handleConfirmClick = () => {
  BaseInfoFormRef.value.getData((data: UserDTO) => {
    loading.value = true;
    CreateUserAPI(data)
      .then(() => {
        loading.value = false;
        visible.value = false;
        message.success("操作成功");
        emits("success");
      })
      .catch(() => {
        loading.value = false;
      });
  });
};

const handleRemoveClick = () => {
  confirmDelete.exec(user.value.id!, `是否删除用户(${user.value.nickname})`);
};

defineExpose({
  show,
});
</script>
