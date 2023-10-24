<template>
  <in-drawer :title="title" v-model="visible" width="900">
    <in-form ref="editFormRef" class="form" :model="editForm" :rules="rules">
      <el-form-item label="菜单类型" prop="menuType">
        <in-select
          w-full
          v-model="editForm.menuType"
          :options="menuTypeEnum.getOptions()"
        />
      </el-form-item>
      <el-form-item label="上级菜单">
        <el-tree-select
          w-full
          v-model="editForm.pid"
          :data="selectData"
          :disabled="!canEditPid"
          :node-key="TreeKeyAndProps.nodeKey"
          :value-key="TreeKeyAndProps.nodeKey"
          :props="TreeKeyAndProps.props"
          :check-strictly="true"
        />
      </el-form-item>

      <el-form-item prop="name" label="菜单名称">
        <el-input
          v-model="editForm.name"
          placeholder="请输入菜单名称"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item prop="path" label="菜单路由">
        <el-input
          v-model="editForm.path"
          placeholder="请输入菜单路由"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="重定向路由" v-if="isDirectory()">
        <el-input
          v-model="editForm.redirect"
          placeholder="请输入重定向路由"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="权限编码">
        <el-tree-select
          w-full
          clearable
          v-model="editForm.authorityId"
          :data="authorityData"
          :node-key="TreeKeyAndProps.nodeKey"
          :value-key="TreeKeyAndProps.nodeKey"
          :props="TreeKeyAndProps.props"
          :check-strictly="true"
        />
      </el-form-item>

      <el-form-item v-if="!isButton()" prop="icon" label="菜单icon">
        <el-input
          v-model="editForm.icon"
          placeholder="请输入icon名称"
          clearable
        >
          <template #append>
            <div
              ref="iconButtonRef"
              v-click-outside="privateOnSettingClickOutside"
              w-full
              h-full
              flex
              items-center
              justify-center
              cursor-pointer
            >
              <in-icon
                :name="editForm.icon"
                class="w-[var(--in-menu-icon-size)] h-[var(--in-menu-icon-size)]"
              />
            </div>
          </template>
        </el-input>
        <el-popover
          ref="iconPopoverRef"
          trigger="click"
          placement="bottom"
          :width="300"
          :virtual-ref="iconButtonRef"
          virtual-triggering
        >
          <div flex flex-col items-center>
            <in-icon-collection @onItemClick="privateOnIconClick" />
          </div>
        </el-popover>
        <div>
          可以通过
          <a href="https://icon-sets.iconify.design/?query=" target="_blank">
            iconify
          </a>
          搜索icon
        </div>
      </el-form-item>
      <el-form-item v-if="!isButton()" label="路由名称">
        <el-input
          v-model="editForm.routeName"
          placeholder="请输入路由名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <el-radio-group v-model="editForm.status">
          <el-radio-button :label="CommonStatus.Enable">
            {{ statusEnum.getTagText(CommonStatus.Enable).text }}
          </el-radio-button>
          <el-radio-button :label="CommonStatus.Lock">
            {{ statusEnum.getTagText(CommonStatus.Lock).text }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="!isButton()" label="自定义视图">
        <el-checkbox v-model="editForm.customViewPath" />
      </el-form-item>
      <el-form-item
        v-if="editForm.customViewPath && !isButton()"
        label="视图路径"
        prop="viewPath"
      >
        <el-input
          v-model="editForm.viewPath"
          placeholder="请输入视图路径"
          clearable
        >
        </el-input>
      </el-form-item>
      <el-form-item
        v-if="editForm.customViewPath && !isButton() && isDirectory()"
        label="默认布局"
      >
        <in-select
          w-full
          v-model="editForm.viewPath"
          :options="LayoutOptions"
          placeholder="选择使用默认布局"
          clearable
          @onChanged="privateOnLayoutSelectChanged"
        />
      </el-form-item>

      <el-form-item v-if="!isButton()" label="高级选项">
        <el-checkbox v-model="moreOptionsFlag" />
      </el-form-item>

      <el-row :gutter="20" v-if="!isButton() && moreOptionsFlag">
        <el-col :span="6">
          <el-form-item prop="cache" label="是否缓存">
            <el-radio-group v-model="editForm.isCache">
              <el-radio-button :label="true"> 是 </el-radio-button>
              <el-radio-button :label="false"> 否 </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="hidden" label="隐藏菜单">
            <el-radio-group v-model="editForm.hidden">
              <el-radio-button :label="true"> 是 </el-radio-button>
              <el-radio-button :label="false"> 否 </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="hideBreadcrumb" label="隐藏面包屑">
            <el-radio-group v-model="editForm.hideBreadcrumb">
              <el-radio-button :label="true"> 是 </el-radio-button>
              <el-radio-button :label="false"> 否 </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="props" label="匹配props">
            <el-radio-group v-model="editForm.props">
              <el-radio-button :label="true"> 是 </el-radio-button>
              <el-radio-button :label="false"> 否 </el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20" v-if="!isButton() && moreOptionsFlag">
        <el-col :span="6">
          <el-form-item prop="sort" label="排序">
            <el-input
              v-model="editForm.sort"
              placeholder="请输入排序序号"
              type="number"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </in-form>
    <template #footer>
      <in-button
        :loading="loading"
        type="primary"
        @click="privateOnConfirmClick"
      >
        确定
      </in-button>
    </template>
  </in-drawer>
</template>
<script lang="ts" setup>
import { ClickOutside as vClickOutside } from "element-plus";
import type { SysMenu } from "@/models";
import { TreeKeyAndProps } from "@/models";
import { LayoutOptions } from "@/router";
import {
  CommonStatus,
  CommonStatusEnumExtArray,
  MenuType,
  useMenuTypeEnum,
} from "@/models/enums";
import { CreateMenuAPI, UpdateMenuAPI } from "@/api/basic/menu";
import { Message } from "@/utils/message";
import { copyParams, getDiff } from "@/utils/object";

const rules = {
  name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
  menuType: [{ required: true, message: "请选择菜单类型", trigger: "blur" }],
  path: [{ required: true, message: "请输入菜单url", trigger: "blur" }],
  viewPath: [{ required: true, message: "请输入视图路径", trigger: "blur" }],
};

const defaultEditForm: SysMenu = {
  id: undefined,
  pid: undefined,
  name: undefined,
  menuType: MenuType.Directory,
  path: undefined,
  authorityId: undefined,
  authorityCode: undefined,
  routeName: undefined,
  customViewPath: false,
  viewPath: undefined,
  redirect: undefined,
  icon: undefined,
  sort: 999,
  isCache: false,
  hidden: false,
  hideBreadcrumb: false,
  props: false,
  status: CommonStatus.Enable,
};

const menuTypeEnum = useMenuTypeEnum();

const emits = defineEmits(["success"]);
defineProps({
  selectData: {
    type: Array,
  },
  authorityData: {
    type: Array,
  },
});

const moreOptionsFlag = ref(false);
const statusEnum = useEnum(CommonStatusEnumExtArray);
const iconButtonRef = ref();
const iconPopoverRef = ref();
const editFormRef = ref();
const editForm = reactive(Object.assign({}, defaultEditForm));
const rawForm: SysMenu = {};
const loading = ref(false);
const title = ref("");
const edit = ref(false);
const canEditPid = ref(false);
const visible = ref(false);

const isDirectory = () => {
  return editForm.menuType == MenuType.Directory;
};
// const isMenu = () => {
//   return editForm.menuType == MenuType.Menu;
// };
const isButton = () => {
  return editForm.menuType == MenuType.Button;
};

const privateOnConfirmClick = () => {
  const form = unref(editFormRef);
  form.validate((valid: boolean) => {
    if (valid) {
      let request;
      if (edit.value) {
        const params = getDiff<SysMenu>(rawForm, editForm);
        if (Object.keys(params).length === 0) {
          Message.warning("未改变数据");
          return;
        }
        params.id = rawForm.id;
        request = UpdateMenuAPI(params);
      } else {
        request = CreateMenuAPI(Object.assign({}, toRaw(editForm)));
      }

      loading.value = true;
      request
        .then(() => {
          loading.value = false;
          Message.success("操作成功");
          visible.value = false;
          emits("success");
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
};
const privateOnIconClick = (name: string) => {
  editForm.icon = name;
  privateOnSettingClickOutside();
};
const privateOnSettingClickOutside = () => {
  unref(iconPopoverRef).popperRef?.delayHide?.();
};
const privateOnLayoutSelectChanged = (value: string) => {
  editForm.viewPath = value;
};

defineExpose({
  show(data?: SysMenu | string) {
    visible.value = true;
    moreOptionsFlag.value = false;
    // 重置数据
    copyParams(editForm, defaultEditForm);
    copyParams(rawForm, defaultEditForm);
    nextTick(() => {
      const form = unref(editFormRef);
      form.clearValidate();
    });

    if (data) {
      if (typeof data === "string") {
        title.value = "添加菜单";
        edit.value = false;
        canEditPid.value = false;
        editForm.pid = data;
      } else {
        if (data.authorityId === "0") {
          data.authorityId = undefined;
        }
        copyParams(editForm, data);
        copyParams(rawForm, data);
        title.value = "编辑菜单";
        edit.value = true;
        canEditPid.value = false;
      }
    } else {
      title.value = "添加菜单";
      edit.value = false;
      canEditPid.value = true;
    }
  },
});
</script>
