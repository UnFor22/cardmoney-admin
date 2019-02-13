<template>
    <div>
        <el-card>
            <div slot="header">
                汇总统计
            </div>
            <div class="header_screen clearfix">
                <div class="block fll">
                    <span class="demonstration">选择日期</span>
                    <el-date-picker
                    v-model="value7"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2">
                    </el-date-picker>
                </div>
                <div class="phone_screen fll">
                    <!-- <span>手机号</span>
                    <input type="text" v-model="phone"> -->
                    <el-select v-model="select1" placeholder="全部银行">
                        <el-option
                        v-for="item in bankoptions"
                        :key="item.bankid"
                        :label="item.bankname"
                        :value="item.bankid">
                        </el-option>
                    </el-select>
                </div>
                <div class="id_screen fll">
                    <span>渠道号</span>
                    <input type="text" v-model="utm_source">
                </div>
                <el-button class="header_querybutton fll" @click="handleQuery(phone,usid)" type="success" round>查询</el-button>
                <el-button size='mini' class="header_button flr" @click="exportToExcel()" type="warning" round>导出数据</el-button>
            </div>
            <el-table
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column
                label="序号"
                width="100"
                prop="title"
                class="tac">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="渠道标识"
                width="200"
                prop="title"
                class="tac">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.utm_source }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="所属银行"
                width="140">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.bank }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="进件量"
                width="100">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.incomeNum }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="结算量"
                width="140">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.settlementNum }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="核批率"
                width="140">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.ratio }}</span>
                </template>
                </el-table-column>
                <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column> -->
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
    </div>
</template>

<script>
import {getNewHotBankList} from '../../requestAPI/requestAPI'
    export default {   
        data() {
            return{
                pickerOptions2: {  // 时间选择框 数据
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
                value7: [],  // 时间选择框起止时间
                bankoptions: [  // 银行选择框数据
                    {
                        bankid: 0,
                        bankname: '全部银行'
                    }
                ],
                select1: '', 
                tableData:[
                    {
                        id: '1',
                        utm_source: 'SDLIST',
                        bank: '中信银行',
                        incomeNum: '666',
                        settlementNum: '100',
                        ratio: '0.3',
                    },
                    {
                        id: '2',
                        utm_source: 'SDLIST',
                        bank: '招商银行',
                        incomeNum: '66',
                        settlementNum: '10',
                        ratio: '0.3',
                    }
                ],
                utm_source: '',
                currentPage3: 5,
            }
        },
        methods: {
            getData(){
                getNewHotBankList().then(res => {
                    console.log(res)
                    this.bankoptions = this.bankoptions.concat(res.data) 
                    console.log(this.bankoptions)
                }).catch(err => {
                    // Toast({message:err,duration: 500});
                });
            },
            handleEdit(index, row) {
                console.log(row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            // 将数据导出到Excel 主要使用assets/js下的两个文件完成
            exportToExcel() {
                require.ensure([], () => {
                    const {
                        export_json_to_excel
                    } = require('../../assets/js/Export2Excel');
                    const tHeader = ['序号','渠道标识','所属银行','进件量','结算量','核批率'];
                    const filterVal = ['id','utm_source','bank','incomeNum','settlementNum','ratio'];
                    const list = this.tableData;
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '汇总统计');
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
</style>
<style>
/* .el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
} */
.el-pagination{
    text-align: center;
}
</style>