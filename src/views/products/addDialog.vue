<template>
    <div>
        <el-dialog title="新增产品" :visible.sync="dialogVisible" width="600px" size="small" :before-close="handleClose">
            <el-form ref="form" :rules="rules" :model="innerForm" label-width="80px">
                <el-form-item label="商品分类">
                    <el-input disabled v-model="innerForm.categoryId"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="innerForm.name"></el-input>
                </el-form-item>
                <el-form-item label="售价" prop="price">
                    <el-input v-model.number="innerForm.price"></el-input>
                </el-form-item>
                <el-form-item label="商品主图" prop="bannerImg">
                    <image-upload :limit="3" ></image-upload>
                </el-form-item>
                <el-form-item label="商家品牌" prop="brand">
                    <el-input v-model="innerForm.brand"></el-input>
                </el-form-item>
                <el-form-item label="商品备注" prop="remark">
                    <el-input type="textarea" v-model="innerForm.remark"></el-input>
                </el-form-item>
                <el-form-item label="商品详情">
                    <editor v-model="innerForm.noticeContent" :min-height="192"></editor>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="confirmInnerOlder">确 定</el-button>
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
            innerForm: {},
            rules: {
                categoryId: [
                    { required: true, message: '请选择商品分类', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入商品价格', trigger: 'blur' }
                ],
                bannerImg: [
                    { required: true, message: '请上传商品主图', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        handleClose() {
            this.$emit('handleInnerClose')
        },
        confirmInnerOlder() {
            this.$emit('handleInnerConfirm', this.innerForm)
        }
    }
}
</script>
  