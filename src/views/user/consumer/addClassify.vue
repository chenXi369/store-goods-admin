<template>
  <div>
      <el-dialog title="新增产品" :visible.sync="dialogVisible" width="600px" :before-close="handleClose">
          <el-form ref="form" size="small" :rules="rules" :model="innerForm" label-width="80px">
              <el-form-item label="用户名" prop="userName">
                  <el-input v-model="innerForm.userName"></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="nickName">
                  <el-input v-model.number="innerForm.nickName"></el-input>
              </el-form-item>
              <el-form-item label="头像" prop="avatar">
                  <image-upload v-model="innerForm.avatar" :value="innerForm.avatar" :file-size="2" :limit="1"></image-upload>
              </el-form-item>
              <el-form-item label="手机号" prop="phonenumber">
                  <el-input v-model="innerForm.phonenumber"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                  <el-input v-model="innerForm.email"></el-input>
              </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="handleClose">取 消</el-button>
              <el-button size="small" type="primary" @click="confirmAddGoods">确 定</el-button>
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
      },
      categoryOptions: {
          type: Array,
          default: () => []
      }
  },
  data() {
      return {
          innerForm: {
              userName: null,
              nickName: null,
              avatar: null,
              phonenumber: null,
              email: null
          },
          rules: {
              userName: [
                  { required: true, message: '请输入用户名', trigger: 'blur' },
                  { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
              ],
              nickName: [
                  { required: true, message: '请输入商品价格', trigger: 'blur' }
              ],
              phonenumber: [
                  { required: true, message: '请输入正确的手机号', trigger: 'change' }
              ],
              avatar: [
                  { required: true, message: '用户头像不能为空', trigger: 'change' }
              ]
          }
      }
  },
  methods: {
      handleClose() {
          this.$emit('handleInnerClose')
          this.$refs.form.resetFields()
      },
      confirmAddGoods() {
          console.log(this.innerForm)
          this.$refs.form.validate(valid => {
              if(valid) {
                  this.$emit('handleInnerConfirm', this.innerForm)
              }
              this.$refs.form.resetFields()
          })
      }
  }
}
</script>
