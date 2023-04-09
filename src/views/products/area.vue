<template>
  <div class="container">
    <el-form ref="form" :model="queryParams" :inline="true" label-width="80px" size="small">
      <el-form-item label="区域名称">
        <el-input v-model="queryParams.name" />
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit">搜 索</el-button>
        <el-button size="small" @click="onCancel">重 置</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="12" class="mb8" style="margin-bottom: 20px">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          size="mini"
          icon="el-icon-plus"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          size="mini"
          icon="el-icon-delete"
          @click="handleDelete"
        >刪除</el-button>
      </el-col>
    </el-row> -->

    <el-table :data="tableData" border v-loading="loading" style="width: 100%">
      <el-table-column prop="name" label="区域名称" width="180">
      </el-table-column>
      <el-table-column prop="code" label="区域码">
      </el-table-column>
    </el-table>

    <!-- <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    /> -->
  </div>
</template>

<script>
import { getAreaList } from '@/api/products.js'

export default {
  data() {
    return {
      queryParams: {
        name: null,
        pageNum: 1,
        pageSize: 40
      },
      tableData: [],
      loading: false,
      total: 0
    }
  },
  mounted() {
    this.getArea()
  },
  methods: {
    // 获取区域列表
    getArea() {
      this.loading = true
      getAreaList(this.queryParams).then(res => {
        this.tableData = [...res.data]
        // this.total = res.total
        this.loading = false
      })
    },
    // 搜索
    onSubmit() {
      this.getArea()
    },
    // 重置
    onCancel() {

    },
    // 翻页
    getList() {

    }
  }
}
</script>

<style>

</style>