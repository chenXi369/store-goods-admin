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

    <el-row :gutter="12" class="mb8" style="margin-bottom: 20px;">
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

    <el-row :gutter="20" style="border-top: 1px solid #eaeaea; padding-top: 20px">
      <el-col :span="4" style="border: 1px solid #eaeaea; padding: 20px">
        <el-tree
          :data="treeData"
          :props="defaultProps"
          accordion
          highlight-current
          @node-click="handleNodeClick">
        </el-tree>
      </el-col>

      <el-col :span="20">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane label="待测产品" name="first">
            <el-table :data="tableData" border v-loading="loading" style="width: 100%">
              <el-table-column type="index" label="序号" align="center" width="60">
              </el-table-column>
              <el-table-column prop="name" label="商品主图" align="center">
                <template slot-scope="scope">
                  <image-preview :src="scope.row.bannerImg"></image-preview>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="产品名称" align="center">
              </el-table-column>
              <el-table-column prop="brand" label="商品品牌" align="center">
              </el-table-column>
              <el-table-column prop="price" label="商品价格（元）" align="center">
              </el-table-column>

              <el-table-column label="创建时间" align="center">
                <template slot-scope="scope">{{ scope.row.createTime.slice(0, 10) }}</template>
              </el-table-column>
              
              <el-table-column label="操作" width="220" align="center">
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
                    icon="el-icon-data-line"
                    style="margin-left: 25px"
                    @click="handleEducate(scope.row)"
                  >测评</el-button>
                  <el-button
                    type="text"
                    size="small"
                    icon="el-icon-delete"
                    style="color: red; margin-left: 25px"
                    @click="handleDel(scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div style="text-align: right">
              <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getList"
              />
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="已测产品" name="second">
            <el-table :data="tableData" border v-loading="loading" style="width: 100%">
              <el-table-column type="index" label="序号" align="center" width="60">
              </el-table-column>
              <el-table-column prop="name" label="商品主图" align="center">
                <template slot-scope="scope">
                  <image-preview :src="scope.row.bannerImg" :width="'30px'" :height="'30px'"></image-preview>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="产品名称" align="center">
              </el-table-column>
              <el-table-column prop="brand" label="商品品牌" align="center">
              </el-table-column>
              <el-table-column prop="price" label="商品价格（元）" align="center">
              </el-table-column>

              <el-table-column label="是否推荐" align="center">
                <template slot-scope="scope">{{ scope.row.recommendStatus == 1 ? '是' : '否' }}</template>
              </el-table-column>
              <el-table-column prop="score" label="测评分数" align="center">
              </el-table-column>
              
              <!-- <el-table-column label="操作" width="150" align="center">
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
              </el-table-column> -->
            </el-table>

            <div style="text-align: right">
              <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getList"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <section>
      <add-dialog
        ref="goodDailog"
        :dialogVisible="dialogVisible"
        :categoryOptions="treeData"
        @handleInnerClose="handleInnerClose"
        @handleInnerConfirm="handleInnerConfirm"
      ></add-dialog>

      <test-dialog
        ref="testDialog"
        :testVisible="testVisible"
        @handleTestClose="handleTestClose"
        @handleTestConfirm="handleTestConfirm"
      ></test-dialog>
    </section>
  </div>
</template>

<script>
import { getCategory } from '@/api/table'
import { getProductList, evaluationProduct, addProduct, delProduct, updateProduct  } from '@/api/products'

import AddDialog from './addDialog.vue'
import TestDialog from './testDialog.vue'

export default {
  data() {
    return {
      queryParams: {
        name: null,
        categoryId: null,
        pageSize: 10,
        pageNum: 1
      },
      tableData: [],
      loading: false,
      total: 0,
      dialogVisible: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      curTreeNode: {},
      activeName: 'first',
      testVisible: false,
      curData: null
    }
  },
  components: {
    AddDialog,
    TestDialog
  },
  created() {
    this.getCategory()

    this.getProductList()
  },
  watch: {
    activeName(val) {
      switch (val) {
        case 'first':
          this.queryParams.status = 0
          this.getProductList()
          break;
        case 'second':
          this.queryParams.status = 1
          this.getProductList()
          break;
      }
    }
  },
  methods: {
    onSubmit() {
      this.getProductList()
    },
    onCancel() {
      this.queryParams = {
        name: null,
        pageSize: 10,
        pageNum: 1
      }
      this.getProductList()
    },
    // 打开测评的弹窗
    handleEducate(row) {
      this.testVisible = true
      this.curData = { ...row }
      this.$refs.testDialog.innerForm.name = row.name
    },
    // 分页的处理
    getList() {
      this.getProductList()
    },
    // 选中左侧分类
    handleNodeClick(row) {
      this.curTreeNode = { ...row }
      this.queryParams.categoryId = row.id
      this.getProductList()
    },
    // 获取分类的tree型数据
    getCategory() {
      getCategory(this.queryParams).then(res => {
        this.treeData = [...res.data.list]
      })
    },
    // 获取商品列表
    getProductList() {
      this.loading = true
      getProductList(this.queryParams).then(res => {
        this.tableData = [...res.data.list]
        this.total = res.data.total
        this.loading = false
      })
    },
    // 新增 -> 打開新增的彈窗
    handleAdd() {
      this.dialogVisible = true
      this.curData = null
    },
    // 修改
    handleUpdate(row) {
      console.log(row)
      this.curData = { ...row }
      this.$refs.goodDailog.innerForm = {...row}
      this.dialogVisible = true
    },
    // 刪除
    handleDel(row) {
      this.$confirm('是否确认删除商品名"' + row.name + '"的数据项？', '提示', {
        type: 'warning'
      }).then(() => {
        return delProduct(row.id)
      }).then(() => {
        this.getList()
        this.$message.success("删除成功")
      })
    },
    handleTestClose() {
      this.testVisible = false
    },
    // 弹窗的确定按钮
    handleTestConfirm(row) {
      this.testVisible = false

      if(this.curData.hasOwnProperty('id')) {
        const data = { ...row, id: this.curData.id }
        evaluationProduct(data).then(() => {
          this.getList()
          this.$message.success("测评成功")
        })
      }
    },
    // 弹窗的取消按钮
    handleInnerClose() {
      this.dialogVisible = false
    },
    // 弹窗的确定按钮
    handleInnerConfirm(row) {
      this.dialogVisible = false

      if(this.curData && this.curData.hasOwnProperty('id')) {
        const data = { ...row, id: this.curData.id }
        updateProduct(data).then(() => {
          this.getList()
          this.$message.success("修改成功")
        })
      } else {
        const data = { ...row }
        addProduct(data).then(() => {
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

