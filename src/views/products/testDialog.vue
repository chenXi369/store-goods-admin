<template>
  <div>
    <el-dialog title="测评" :visible.sync="testVisible" width="700px" :before-close="handleClose">
      <el-form ref="form" size="small" :rules="rules" :model="innerForm" label-width="100px">
        <el-form-item label="商品名称" prop="name">
            <el-input v-model="innerForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="推荐状态" prop="recommendStatus">
            <el-select v-model="innerForm.recommendStatus" style="width: 100%" placeholder="请选择">
              <el-option label="推荐" :value="1"></el-option>
              <el-option label="不推荐" :value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="推荐顺序" prop="recommendSorting">
            <el-input v-model="innerForm.recommendSorting"></el-input>
        </el-form-item>
        <el-form-item label="推荐商品图" prop="bannerImg">
            <image-upload :limit="3"></image-upload>
        </el-form-item>
        
        <el-form-item label="测评分数" prop="score">
            <el-input v-model="innerForm.score" type="number" :min="0" :max="100"></el-input>
        </el-form-item>
        <el-form-item label="测评详情">
            <editor v-model="innerForm.evaluationDetail" :min-height="192"></editor>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleClose">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmInnerOlder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    testVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      innerForm: {
        name: null,
        recommendStatus: null,
        recommendSorting: null,
        evaluationDetail: null
      },
      rules: {
        recommendStatus: [
          { required: true, message: '请选择推荐状态', trigger: 'change' }
        ],
        recommendSorting: [
          { required: true, message: '请输入推荐顺序', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '请输入测评分数', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleTestClose')
    },
    confirmInnerOlder() {
      this.$refs.form.validate(valid => {
        if(valid) {
          this.$emit('handleTestConfirm', this.innerForm)
        }
      })
    }
  }
}
</script>
