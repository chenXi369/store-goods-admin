<template>
    <div>
        <el-dialog 
            title="新增产品" 
            :visible.sync="dialogVisible" 
            width="700px" size="small"
            :before-close="handleClose"
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="产品名称">
                    <el-input v-model="innerForm.name"></el-input>
                </el-form-item>
                <el-form-item label="库存">
                    <el-input v-model="innerForm.stockNum"></el-input>
                </el-form-item>
                <el-form-item label="售价">
                    <el-input v-model="innerForm.price"></el-input>
                </el-form-item>
                <el-form-item label="产品内容">
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
            innerForm: {}
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
  