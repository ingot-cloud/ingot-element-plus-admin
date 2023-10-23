<template>
  <div>
    <div class="title-container">
      <div>个人基本信息</div>
      <div>
        <div v-if="!editFlag" class="edit" @click="editFlag = true">编辑</div>
        <div v-else class="cancel" @click="editFlag = false">取消</div>
      </div>
    </div>
    <div p-20px>
      <in-form
        ref="FormRef"
        :model="editForm"
        :rules="rules"
        :disabled="!editFlag"
      >
        <el-form-item label="头像">
          <in-common-upload-avatar
            dir="public/user/avatar"
            v-model="editForm.avatar"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="nickname">
          <el-input
            v-model="editForm.nickname"
            clearable
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="editForm.phone"
            clearable
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input
            v-model="editForm.email"
            clearable
            placeholder="请输入email"
          ></el-input>
        </el-form-item>
      </in-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UserDTO, UserProfileVO } from "@/models";
import { copyParamsWithKeys, getDiffWithIgnore } from "@/utils/object";

const defaultEditForm: UserDTO = {
  phone: undefined,
  nickname: undefined,
  email: undefined,
  avatar: undefined,
};
const keys = ["phone", "nickname", "email", "avatar"];

const rules = {
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  nickname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
};

const userId = ref("");
const editFlag = ref(false);
const FormRef = ref();
const editForm = reactive(Object.assign({}, defaultEditForm));
const rawForm = reactive(Object.assign({}, defaultEditForm));

defineExpose({
  setData(id: string, params: UserProfileVO) {
    userId.value = id;
    copyParamsWithKeys(editForm, params, keys);
    copyParamsWithKeys(rawForm, params, keys);
    nextTick(() => {
      const form = unref(FormRef);
      form.clearValidate();
    });
  },
  getData() {
    return new Promise<UserDTO>((resolve, reject) => {
      if (!editFlag.value) {
        reject();
        return;
      }

      const result = getDiffWithIgnore(rawForm, editForm);
      if (Object.keys(result).length === 0) {
        reject();
        return;
      }
      result.id = userId.value;
      FormRef.value.validate((valid: boolean) => {
        if (valid) {
          editFlag.value = false;
          resolve(result);
        }
      });
    });
  },
});
</script>
<style scoped lang="postcss">
.title-container {
  font-weight: 500;
  font-size: 12px;
  line-height: 22px;
  padding: 4px 20px;
  background: #f2f2f6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & .edit {
    cursor: pointer;
    color: var(--in-color-primary);
  }
  & .cancel {
    cursor: pointer;
    color: var(--in-color-danger);
  }
}
</style>
