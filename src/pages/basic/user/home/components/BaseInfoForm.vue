<template>
  <div>
    <div class="title-container">个人基本信息</div>
    <div p-20px>
      <in-form ref="FormRef" :model="editForm" :rules="rules">
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
import type { UserDTO, SysUser } from "@/models";
import { copyParams } from "@/utils/object";

const defaultEditForm: UserDTO = {
  phone: undefined,
  nickname: undefined,
  email: undefined,
  avatar: undefined,
};

const rules = {
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  nickname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
};

const FormRef = ref();
const editForm = reactive(Object.assign({}, defaultEditForm));

defineExpose({
  reset() {
    copyParams(editForm, defaultEditForm);
    nextTick(() => {
      const form = unref(FormRef);
      form.clearValidate();
    });
  },
  getData() {
    return new Promise<UserDTO>((resolve) => {
      FormRef.value.validate((valid: boolean) => {
        if (valid) {
          resolve(editForm);
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
}
</style>
