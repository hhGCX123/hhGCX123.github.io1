<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:20px">
            <el-card shadow="hover">
                <div class="user">
                     <img :src="getImageUrl('hjr')" class="user">
                    <div class="user-info">
                        <p class="user-info-admin">{{username}}</p>
                        <p class="user-info-p">{{root}}</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2024-8-11</span></p>
                    <p>上次登录地点：<span>重庆</span></p>
                </div>
            </el-card>

            <el-card shadow="hover" class="user-table">
                <el-table :data="tableData">
                    <el-table-column prop="name" label="课程"  />
                    <el-table-column prop="todayBuy" label="日售量"  />
                    <el-table-column prop="monthBuy" label="月售量"  />
                    <el-table-column prop="totalBuy" label="总售量"  />
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top:20px">
            <div class="num">
                <el-card
                :body-style="{display:'flex',pandding:0}"
                v-for="item of countData"
                :key="item.name"
                >
                <component :is="item.icon" class="icons" :style="{background:item.color}"></component>
                <div class="detail">
                    <p class="num">￥{{ item.value }}</p>
                    <p class="txt">￥{{ item.name }}</p>
                </div>
            </el-card>
            </div>
            <el-card class="top-echart">
                <div ref="echart" style="height: 280px"></div>
            </el-card>
        </el-col>
        
    </el-row>
</template>
  
<script setup>
import {ref,computed,getCurrentInstance,onMounted,reactive}  from 'vue'
import * as echarts from 'echarts'
import axios from 'axios'
import{ userAllDataStore } from '@/stores'

const {proxy} = getCurrentInstance()

const getImageUrl=(user)=>{
    return new URL(`../assets/images/${user}.png`,import.meta.url).href;
}
const store=userAllDataStore()
const username=ref(store.state.username)
const root=ref(store.state.root)
//这是折线图和柱状图两个表共用的公共配置
//echarts官网
const xOptions=reactive({
    //图例文字颜色
    textStyle:{
        color:"#333",
    },
    legend:{},
    grid:{
        left:"20%",
    },
    //提示框
    tooltip:{
        trigger:"axis",
    },
    xAxis:{
        type:"category",//类目轴
        data:[],
        axisLine:{
            lineStyle:{
                color:"#17b3a3",
            },
        },
        axisLabel:{
            interval:0,
            color:"#333",
        },
    },
    yAxis:[
        {
            type:"value",
            axisLine:{
                lineStyle:{
                    color:"#17b3a3",
                },
            },
        },
    ],
    color:["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3"],
    series:[],
})
const pieOptions=reactive({
    tooltip:{
        trigger:"item",
    },
    legend:{},
    color:[
      "#0f78f4",
      "#dd536b",
      "#9462e5",
      "#a6a6a6",
      "#e1bb22",
      "#39c362",
      "#3ed1cf",
    ],
    series:[]
})

//使用axios请求mock数据模仿真实场景获取后端数据
const tableData=ref([])
const countData=ref([])
const chartData=ref([])
const getTableData= async()=>{
   const data =await proxy.$api.getTableData()
   tableData.value=data
}
const getCountData= async()=>{
   const data =await proxy.$api.getCountData()
   countData.value=data
}
const getChartData= async()=>{
   const {orderData} =await proxy.$api.getChartData()
   //对第一个图标进行x轴和series赋值
   xOptions.xAxis.data=orderData.date
   xOptions.series=Object.keys(orderData.data[0]).map(val=>{
    return{
        name:val,
        data:orderData.data.map(item=>item[val]),
        type:'line'
        }
   })
   const oneEchart=echarts.init(proxy.$refs['echart'])
   oneEchart.setOption(xOptions)
}
onMounted(()=>{
    getTableData()
    getCountData()
    getChartData()
})

</script>
  
<style scope lang="less">
 .home{
    height: 100%;
    overflow: hidden;
    overflow-y: auto; 
    overflow-x: auto; 
    .user{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        img{
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;
        }
        .user-info{
            p{
                line-height: 40px;

            }
            .user-info-admin{
                font-size: 35px;
            }
            .user-info-p{
                color: #999;
            }
        }
    }
    .login-info{
        p{
            line-height: 30px;
            font-size: 14px;
            columns: #999;
            span{
                color: #666;
                margin-left: 60px;
            }
        }
    }
    .user-table{
        margin-top: 20px;
    }
    .num{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .el-card{
            width: 32%;
            margin-bottom: 20px;
        }
        .icons{
            width: 80px;
            height: 80px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }
        .detail{
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .num{
                font-size: 30px;
                margin-bottom: 10px;
            }
            .txt{
                font-size: 15px;
                text-align: center;
                color:"#999";
            }
        }
    }
}

</style>