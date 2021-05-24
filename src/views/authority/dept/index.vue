<template>
  <ingot-container>
    <ingot-page-card :hideBack="true">
      <el-row>
        <el-col :span="8">
          <el-button-group>
            <el-button
              type="success"
              size="small"
              icon="el-icon-plus"
              @click="handleCreateButtonClick"
            >
              添加
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="handleEditButtonClick"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="handleDeleteButtonClick"
            >
              删除
            </el-button>
          </el-button-group>
          <el-tree
            class="dept-tree"
            :data="deptTree.data"
            :props="deptTree.props"
            :node-key="deptTree.nodeKey"
            :default-expanded-keys="deptTree.expandedKeys"
            :highlight-current="true"
            :expand-on-click-node="false"
            @node-click="handleTreeNodeClick"
          ></el-tree>
        </el-col>
        <el-col :span="16">
          <el-form
            ref="deptFormRef"
            :model="formModel"
            :rules="rules"
            label-width="100px"
            class="dept-form"
            size="small"
            :disabled="deptEditStatus.formDisabled"
          >
            <el-form-item label="上级部门">
              <el-input v-model="formModel.pName" disabled></el-input>
            </el-form-item>
            <el-form-item prop="name" label="部门名称">
              <el-input
                v-model="formModel.name"
                placeholder="请输入部门名称"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="scope" label="角色范围">
              <el-radio-group v-model="formModel.scope">
                <el-radio :label="DeptRoleScope.Current">
                  {{ getDeptRoleScopeDesc(DeptRoleScope.Current) }}
                </el-radio>
                <el-radio :label="DeptRoleScope.CurrentChild">
                  {{ getDeptRoleScopeDesc(DeptRoleScope.CurrentChild) }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="sort" label="排序">
              <el-input
                v-model="formModel.sort"
                placeholder="请输入排序序号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="status" label="状态">
              <el-radio-group v-model="formModel.status">
                <el-radio :label="CommonStatus.Enable">
                  {{ getCommonStatusDesc(CommonStatus.Enable) }}
                </el-radio>
                <el-radio :label="CommonStatus.Lock">
                  {{ getCommonStatusDesc(CommonStatus.Lock) }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="!deptEditStatus.formDisabled">
              <el-button
                type="success"
                size="small"
                @click="handleCreateOrUpdateDept(deptFormRef)"
              >
                {{ deptEditStatus.saveOrUpdateButtonTitle }}
              </el-button>
              <el-button type="info" size="small" @click="handleCancelEdit">
                取消
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </ingot-page-card>
  </ingot-container>
</template>

<script lang="ts" src="./dept.ts"></script>

<style lang="stylus" scoped>
.dept-tree
  margin-top 10px
.dept-form
  width 400px
</style>
