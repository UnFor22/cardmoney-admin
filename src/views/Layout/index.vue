<template>
    <div>
        <el-row>
            <el-col :span="3" style="height:100vh;">
                <SideBar></SideBar>     
            </el-col> 
            <el-col :span="21" style="height:100vh; overflow-y:scroll">
                <Header></Header>
                <AppMain></AppMain>  
            </el-col>  
            
        </el-row>  
        
    </div>
</template>

<script>
    import Header from '@/components/header'
    import SideBar from '@/components/SideBar'
    import AppMain from './AppMain'
    export default {
        components: {
            Header,
            SideBar,
            AppMain
        }
    }
</script>

<style scoped>

</style>