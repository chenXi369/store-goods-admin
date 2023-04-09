<template>
  <div class="app-container">
    <el-form ref="form" :model="queryParams" :inline="true" label-width="80px" size="small">
      <el-form-item label="分类名称">
        <el-input v-model="queryParams.name" />
      </el-form-item>
      <el-form-item label="分类状态">
        <el-select v-model="queryParams.status" placeholder="请选择分类状态">
          <el-option label="正常" :value="0"></el-option>
          <el-option label="停用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜 索</el-button>
        <el-button @click="onCancel">重 置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="12" class="mb8" style="margin-bottom: 20px">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="small"
          icon="el-icon-plus"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" border v-loading="loading" style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="60">
      </el-table-column>
      <el-table-column prop="name" label="分类名称" align="center">
      </el-table-column>
      <el-table-column label="分类状态" align="center">
        <template slot-scope="scope">
          <span :style="{'color': !scope.row.status ? 'red' : '#1890ff'}">
            {{ ['正常', '停用'][scope.row.status] }}
          </span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">{{ scope.row.createTime.slice(0, 10) }}</template>
      </el-table-column>
      
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            style="color: red; margin-left: 30px"
            @click="handleDel(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align: right;">
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </div>

    <section>
      <add-classify
        ref="addClassify"
        :dialogVisible="dialogVisible" 
        @handleInnerClose="handleInnerClose"
        @handleInnerConfirm="handleInnerConfirm"
      ></add-classify>
    </section>
  </div>
</template>

<script>
import { getCategory, deleteCategory, addCategory, updateCategory } from '@/api/table'

import AddClassify from './addClassify.vue'

export default {
  data() {
    return {
      queryParams: {
        name: null,
        status: null,
        pageSize: 10,
        pageNum: 1
      },
      tableData: [],
      loading: false,
      total: 0,
      dialogVisible: false,
      curData: {}
    }
  },
  components: {
    AddClassify
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      this.getList()
    },
    onCancel() {
      this.queryParams = {
        name: null,
        status: null,
        pageSize: 10,
        pageNum: 1
      }
      this.getList()
    },
    getList() {
      this.loading = true
      getCategory(this.queryParams).then(res => {
        this.tableData = [...res.data.list]
        this.total = res.data.total
        this.loading = false
      })
    },
    // 新增 -> 打開新增的彈窗
    handleAdd() {
      this.curData = {}
      this.dialogVisible = true
    },
    // 修改
    handleUpdate(row) {
      console.log(row)
      this.curData = { ...row }
      this.$refs.addClassify.innerForm.name = row.name
      this.$refs.addClassify.innerForm.status = Number(row.status)
      this.dialogVisible = true
    },
    // 刪除
    handleDel(row) {
      this.$confirm('是否确认删除分类名为"' + row.name + '"的数据项？', '提示', {
        type: 'warning'
      }).then(() => {
        return deleteCategory(row.id)
      }).then(() => {
        this.getList()
        this.$message.success("删除成功")
      })
    },
    // 弹窗的取消按钮
    handleInnerClose() {
      this.dialogVisible = false
    },
    // 弹窗的确定按钮
    handleInnerConfirm(row) {
      this.dialogVisible = false

      if(this.curData.hasOwnProperty('id')) {
        const data = { ...row, id: this.curData.id }
        updateCategory(data).then(() => {
          this.getList()
          this.$message.success("修改成功")
        })
      } else {
        const data = { ...row }
        addCategory(data).then(() => {
          this.getList()
          this.$message.success("新增成功")
        })
      }
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
