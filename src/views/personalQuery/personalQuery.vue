<template>
    <div class="admin-list">
        <el-card>
            <div slot="header">
                个人查询
            </div>
            <div class="header_screen clearfix">
                <div class="block fll">
                    <span class="demonstration">选择日期</span>
                    <!-- <span>值：{{value7}}</span> -->
                    <el-date-picker
                    v-model='value7'
                    value='value7'
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="timestamp"
                    :picker-options="pickerOptions2">
                    </el-date-picker>
                </div>
                <div class="phone_screen fll">
                    <span>手机号</span>
                    <input type="text" v-model="phone">
                    <!-- <el-select v-model="select1" placeholder="全部银行">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> -->
                </div>
                
                <div class="id_screen fll">
                    <span>用户ID</span>
                    <input type="text" v-model="usid">
                    <!-- <el-select v-model="select2" placeholder="全部状态">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> -->
                </div>
                <el-button class="header_querybutton fll" @click="handleQuery(phone,usid)" type="success" round>查询</el-button>
                <el-button size='mini' class="header_button flr" @click="exportToExcel()" type="warning" round>导出数据</el-button>
            </div>
            <el-table
            :data="tableData"
            border
            style="width: 100%;text-align: center;"
            :row-class-name="tableRowClassName">
                <el-table-column
                label="序号"
                width="50" class="tac">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.ordernumber }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="姓名"
                width="100" class="tac">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="手机号码"
                width="140">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.userphone }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="身份证号码"
                width="200">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.ID }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="申请卡片名称"
                width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.cardname }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="所属银行"
                width="110">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.bank }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="订单日期"
                width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.applytime }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="审核状态"
                width="110">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.type }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="结算"
                width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.jiesuan }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="佣金（元）"
                width="95">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.money }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="用户ID"
                width="130">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">结算佣金</el-button>
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handleUpdate(scope.$index, scope.row)">更新状态</el-button>
                    <!-- <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                </template>
                </el-table-column>
            </el-table>
        <div class="block pagination">

            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
            </el-pagination>
        </div>
        </el-card>
        <div id="state" v-if="showManual">
            <div class="title">
                <p>手动设置状态：</p>
                <button class="hide" @click="hideManual()">X</button>
            </div>
            <el-button @click="dialogFormVisible = false">审核中</el-button>
            <el-button @click="dialogFormVisible = false">核卡成功</el-button>
            <el-button @click="dialogFormVisible = false">核卡失败</el-button>
            <el-button @click="dialogFormVisible = false">非本平台下卡，无佣金</el-button>
        </div>
        <div id="bg" v-if="showManual"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                showManual: false,
                phone: '',
                usid:'', 
                pickerOptions2: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                            }
                        }, 
                        {
                            text: '最近一个月',
                            onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                            }
                        }, 
                        {
                            text: '最近三个月',
                            onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                },
                
                value6: '',
                value7: [],
                currentPage3: 5,
                tableData:[
                    {
                        ordernumber: '1',
                        username:'杨永胜',
                        userphone: 17739784317,
                        ID: 410426197797978787,
                        cardname: '中信小黄鸭',
                        bank: '中信银行',
                        applytime: '2019-01-01',
                        type: '审核通过',
                        jiesuan: '已结算',
                        money: '25',
                        id: '0901000050'
                    },
                    
                    {
                        ordernumber: '3',
                        username:'杨永胜',
                        userphone: 17739784317,
                        ID: 410426197797978787,
                        cardname: '中信小黄鸭',
                        bank: '中信银行',
                        applytime: '2019-01-01',
                        type: '审核被拒',
                        jiesuan: '已结算',
                        money: '25',
                        id: '0901000050'
                    },
                    {
                        ordernumber: '5',
                        username:'杨永胜',
                        userphone: 17739784317,
                        ID: 410426197797978787,
                        cardname: '中信小黄鸭',
                        bank: '中信银行',
                        applytime: '2019-01-01',
                        type: '审核通过',
                        jiesuan: '已结算',
                        money: '25',
                        id: '0901000050'
                    },
                    {
                        ordernumber: '7',
                        username:'杨永胜',
                        userphone: 17739784317,
                        ID: 410426197797978787,
                        cardname: '中信小黄鸭',
                        bank: '中信银行',
                        applytime: '2019-01-01',
                        type: '待查询',
                        jiesuan: '已结算',
                        money: '25',
                        id: '0901000050'
                    },
                    {
                        ordernumber: '9',
                        username:'杨永胜',
                        userphone: 17739784317,
                        ID: 410426197797978787,
                        cardname: '中信小黄鸭',
                        bank: '中信银行',
                        applytime: '2019-01-01',
                        type: '审核通过',
                        jiesuan: '已结算',
                        money: '25',
                        id: '0901000050'
                    },
                    {
                        ordernumber: '11',
                        username:'杨永胜',
                        userphone: 17739784317,
                        ID: 410426197797978787,
                        cardname: '中信小黄鸭',
                        bank: '中信银行',
                        applytime: '2019-01-01',
                        type: '审核通过',
                        jiesuan: '已结算',
                        money: '25',
                        id: '0901000050'
                    },
                    {
                        ordernumber: '13',
                        username:'杨永胜',
                        userphone: 17739784317,
                        ID: 410426197797978787,
                        cardname: '中信小黄鸭',
                        bank: '中信银行',
                        applytime: '2019-01-01',
                        type: '审核通过',
                        jiesuan: '已结算',
                        money: '25',
                        id: '0901000050'
                    },
                    {
                        ordernumber: '15',
                        username:'杨永胜',
                        userphone: 17739784317,
                        ID: 410426197797978787,
                        cardname: '中信小黄鸭',
                        bank: '中信银行',
                        applytime: '2019-01-01',
                        type: '审核通过',
                        jiesuan: '已结算',
                        money: '25',
                        id: '0901000050'
                    },
                    
                ]
            }
        },
        methods: {
            getData(){
                // this.$axios.get('/admin/adminUser').then(res=> {
                //     if(res.code == 200){ 
                //         this.tableData = res.data
                //         // console.log(this.tableData)
                //     }
                // })
            },
            // 点击查询按钮查询所需数据
            handleQuery(phone,usid){
                console.log(phone,usid,this.value7)
                console.log(this.value7)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleEdit(index, row) { 
                console.log(index, row);
            },
            // 点击更新状态查询办卡进度
            handleUpdate(index, row) {
                console.log(index, row);
                const h = this.$createElement;
                this.showManual = true
            },
            hideManual(){
                this.showManual = false
            },
            tableRowClassName({row, type}) {
                
                if (row.type == '审核被拒') {
                    return 'warning-row';
                } else if (row.type == '审核通过') {
                    return 'success-row';
                }else if (row.type == '待查询') {
                    return '';
                }
                return '';
            },
            // 将数据导出到Excel 主要使用assets/js下的两个文件完成
            exportToExcel() {
                require.ensure([], () => {
                    const {
                        export_json_to_excel
                    } = require('../../assets/js/Export2Excel');
                    const tHeader = ['序号','姓名','手机号码','身份证号码','申请卡片名称','所属银行','订单日期','审核状态','结算情况','佣金','用户ID'];
                    const filterVal = ['ordernumber','username','userphone','ID','cardname','bank','applytime','type','jiesuan','money','id'];
                    const list = this.tableData;
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '个人查询');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }
        },
        created(){
            this.getData()
        }
    }
</script>

<style scoped lang='scss'>
.header_screen{
    height: 80px;
    line-height: 80px;
    margin-top: -20px;
    .phone_screen{
        margin-left: 20px;
        span{
            margin-right: 4px;
        }
        input{
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            color: #606266;
            outline: 0;
            font-size: inherit;
        }
    }
    .id_screen{
        margin-left: 20px;
        span{
            margin-right: 4px;
        }
        input{
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            color: #606266;
            outline: 0;
            font-size: inherit;
        }
    }
    .header_querybutton{
        margin-top: 20px;
        margin-left: 20px;
    }
    .header_button{
        margin-top: 25px;
    }
}
.pagination{
    height: 40px;
    padding: 10px;

    margin-bottom: -20px;
}
.avatar {
    width: 80px;
    height: 80px;

}
#state{
    width: 342px;
    height: 340px;
    position: absolute;
    top: 30%;
    left: 40%;
    translate: transform(-50%,-50%);
    background: #fff;
    text-align: center;
    border-radius: 8px;
    z-index: 1;
    .title{
        height: 40px;
        padding: 0 0 0 20px;
        line-height: 40px;
        border-bottom: 1px solid #dcdfe6;
        p{
            text-align: left;
            float: left;
        }
        .hide{
            display: inline-block;
            border: none;
            background: #fff;
            margin: 0;
            border-radius: 8px;
            float: right;
            width: 40px;
            height: 40px;
        }
    }
    
    button{
        display: block;
        width: 300px;
        margin: 20px;
        height: 50px;
    }
}
#bg{
    background: rgba(0,0,0,0.3);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

</style>
<style>
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
.el-pagination{
    text-align: center;
}
</style>
