<template>
    <div class="sidebar">
        <div class="titlelogo clearfix">
            <img src="../assets/logo.jpg" alt="">
            <p>卡秘信用卡</p> 
        </div>
        <el-menu     
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#001d26"
        text-color="#fff"
        active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>首页</span>
                </template>   
                <router-link to='/layout'>
                    <el-menu-item index="1-1">首页</el-menu-item>
                </router-link>
                <router-link to='/'>
                    <el-menu-item index="1-2">登录页</el-menu-item>
                </router-link>        
            </el-submenu>
            <el-menu-item index="2" @click="openDataReport()">
                <i class="el-icon-menu"></i>
                <span slot="title">申请数据报表</span>
            </el-menu-item>
            <el-menu-item index="3" @click="openSummary()">
                <i class="el-icon-document"></i>
                <span slot="title">汇总统计</span>
            </el-menu-item>
            <el-menu-item index="4" @click="personalQuery()">
                <i class="el-icon-setting"></i>
                <span slot="title">个人查询</span>
            </el-menu-item>
       
        </el-menu>
    </div>
</template>

<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            openDataReport(){
                this.$router.push('/layout/dataReport')
            },
            openSummary(){
                this.$router.push('/layout/summary')
            },
            personalQuery(){
                this.$router.push('/layout/personalQuery')
            }
        }
    }
</script>

<style scoped lang='scss'>
.titlelogo{
    img {
        width: 34px;
        border-radius: 50%;
        float: left;
        margin-top: 13px;
        margin-left: 20px;
        vertical-align: middle;
    }
    p{
        float: left;
        margin-left: 10px;
    }
    height: 7vh;
    line-height: 7vh;
    text-align: center;
    background: #8865ff;
    color: #fff;
    font-weight: 600;
}
.el-menu-vertical-demo {
    height: 93vh;
}
.sidebar{
    height: 100vh;
}
</style>