<template>
  <div>
    <el-dialog title="新增分类" :visible.sync="dialogVisible" width="480px" :before-close="handleClose">
      <el-form ref="form" size="small" :rules="rules" :model="innerForm" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="innerForm.name" maxlength="6" style="width: 360px"></el-input>
        </el-form-item>
        <el-form-item label="分类状态" prop="status">
          <el-select v-model="innerForm.status" placeholder="请选择分类状态" style="width: 360px">
            <el-option label="正常" :value="0"></el-option>
            <el-option label="停用" :value="1"></el-option>
          </el-select>
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
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      innerForm: {
        name: null,
        status: null
      },
      rules: {
        name: [
          { required: true, message: '请输入分类', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择分类状态', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleInnerClose')
    },
    confirmInnerOlder() {
      this.$refs.form.validate(valid => {
        if(valid) {
          this.$emit('handleInnerConfirm', this.innerForm)
        }
      })
    }
  }
}
</script>
