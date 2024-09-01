<template>
    <div class="PageHead" >
        <div class="logo_1"/>
        <div class="search">
            <img :src="getImageUrl('放大镜')" class="fdj"/>
            <input type="text" v-model="infrmation" class="ss" placeholder="请输入您想了解的宝贝" @keyup.enter="handleGo">
            <img :src="getImageUrl(image_xj)" class="xj" @click="handleXj"/>
        </div>
        <div class="logo_2" @click.enter="handleGo" />
    </div>  
    <div class="lunbotu">
        <el-carousel :interval="3000" type="card" height="200px">
            <el-carousel-item class="carousel" v-for="item in imageList" :key="item.name" :index="item.name">
                <img :src="getImageUrl(item.name)"/>
            </el-carousel-item>
        </el-carousel>
    </div>
    <div class="sale_hot">
        <img :src="getImageUrl('hot')" class="hot" />
        <img :src="getImageUrl('超值限时抢')" class="sale" />
    </div>
    <div class="goods_list">
        <el-row :gutter="1">
            <el-col :span="4" v-for="item in goodsList" :key="item.name" :index="item.name">
                <el-card shadow="hover">
                    <img :src="getImageUrl1(item.name)" class="hot_sale_goods">
                    <p class="message">{{item.message}}</p>
                    <div class="cost1">
                        <p class="￥">￥</p>
                        <p class="cost">{{item.cost}}</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
    <div class="dibu">
        <img :src="getImageUrl('表情')" class="biaoqing">
        <p class="thanks">感谢您的支持，后续我们会推出更多好物!!!</p>
    </div>
    <el-dialog
    v-model="dialogVisible"
    :title="'按图片查找'"
    width="35%"
    :before-close="handleClose"
    @keyup.enter="handleGo"
    >
        <div>
            <el-upload
                v-model:file-list="fileList"
                class="upload-demo"
                drag
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                list-type="picture"
                multiple
                >
                <p>可将图片拖拽至此处上传</p>
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    Drop file here or 
                    <em>click to upload</em>
                    <p>jpg/png files with a size less than 500kb</p>
                </div>
            </el-upload>
        </div>
        <div>
            <el-button @click="handleCancel">取消</el-button>
            <el-button @click="handleGo">查找</el-button>
        </div>
        
    </el-dialog> 
</template>
 
<script lang="ts" setup>
import {ref,getCurrentInstance,onMounted} from 'vue'
import  { UploadProps, UploadUserFile } from 'element-plus'
import { useRouter } from 'vue-router';

const router = useRouter()
const {proxy} = getCurrentInstance()
const fileList = ref<UploadUserFile[]>([])
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {}
const handlePreview: UploadProps['onPreview'] = (file) => {}

const infrmation=ref("")
const image_xj=ref('相机')
const dialogVisible = ref(false)
const handleClose=()=>{
    dialogVisible.value=false;
    image_xj.value='相机'
    fileList.value=[]
}
const handleXj=()=>{
    dialogVisible.value=true;
    image_xj.value='相机1' 

}
const handleCancel=()=>{
    dialogVisible.value=false;
    image_xj.value='相机'
    fileList.value=[]
}
const handleGo=()=>{
    dialogVisible.value=false;
    image_xj.value='相机'
    fileList.value=[]
    router.push('/message')
}
const imageList =ref([])
const goodsList=ref([])
const getGoodsListData= async()=>{
   const data =await proxy.$api.getGoodsListData()
   goodsList.value=data
}
const getImageListData= async()=>{
   const data =await proxy.$api.getImageListData()
   imageList.value=data
}

const getImageUrl=(user)=>{
    return new URL(`../assets/images/goods/${user}.png`,import.meta.url).href;
}
const getImageUrl1=(user)=>{
    return new URL(`../assets/images/goods/goodsList/${user}.png`,import.meta.url).href;
}
onMounted(()=>{
    getGoodsListData()
    getImageListData()
})

</script>

<style scoped lang="less" >
.PageHead {
    display: flex; /* 使用flex布局 */
    align-items: center; /* 子元素垂直居中 */  
    width: 100%;   
    .logo_1 {
        background-image: url("../assets/images/goods/connectLife.png");
        width: 300px; /* 设置固定宽度 */
        height: 35px; /* 设置固定高度 */
        background-size: cover; /* 背景图片覆盖整个元素，保持比例 */
        margin-left: 100px;
    }
    .search {
        display: flex; /* 使用flex布局 */
        align-items: center; /* 子元素垂直居中 */
        background-image: url("../assets/images/goods/searchFrame.png");
        width: 600px; /* 设置固定宽度 */
        height: 60px; /* 设置固定高度 */
        background-size: 100% 100%; /* 背景图片覆盖整个元素，不保持比例 */
        margin-left: 180px; /* 设置左边距，使.logo和.search之间有间距 */
        .fdj{
            width: 35px; /* 设置固定宽度 */
            height: 35px; /* 设置固定高度 */
            margin-left: 20px;
        }
        .ss{
            width: 450px; /* 设置固定宽度 */
            height: 55px; /* 设置固定高度 */
            font-size: 20px;
            margin-left: 10px; 
            border: none; /* 移除边框 */
            caret-color: blue; /* 设置光标颜色为蓝色 */
            background-color: transparent; /* 设置输入框背景为透明 */
            outline: none; /* 移除聚焦时的外轮廓线 */
        }
        .xj{
            width: 40px; /* 设置固定宽度 */
            height: 40px; /* 设置固定高度 */
            margin-left: 15px;
        }  
    }
    .logo_2 {
        background-image: url("../assets/images/goods/go.png");
        width: 70px; /* 设置固定宽度 */
        height: 70px; /* 设置固定高度 */
        background-size: cover; /* 背景图片覆盖整个元素，保持比例 */
        margin-left: 20px; /* 设置左边距，使.logo和.search之间有间距 */
        transition: transform 0.3s ease; /* 平滑过渡效果 */
        &:active {
            transform: scale(1.1); /* 点击时放大图片 */
        }
    }
}

.lunbotu{
    margin-top: 30px;
    .carousel {
    display: flex; // 使用flex布局
    justify-content: center; // 水平居中
    align-items: center; // 垂直居中
    width: 50%; // 宽度100%
    height: 100%; // 高度100%
    }
}
.sale_hot{
    width: auto;
    height: 55px;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    .hot{
        width: 50px;
        height: 50px;
        
    }
    .sale{
        width: 100px;
        height: 50px;
    }
}
.goods_list{
    .el-col {
        margin-bottom: 5px;
        .hot_sale_goods{
            width: 100%;
            height: 240px;
        }
        .message{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; /* 只显示两行 */
            text-overflow: ellipsis; /* 显示省略号 */
            overflow: hidden;
            margin-top: 10px;
        }
        .cost1{
            display: flex;
            .￥{
                margin-top: 35px;
                font-size: 18px;
                color: rgb(255, 30, 0);
            }
            .cost{
                margin-top: 30px;
                font-size: 25px;
                color: rgb(255, 30, 0);
            }
            
        }
        
    }
}
.el-card {
    border-radius: 20px;
    background-color: transparent;
    border: 1px solid transparent; /* 默认边框透明 */
    transition: border-color 0.3s; /* 边框颜色变化的过渡效果 */
}
.el-card:hover {
    border-color: orange; /* 鼠标悬停时边框变为橙色 */
    background-color: white;
}
.dibu{
    display: flex;
    align-items: center; /* 子元素垂直居中 */  
    justify-content: center; // 水平居中
    width: 100%; 
    margin-top: 200px;
    margin-bottom: 100px;
    .biaoqing{
        width: 80px;
        height: 80px;
    }
    .thanks{
        font-size: 30px;
        color: #707070;
        margin-left: 20px;
    }
    
}
</style>
  
  
