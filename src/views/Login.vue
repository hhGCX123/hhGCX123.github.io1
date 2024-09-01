<template>
    <title>智慧生活平台</title>
    <div class="body-login" @keyup.enter="handleLogin" tabindex="0">
        <el-row>
            <el-col :span="12">
                <div  style="margin: 200px 200px;text-align: center;">
                    <h1 class="title">智慧生活平台</h1>
                    <el-form :model="loginForm" class="login-container" @keyup.enter="handleLogin" tabindex="0">
                        <h1>欢迎登录</h1>
                        <el-form-item >
                            <el-input type="input" placeholder="请输入用户名或手机号码" v-model="loginForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
                        </el-form-item>
                        <el-form-item >
                            <el-button type="primary" @click="handleLogin">登录</el-button>
                        </el-form-item>
                        <el-row>
                            <el-col :span="12" class="links-container">
                                <el-link class="link-left" href="#/forget" type="primary">忘记密码</el-link>
                            </el-col>
                            <el-col :span="12" class="links-container">
                                <el-link  href="#/register" type="primary" >新用户？</el-link>
                            </el-col>
                        </el-row>                
                    </el-form>
                </div>
            </el-col>
            <el-col :span="12">
                
            </el-col>
        </el-row>   
    </div>
</template>
 


<script setup>
import { reactive ,getCurrentInstance,ref} from 'vue'
import { useRouter } from 'vue-router'
import{ userAllDataStore } from '@/stores'
import {ElMessage,ElMessageBox} from 'element-plus'

const store=userAllDataStore()
const router = useRouter()
const {proxy} =getCurrentInstance()

//创建对象，在调用方法时传参
const loginForm = reactive({
    userName: '',
    password: ''
})
const power=reactive({
    userPower:''
})

const handleLogin=async()=>{
    const data=await proxy.$api.getLoginInformationData(loginForm)
    console.log(data)
    power.userPower=data.power
    if(data.allow){  //存在该用户,且密码正确
        const res=await proxy.$api.getMenu(power)  //必须传递一个object对象
        //拿到菜单以后，将菜单传入pinia中，进行跨组件传值，CommonAside组件从pinia中取值进行菜单渲染
        store.updateMenuList(res.menuList)
        store.state.power=res.power
        store.state.loginTag=!store.state.loginTag
        store.state.userName=loginForm.userName
        const reset = [{
            path: '/home',
            name: 'home',
            label: '首页',
            icon: 'house',
        }]
        store.state.tags=reset
        router.push('/home')
    }
    else{
        ElMessage({
            showClose:true,
            message:'请输入正确的用户名或密码',
            type:'error'
        })
        loginForm.password='';
    }
}

</script>

<style scoped lang="less">
.body-login{
    width: 100%;
    height: 100%;
    background-image: url("../assets/images/LoginBackground.png");
    background-size: cover; /* 使用 cover 来确保图片覆盖整个容器而不失真 */
    overflow: hidden;
}
.title{
    margin-bottom: 50px;
    font-size: 60px;
    font-weight: bold;
    color: rgb(132, 132, 255);
}
.login-container{
    width: 600px;
    height: 400px;
    background-image: url("../assets/images/background.png");
    background-size: cover; /* 使用 cover 来确保图片覆盖整个容器而不失真 */
    background-repeat: no-repeat; /* 确保图片不重复 */
    border: none;
    border-radius: 25px;
    padding: 35px 35px 35px 35px;
    box-shadow: 0 0 50px #cacaca;
    h1{
        text-align: center;
        margin-bottom: 20px;
        color: white;
        font-size: 30px;
    }
    :deep(.el-form-item__content){
        justify-content: center;
        align-content: center;

    }
    .el-input{
        width: 450px;
        height: 50px;
        margin-top: 10px;
        font-size: 25px;
        background-color: transparent;
        
    }
    .el-button{
        margin-top :20px;
        width: 100px; /* 设置按钮的宽度 */
        height: 50px; /* 设置按钮的高度 */
        padding: 10px 20px; /* 设置按钮的内边距 */
        font-size: 25px; /* 可选，根据需要调整按钮文字大小 */
    }
    .links-container {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end; 
        align-items: flex-end; 
        .el-link{
            
            font-size: 25px;
        }

        .link-left {
            margin-right: auto; 
        }
    } 

}
</style>
  
  
