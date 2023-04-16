<template>
  <div class="app-container">
    <el-form ref="form" :model="queryParams" :inline="true" label-width="80px" size="small">
      <el-form-item label="留言人">
        <el-input v-model="queryParams.nickName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜 索</el-button>
        <el-button @click="onCancel">重 置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border v-loading="loading" style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="60">
      </el-table-column>
      <el-table-column prop="message" label="留言" align="center">
      </el-table-column>
      <el-table-column label="留言人" prop="nickName" width="150" align="center"></el-table-column>

      <el-table-column label="创建时间" align="center" width="180">
        <template slot-scope="scope">{{ scope.row.createTime.slice(0, 10) }}</template>
      </el-table-column>
      
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleGood(scope.row)"
          >{{ scope.row.type == '1' ? '取消精选' : '设为精选' }}</el-button>
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            style="color: red; margin-left: 30px;"
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
  </div>
</template>

<script>
import { getMeaasgeList, delMessage, starMessage } from '@/api/table'

export default {
  data() {
    return {
      queryParams: {
        nickName: null,
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
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      this.getList()
    },
    onCancel() {
      this.queryParams = {
        nickName: null,
        pageSize: 10,
        pageNum: 1
      }
      this.getList()
    },
    getList() {
      this.loading = true
      getMeaasgeList(this.queryParams).then(res => {
        this.tableData = [...res.data.list]
        this.total = res.data.total
        this.loading = false
      })
    },
    // 修改
    handleUpdate(row) {
      console.log(row)
      this.curData = { ...row }
      this.$refs.addClassify.innerForm.name = row.name
      this.$refs.addClassify.innerForm.status = Number(row.status)
      this.dialogVisible = true
    },
    // 设为精选
    handleGood(row) {
      starMessage(row.id).then(() => {
        this.getList()
        const msg = row.type === '1' ? '取消精选成功！' : '添加精选成功！'
        this.$message.success(msg)
      })
    },
    // 刪除
    handleDel(row) {
      this.$confirm('是否确认删除该留言？', '提示', {
        type: 'warning'
      }).then(() => {
        return delMessage(row.id)
      }).then(() => {
        this.getList()
        this.$message.success("删除成功")
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>
