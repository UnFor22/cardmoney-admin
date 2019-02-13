<template>
    <div class="login">
        <div class="form-wrap">
            <h1>卡秘办卡赚钱后台管理系统</h1>
            <el-form  ref="form" :model="formData" label-position="left" label-width='60px'>
                <el-form-item label='用户名' style="color:#fff;" class="form-item">
                    <el-input v-model='formData.username'></el-input>
                </el-form-item>
                <el-form-item label='密码' class="form-item">
                    <el-input type="password" v-model='formData.password'></el-input>
                </el-form-item>
                <el-form-item class="form-item">
                    <el-button type='primary' @click="handleLogin" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </div>  
        
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formData: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            handleLogin(){
                // this.$axios.post('/admin/adminUser/login',this.formData).then(res => {
                //     if(res.code == 200){
                //         this.$message.success(res.msg)
                //         this.$router.push('/layout')
                //     } else {
                //         this.$message(res.msg)
                //     }
                // })
                this.$router.push('/layout')
            }
        }
    }
</script>

<style scoped lang='scss'>
.login {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #001d26;
    height: 100vh;
    .form-wrap {
        width: 600px;
        // height: 360px;
        margin: 180px auto;
        text-align: center;
        color: #fff;
        h1 {
            font-size: 32px;
            color: #fff;
            font-weight: 500;
            margin-bottom: 50px;
        }
        .form-item {
            color: #fff;
            margin: 30px 0;
        }
    }
}
</style>
<style>
.form-item {
    color: #fff;
    margin: 30px 0;
}
</style>
