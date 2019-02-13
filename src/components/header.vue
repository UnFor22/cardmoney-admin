<template>
    <div>
        <el-header style="text-align: center; font-size: 12px" >
            <span class="header-title">办卡赚钱后台管理系统</span>
            <el-dropdown class="flr">
                <i class="el-icon-setting" style="margin-right: 10px"></i>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出登录</el-dropdown-item>
                <el-dropdown-item>切换账号</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
                <span>王小虎</span>
            </el-dropdown>
            
        </el-header>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang='scss'>
.el-header {
    background-color: #d6dfe4;
    color: #333;
    line-height: 60px;
    .header-title {
        font-size: 26px;
        font-weight: 500;
        color: #333;
    }
}
</style>