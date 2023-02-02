<template>
  <el-upload
    :action="action"
    :headers="headers"
    :limit="limit"
    :data="uploadData"
    :accept="accept"
    :on-exceed="handleExceed"
    :disabled="disabled"
    :file-list="modelValue"
    list-type="picture-card"
    :on-error="handleUploadError"
    :on-success="handleUploadSuccess"
    :before-upload="beforeUpload"
  >
    <el-icon><Plus /></el-icon>
    <template #file="{ file }">
      <div>
        <img
          class="el-upload-list__item-thumbnail"
          :src="handleImageSrc(file)"
          alt=""
        />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <!-- <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span> -->
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
    <template #tip v-if="tip">
      <div class="el-upload__tip">
        {{ tip }}
      </div>
    </template>
  </el-upload>
  <el-dialog v-model="dialogVisible" flex items-center justify-center>
    <img w-full :src="dialogImageUrl" alt="" />
  </el-dialog>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";
import type { UploadFile, UploadRawFile, UploadUserFile } from "element-plus";
import { useAuthStore } from "@/stores/modules/auth";
import { Message } from "@/utils/message";

const getAccessToken = storeToRefs(useAuthStore()).getAccessToken;
const headers = {
  Authorization: getAccessToken.value,
};

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Array as PropType<Array<UploadUserFile>>,
    default() {
      return [];
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 1,
  },
  accept: {
    type: String,
    default: ".jpg, .png, .jpeg",
  },
  tip: {
    type: String,
  },
  imageUrlPrefix: {
    type: String,
    default: "/api",
  },
  action: {
    type: String,
    default: "/api/pms/common/file/uploadWithTenant",
  },
});

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

const uploadData = ref({});

const handleImageSrc = (file: UploadUserFile) => {
  const url = file.url;
  return url?.startsWith("blob:http") ? url : `${props.imageUrlPrefix}${url}`;
};

const handleRemove = (file: UploadFile) => {
  if (props.disabled) {
    return;
  }
  const index = props.modelValue.findIndex((item) => item.url === file.url);
  const tmp = props.modelValue.slice();
  tmp.splice(index, 1);
  emits("update:modelValue", tmp);
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};

// const handleDownload = (file: UploadFile) => {};
const beforeUpload = (file: UploadRawFile) => {
  uploadData.value = {
    fileName: file.name,
  };
};
const handleUploadSuccess = (res: any) => {
  const tmp = props.modelValue.slice();
  tmp.push({
    url: `/pms/common/file/${res.data.fileName}`,
    name: "",
    status: "ready",
    uid: 0,
  });
  emits("update:modelValue", tmp);
};
const handleUploadError = (error: Error) => {
  Message.error(error.message);
};
const handleExceed = () => {
  Message.error(`最多上传${props.limit}张图片`);
};
</script>
