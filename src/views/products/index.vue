<template>
  <div class="app-container">
    <el-form ref="form" :model="queryParams" :inline="true" label-width="80px" size="small">
      <el-form-item label="产品名称">
        <el-input v-model="queryParams.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜 索</el-button>
        <el-button @click="onCancel">重 置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="12" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="small"
          icon="el-icon-plus"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          size="small"
          icon="el-icon-delete"
          @click="handleDelete"
        >刪除</el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" border v-loading="loading" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址">
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <section>
      <add-dialog 
        :dialogVisible="dialogVisible" 
        @handleInnerClose="handleInnerClose"
        @handleInnerConfirm="handleInnerConfirm"
      ></add-dialog>
    </section>
  </div>
</template>

<script>
import { getProductList } from '@/api/products.js'

import AddDialog from './addDialog.vue'

export default {
  data() {
    return {
      queryParams: {
        name: '',
        pageSize: 10,
        pageNum: 1
      },
      tableData: [],
      loading: false,
      total: 0,
      dialogVisible: false
    }
  },
  components: {
    AddDialog
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    getList() {
      this.loading = true
      getProductList(this.queryParams).then(res => {
        this.tableData = [...res.rows]
        this.total = res.total
        this.loading = false
      })
    },
    // 新增 -> 打開新增的彈窗
    handleAdd() {
      this.dialogVisible = true
    },
    // 可以選擇批量刪除
    handleDelete() {

    },
    // 弹窗的取消按钮
    handleInnerClose() {
      this.dialogVisible = false
    },
    // 弹窗的确定按钮
    handleInnerConfirm(row) {
      console.log(row)
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

