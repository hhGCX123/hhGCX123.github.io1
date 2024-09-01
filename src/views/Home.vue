<template>
    <div class="all_container">
        <el-row class="home" :gutter="0">
            <el-col :span="8">
                <el-card shadow="hover" class="real_time_display_area">
                    <p class="realTime">{{ getCurrentDateTime1 }}</p>
                    <p class="divice"></p>
                    <div class="temp_big">
                        <div>
                            <p class="temp">{{ temp }}</p>
                            <p class="temp_l_h">温差  {{ lTemp() }} ~ {{ hTemp() }}℃</p>
                        </div>
                        <div>
                            <p class="ssd_1">℃</p>
                            <p class="tg">体感</p>
                            <p class="tg_ssd">{{ temp+2 }}℃</p>
                        </div>
                    </div>
                    <div class="Tips">
                        <el-button class="tip" @click="goToPage" type='danger' text bg>{{ lifeTips }}</el-button>
                    </div>
                    <p class="font_details">实况详情</p>
                </el-card>
                <el-card shadow="hover" class="details_information">
                    <div style="display: flex;justify-content: space-evenly;">
                        <el-card shadow="hover" class="detail">
                            <img :src="getImageUrl('1')" class="detail_img"/>
                            <p class="detail_title">体感</p>
                            <p class="detail_message">{{ temp+2 }}℃</p>
                        </el-card>
                        <el-card shadow="hover" class="detail">
                            <img :src="getImageUrl('2')" class="detail_img"/>
                            <p class="detail_title">阴影体感</p>
                            <p class="detail_message">{{ temp-2 }}℃</p>
                        </el-card>
                        <el-card shadow="hover" class="detail">
                            <img :src="getImageUrl('3')" class="detail_img"/>
                            <p class="detail_title">湿度</p>
                            <p class="detail_message">{{ humi }}%</p>
                        </el-card>
                        <el-card shadow="hover" class="detail">
                            <img :src="getImageUrl('4')" class="detail_img"/>
                            <p class="detail_title">光照强度</p>
                            <p class="detail_message">{{ light }}klx</p>
                        </el-card>
                    </div>
                    <div class="selectMode">
                        <p class="font_selectMode">模式选择：</p>
                        <el-radio-group v-model="selectedMode" @change="handleModeChange">
                            <el-radio-button :value="modes.manual">手动调节</el-radio-button>
                            <el-radio-button :value="modes.auto">自动调节</el-radio-button>
                        </el-radio-group>
                        <img :src="getImageUrl('5')" class="img_help" @click="select_help"/>
                    </div>
                    <div class="control">
                        <p>灯光模式</p>
                        <div class="demo-progress">
                            <el-progress type="dashboard" :percentage="percentage" :color="colors" />
                            <p style="margin-bottom: 10px;color: rgb(0, 153, 255);font-weight: bold;">{{ light_color() }}</p>
                            <div>
                                <el-button-group>
                                    <el-button :icon="Minus" @click="decrease1" />
                                    <el-button :icon="Plus" @click="increase1" />
                                </el-button-group>
                            </div>
                        </div>
                        <p style="margin-left: 80px;margin-right: 20px;" >空调温度</p>
                        <div class="slider-demo-block">
                            <p class="temp_value">{{ temp_air_conditioning() }}</p>
                            <el-slider v-model="air_conditioning_value" :min="15" :max="35"/>
                            <div>
                                <el-button-group>
                                    <el-button :icon="Minus" @click="decrease2" />
                                    <el-button :icon="Plus" @click="increase2" />
                                </el-button-group>
                            </div>
                        </div>
                    </div>
                </el-card>

            </el-col>
            <el-col :span="12" >
                <el-card shadow="hover" class="temp_oneDay">
                    <div id="myChart" style="width: 850px;height: 322px;"></div>
                </el-card>
                <el-card shadow="hover" class="humi_oneDay">
                    <div id="myChart1" style="width: 850px;height: 322px;"></div>
                </el-card>
                <el-card shadow="hover" class="life_suggest">
                    <p class="suggest_top" >生活指南</p>
                    <el-row :gutter="10">
                        <el-col :span="6" v-for="item of suggest_list" :key="item.name" :index="item.name" style="margin-top: 10px;">
                            <el-card shadow="hover" class="one_suggest">
                                <div style="display: flex;justify-content: center;align-items: center;">
                                    <img :src="getImageUrl(item.name)" class="suggest_img"/>
                                    <div>
                                        <p class="suggest_title">{{ item.title }}</p>
                                        <p class="suggest_message">{{ item.message }}</p>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="4" >
                <div @click="handleGoods"  class="goods_ad">
                    <el-carousel indicator-position="none"  :interval="3000">
                        <el-carousel-item v-for="item in goodsList" :key="item.name" >
                            <img :src="getImageUrl1(item.name)" class="img_goods_ad"/>
                        </el-carousel-item>
                    </el-carousel>
                    <img :src="getImageUrl('goods_font')" class="goods_go"/>
                </div>
                <div class="other_ad">
                    <el-carousel indicator-position="none" :interval="3000">
                        <el-carousel-item v-for="item in adList" :key="item.name" >
                            <img :src="getImageUrl(item.name)" @click="handleAd(item.url)" class="img_other_ad"/>
                        </el-carousel-item>
                    </el-carousel>
                    <img :src="getImageUrl('advert')" class="ad_advert"/>
                </div>

            </el-col>
        </el-row> 
    </div>

    <el-dialog
    v-model="dialogVisible"
    :title="'帮助'"
    width="20%"
    :before-close="handleClose"
    >
        <div>
            <p style="text-indent: 4ch;">手动调节模式则需要您自己去设置室温和灯光，如果您选择自动调节模式，系统会对室温和灯光进行智能控制。</p>
            <div class="ok">
                <el-button type="primary" @click="handleClose">确定</el-button>
            </div>
        </div>  
    </el-dialog> 

</template>
 


<script setup>
import {ref,onMounted,getCurrentInstance,onUnmounted,watch} from 'vue'
import { Minus, Plus } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router';

const router = useRouter()
const {proxy} = getCurrentInstance()

const getCurrentDateTime1=ref('');
const getCurrentDate=ref('');
const getCurrentTime=ref('');

const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 月份是从0开始的，所以要加1
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  // 使用padStart确保月份、日期、小时、分钟和秒总是两位数
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  getCurrentDateTime1.value= `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  getCurrentDate.value= `${year}-${formattedMonth}-${formattedDay} `;
  getCurrentTime.value=`${formattedMinutes}:${formattedSeconds}`;
}

const temp=ref(0)
const humi=ref(0)
const light=ref(0)
const lifeTips=ref('')
const url_tips=ref('')
const getRealTimeEnvData=async()=>{
    const data=await proxy.$api.getRealTimeEnvData();
    temp.value=data.temp;
    humi.value=data.humi;
    light.value=data.light;
    lifeTips.value=data.lifeTip;
    url_tips.value=data.url;
    
}

const lTemp=()=>{
    return Math.min(...tempDataList.value);
}
const hTemp=()=>{
    return Math.max(...tempDataList.value);
}

const goToPage=()=>{
    window.open(url_tips.value, '_blank');//'_blank' 是 window.open() 方法中的一个特殊目标参数，用于指定在新窗口或新标签页中打开URL。
}

const suggest_list=ref([])
const getSuggestData=async()=>{
    const data=await proxy.$api.getSuggestData()
    suggest_list.value=data
}
const modes={manual:'manual',auto:'auto'}
const selectedMode=ref('manual')
const handleModeChange=(value)=>{
    if(value==modes.manual){
        selectedMode.value=modes.manual;
    }
    else{
        selectedMode.value=modes.auto;
    }
}

const percentage = ref(0)
const colors = [
  { color: 'gray', percentage: 40 }, // 白色对应20%
  { color: 'orange', percentage: 60 }, // 橙色对应40%
  { color: 'blue', percentage: 80 }, // 蓝色对应60%
  { color: 'purple', percentage: 100 }, // 紫色对应80%
  { color: 'red', percentage: 120 }  // 红色对应100%
];
const light_color=()=>{
    if(percentage.value===0) return '关灯';
    else if(percentage.value===20) return '白光';
    else if(percentage.value===40) return '橙光';
    else if(percentage.value===60) return '蓝光';
    else if(percentage.value===80) return '紫光';
    else  return '红光';
}

const increase1 = () => {
    if(selectedMode.value==='manual'){
        percentage.value += 20
        if (percentage.value > 100) {
            percentage.value = 0
        }
    }
}
const decrease1 = () => {
    if(selectedMode.value==='manual'){
        percentage.value -= 20
        if (percentage.value < 0) {
            percentage.value = 100
        }
    }
}

const air_conditioning_value=ref(15)
const temp_air_conditioning=()=>{
    if(air_conditioning_value.value===15) return 'off';
    else return `${air_conditioning_value.value}℃`;
}
const increase2 = () => {
    if(selectedMode.value==='manual'){
        air_conditioning_value.value += 1
    }
    else{

    }
}
const decrease2 = () => {
    if(selectedMode.value==='manual'){
        air_conditioning_value.value -= 1
    }
}

const dialogVisible=ref(false)
const select_help=()=>{
    dialogVisible.value=true;
}
const handleClose=()=>{
    dialogVisible.value=false;
}

const tempDataList=ref([]);
const dateList=ref([]);
const humiDataList=ref([]);
const getOneDayEnvData= async()=>{
   const data =await proxy.$api.getOneDayEnvData()
   tempDataList.value=data.temp
   humiDataList.value=data.humi
   dateList.value=data.time
}

const myChart = ref(null); // 用于存储 ECharts 实例
  // 定义初始化图表的方法
const initChart=()=> {
    const chartDom = document.getElementById('myChart');
    myChart.value = echarts.init(chartDom);
  
    const option = {
        title: {
            text: `今日温度趋势变化图`,
        },
        tooltip: {},
        legend: {
            data:['温度(℃)'],
            top: '5%', // 图例距离顶部的高度百分比
            right: '5%' // 图例距离右边的宽度百分比
        },
        xAxis: {
            data: dateList.value
        },
        yAxis: {},
        series: [{
            name: '温度(℃)',
            type: 'line',
            data: tempDataList.value,
            smooth: true,
            areaStyle: {
                color: 'rgb(255, 0, 0)', // 设置颜色为蓝色
                opacity: 0.1 // 设置不透明度为30%
            },
            markPoint: {
                data: [
                    {
                        type: 'max',
                        name: '最高峰',
                        symbolSize: 50, // 标注点的大小
                        itemStyle: {
                            color: 'red' // 标注点的颜色
                        }
                    },
                    {
                        type: 'min',
                        name: '最低峰',
                        symbolSize: 50, // 标注点的大小
                        itemStyle: {
                            color: 'red' // 标注点的颜色
                        }
                    }
                ]
            }
        }]
    };
    myChart.value.setOption(option);
}

const myChart1 = ref(null); // 用于存储 ECharts 实例
  // 定义初始化图表的方法
const initChart1=()=> {
    const chartDom = document.getElementById('myChart1');
    myChart1.value = echarts.init(chartDom);
  
    const option = {
        title: {
            text: '今日湿度趋势变化图'
        },
        tooltip: {},
        legend: {
            data:['湿度(%)'],
            top: '5%', // 图例距离顶部的高度百分比
            right: '5%' // 图例距离右边的宽度百分比
        },
        xAxis: {
            data:dateList.value
        },
        yAxis: {},
        series: [{
            name: '湿度(%)',
            type: 'line',
            data: humiDataList.value,
            smooth: true,
            areaStyle: {
                color: 'blue', // 设置颜色为蓝色
                opacity: 0.3 // 设置不透明度为30%
            },
            markPoint: {
                data: [
                    {
                        type: 'max',
                        name: '最高峰',
                        symbolSize: 50, // 标注点的大小
                        itemStyle: {
                            color: 'red' // 标注点的颜色
                        }
                    },
                    {
                        type: 'min',
                        name: '最低峰',
                        symbolSize: 50, // 标注点的大小
                        itemStyle: {
                            color: 'red' // 标注点的颜色
                        }
                    }
                ]
            }
        }], 
    };
    myChart1.value.setOption(option);
};


const goodsList=ref([])
const getGoodsListData= async()=>{
   const data =await proxy.$api.getGoodsListData()
   goodsList.value=data
}
const handleGoods=()=>{
    router.push('/goods'); 
}

const adList=ref([])
const getAdsListData= async()=>{
   const data =await proxy.$api.getAdListData()
   adList.value=data
}
const handleAd=(url)=>{
    window.open(url, '_blank');//'_blank' 是 window.open() 方法中的一个特殊目标参数，用于指定在新窗口或新标签页中打开URL。
}

const getImageUrl=(user)=>{
    return new URL(`../assets/images/home/${user}.png`,import.meta.url).href;
}
const getImageUrl1=(user)=>{
    return new URL(`../assets/images/goods/goodsList/${user}.png`,import.meta.url).href;
}


let intervalIds = [];  // 用来存储所有的定时器ID

onMounted(async () => {
    getCurrentDateTime();
    getRealTimeEnvData();
    await getOneDayEnvData(); // 确保获取当天数据后再初始化图表
    initChart();
    initChart1();
    getSuggestData();
    getGoodsListData();
    getAdsListData();
    intervalIds = [
        setInterval(getCurrentDateTime, 1000),
        setInterval(getRealTimeEnvData, 5000),
    ];
});

onUnmounted(() => {
    intervalIds.forEach(intervalId => {
        clearInterval(intervalId);
    });
});
</script>



<style scoped lang="less">

.all_container{
    width: 100%;
    height: 100%;
    overflow-x: auto; 
}
.home{
    overflow: hidden;
}
.real_time_display_area{
    width: 100%;
    height: auto;
    border: none;
    background-image: url('../assets/images/home/sky.png');
    background-size: cover; /* 背景图片覆盖整个元素，可能部分图片不会显示 */
    background-position: center; /* 背景图片居中显示 */
    background-repeat: no-repeat; /* 不重复背景图片 */
    .realTime{
        display: flex;
        color: white;
        font-size: 30px;
        margin-bottom: 20px;
        align-items: center; /* 子元素垂直居中 */
        justify-content: center;/* 子元素水平居中 */
    }
    .divice{
        border-bottom: 1px solid rgb(226, 216, 216);
        margin-bottom: 30px;

    }
    .temp_big{
        display: flex;
        justify-content: center;/* 子元素水平居中 */
        margin-bottom: 20px;
        .temp{
            color: white;
            font-size: 150px;
        }
        .temp_l_h{
            color: white;
            font-size: 25px;
        }
        .ssd_1{
            color: rgb(226, 216, 216);
            font-size: 40px;
            margin-top: 20px;
            margin-bottom: 40px;
        }
        .tg{
            color: rgb(226, 216, 216);
            margin-left: 5px;
        }
        .tg_ssd{
            color: rgb(226, 216, 216);
            margin-left: 5px;
        }
    }
    .Tips{
        display: flex;
        margin-top: 30px;
        margin-bottom: 40px;
        justify-content: center;
        .tip {
            border: none;        
            color: white; 
            font-size: 18px;   
            border-radius: 30px;    
            background-color: rgba(0, 0, 0, 0.2); /* 将背景改为半透明黑色 */
        }
        .tip:hover {
            background-color: rgba(0, 0, 0, 0.5);       /* 鼠标悬停在按钮上时，按钮不透明度加深*/

        }
    }
    .font_details{
        font-size: 20px;
        font-weight: bold;   /* 将字体加粗 */
        margin-top: 50px;
    }

}
.details_information{
    width: 100%;
    height: auto;
    border: none;
    .detail{
        background-color: white;
        border: 1px solid transparent; /* 默认边框透明 */
        text-align: center; /* 子元素水平居中对齐 */
        width: 100%;
        .detail_img{
            width: 50px;
            height: 50px;
        }
        .detail_title{
            color: rgb(124, 119, 119);
            margin-bottom: 5px;
            margin-top: 10px;
        }
        .detail_message{
            font-size: 18px;
            font-weight: bold;   /* 将字体加粗 */
        }
    }
    .selectMode{
        display: flex;
        margin-top: 20px;
        margin-bottom: 30px;
        align-items: center; /* 子元素垂直居中 */
        .font_selectMode{
            font-size: 20px;
            font-weight: bold;   
        }
        .img_help{
            width: 25px;
            height: 25px;
            margin-left: 10px;
            transition: transform 0.3s ease; /* 平滑过渡效果 */
            &:active {
                transform: scale(1.1); /* 点击时放大图片 */
            }
        }
    }
    .control{
        display: flex;
        .demo-progress{
            text-align: center; /* 子元素水平居中对齐 */
            
        } 
        .slider-demo-block{
            text-align: center;
            .temp_value{
                font-size: 60px;
                color: purple;
                margin-top: 30px;
                margin-bottom: 20px;
                font-weight: bold;
                font-family: 'Courier New', Courier, monospace;
            }
            .el-slider{
                margin-bottom: 10px;
                width: 130px;
            }
            
        } 
    }
    
}

.temp_oneDay{
    width: 100%;
    height: 322px;

}

.humi_oneDay{
    width: 100%;
    height: 322px;

}

.life_suggest{
    width: 100%;
    height: auto;
    .suggest_top{
        margin-left: 15px;
        font-size: 18px;
        font-weight: bold;
    }
    .one_suggest{
        display: flex;
        width: 100%;
        height: 80px;
        border-radius:20px ;
        background-color: rgb(248, 248, 248);
        justify-content: center;
        align-content: center;
        .suggest_img{
            width: 55px;
            height: 55px;
            margin-right: 15px;
        }
        .suggest_title{
            font-weight: bold;
            font-size: 17px;
        }
        .suggest_message{
            font-size: 15px;
            color: gray;
        }
    }
    
    
}

.goods_ad{
    margin-bottom: 74px;
    margin-left: 10px;
    background-color: white;
    border: 1px solid rgb(224, 213, 213);  
    transition: transform 0.3s ease;
        &:active {
            border: 2px solid orange; 
        }
    .img_goods_ad{
        width: 100%;
        height: 100%;
    }
    .goods_go{
        margin: 20px 10px 20px 10px;//上右下左
        width: 90%;
        height: 100%;
        
    }
}

.other_ad{
    height: 400px;
    margin-left: 10px;
    background-color: white;
    border: 1px solid orange;  
    border: 1px solid rgb(224, 213, 213);  
        &:active {
            border: 2px solid orange; 
        }
    .img_other_ad{
        width: 100%;
        height: 100%;
    }
    .ad_advert{
        margin: 10px 10px 20px 10px;//上右下左
        width: 90%;
        height: 70px;
    }
}

.ok{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

</style>
  
  
