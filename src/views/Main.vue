<template>
    <title>智慧生活</title>
    <div class="common-layout">
        <el-container class="lay-container">
            <!-- 自定义左侧的组件 -->
            <common-aside/>
            <el-container>
                <el-header>
                    <common-header/>
                </el-header>
                <el-main class="right-main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  
  <script setup>
  import CommonAside from '@/components/CommonAside.vue';
  import CommonHeader from '@/components/CommonHeader.vue';
  
  </script>
  
  <style scope lang="less">
  .common-layout,.lay-container{
    width: 100%;
    height: 100%;
  }
  </style>