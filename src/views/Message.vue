<template>
    <div id="myChart" style="width: 600px; height: 400px;"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import * as echarts from 'echarts';
  
const myChart = ref(null); // 用于存储 ECharts 实例
  
  // 定义初始化图表的方法
function initChart() {
    const chartDom = document.getElementById('myChart');
    myChart.value = echarts.init(chartDom);
  
    const option = {
      title: {
        text: 'ECharts 折线图示例'
      },
      tooltip: {},
      legend: {
        data:['销量']
      },
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'line',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };
  
    myChart.value.setOption(option);
  }
  
  // 在 onMounted 钩子中调用初始化图表的方法
  onMounted(() => {
    initChart();
  });
  </script>


<style scoped lang="less">

</style>
  
  
