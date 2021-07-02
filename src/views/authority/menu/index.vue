<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <template #action>
        <ingot-tenant-options size="small" />
      </template>

      <el-row>
        <el-col :span="8">
          <el-button-group>
            <el-button
              type="success"
              size="small"
              icon="el-icon-plus"
              @click="handleCreateRadioClick"
            >
              添加
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="handleEditRadioClick"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="handleDeleteRadioClick(fetchData)"
            >
              删除
            </el-button>
            <el-button
              type="warning"
              size="small"
              icon="el-icon-refresh-left"
              @click="handleCancelSelectRadioClick"
            >
              取消选择
            </el-button>
          </el-button-group>
          <el-tree
            class="tree"
            ref="menuTreeRef"
            :data="menuData.data"
            :props="menuData.props"
            :node-key="menuData.nodeKey"
            :default-expanded-keys="menuData.expandedKeys"
            :highlight-current="true"
            :expand-on-click-node="false"
            @node-click="handleTreeNodeClick"
          ></el-tree>
        </el-col>
        <el-col :span="16">
          <el-form
            ref="menuFormRef"
            :model="editForm"
            :rules="rules"
            label-width="100px"
            class="form"
            size="small"
            :disabled="editStatus.formDisabled"
          >
            <el-form-item label="上级菜单">
              <el-input v-model="editForm.pName" disabled></el-input>
            </el-form-item>
            <el-form-item prop="name" label="菜单名称">
              <el-input
                v-model="editForm.name"
                placeholder="请输入菜单名称"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="path" label="菜单路径">
              <el-input
                v-model="editForm.path"
                placeholder="请输入菜单路径"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="viewPath" label="视图路径">
              <el-input
                v-model="editForm.viewPath"
                placeholder="请输入视图路径"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="icon" label="菜单icon">
              <el-input
                v-model="editForm.icon"
                placeholder="请输入菜单icon"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="sort" label="排序">
              <el-input
                v-model="editForm.sort"
                placeholder="请输入排序序号"
                type="number"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="params" label="参数">
              <el-input
                v-model="editForm.params"
                placeholder="请输入菜单参数"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="cache" label="是否缓存">
              <el-radio-group v-model="editForm.isCache">
                <el-radio :label="true"> 是 </el-radio>
                <el-radio :label="false"> 否 </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="hidden" label="是否隐藏">
              <el-radio-group v-model="editForm.hidden">
                <el-radio :label="true"> 是 </el-radio>
                <el-radio :label="false"> 否 </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="status" label="状态">
              <el-radio-group v-model="editForm.status">
                <el-radio :label="CommonStatus.Enable">
                  {{ getCommonStatusDesc(CommonStatus.Enable) }}
                </el-radio>
                <el-radio :label="CommonStatus.Lock">
                  {{ getCommonStatusDesc(CommonStatus.Lock) }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="remark" label="备注">
              <el-input
                v-model="editForm.remark"
                placeholder="请输入备注信息"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item v-if="!editStatus.formDisabled">
              <el-button
                type="success"
                size="small"
                @click="handleFormCreateOrUpdate(fetchData)"
              >
                {{ editStatus.saveOrUpdateButtonTitle }}
              </el-button>
              <el-button type="danger" size="small" @click="handleFormCancel">
                取消
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </ingot-page-card>
  </ingot-container>
</template>
<script lang="ts" src="./menu.ts"></script>
<style lang="stylus" scoped>
.tree
  margin-top 10px
.form
  width 400px
</style>
