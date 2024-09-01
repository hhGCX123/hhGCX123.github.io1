import {createRouter,createWebHashHistory} from "vue-router"


//制定路由规则
const routes=[
    {
        path:'/',
        name:'main',
        component:()=>import('@/views/Main.vue'),
        redirect:'/home',/* 默认导航到home */
        children:[
            {
                path:'/home',
                name:'home', 
                component:()=>import('@/views/Home.vue')
            },
            {
                path:'/user',
                name:'user', 
                component:()=>import('@/views/User.vue')
            },
            {
                path:'/view',
                name:'view', 
                component:()=>import('@/views/View.vue')
            },
            {
                path:'/goods',
                name:'goods', 
                component:()=>import('@/views/Goods.vue')
            },
            {
                path:'/i',
                name:'i', 
                component:()=>import('@/views/I.vue')
            },
            {
                path:'/setting',
                name:'setting', 
                component:()=>import('@/views/Setting.vue')
            },
            {
                path:'/message',
                name:'message', 
                component:()=>import('@/views/Message.vue')
            }
        ]
    },
    {
        path:'/login',
        name:'login', 
        component:()=>import('@/views/Login.vue'),
    },
    {
        path: '/:pathMatch(.*)*', // 使用正则表达式匹配所有路径
        name: '404',
        component: () => import('@/views/404.vue')
    }

];

const router=createRouter({
    //设置路由的模式
    history:createWebHashHistory(),
    routes,
    
})


export default router