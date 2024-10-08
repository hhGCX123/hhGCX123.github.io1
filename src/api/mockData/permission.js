import Mock from 'mockjs'
export default{
    getMenu:config=>{
        const {userPower} =JSON.parse(config.body)
        //先判断用户是否存在
        //判断装好和密码是否对应
        //menuList用于后面做权限分配，也就是用户可以展示的菜单
        if(userPower==='root'){
            return{
                code:200,
                data:{
                    power:'root',
                    menuList:[
                        {
                            path:'/home',
                            name:'home',
                            label:'首页',
                            icon:'house',
                            url:'Home'
                        },
                        {
                            path:'/user',
                            name:'user',
                            label:'用户',
                            icon:'user',
                            url:'User'
                        },
                        {
                            path:'/view',
                            name:'view',
                            label:'发现',
                            icon:'view',
                            url:'View'
                        },
                        {
                            path:'/goods',
                            name:'goods',
                            label:'商城',
                            icon:'goods',
                            url:'Goods'
                        },
                        {
                            path:'/message',
                            name:'message',
                            label:'消息',
                            icon:'chat-dot-round',
                            url:'Message'
                        },
                        {
                            path:'other',
                            label:'其他',
                            icon:'position',
                            children:[
                                {
                                path:'/i',
                                name:'i',
                                label:'我的',
                                icon:'user',
                                url:'I'
                                },
                                {
                                path:'/setting',
                                name:'setting',    
                                label:'设置',
                                icon:'setting',
                                url:'Setting'
                                },
                            ]
                        }
                    ]
                }
            }
        }
        else {
            return{
                code:200,
                data:{
                    power:'ordinary',
                    menuList:[
                        {
                            path:'/home',
                            name:'home',
                            label:'首页',
                            icon:'house',
                            url:'Home'
                        },
                        {
                            path:'/view',
                            name:'view',
                            label:'发现',
                            icon:'view',
                            url:'View'
                        },
                        {
                            path:'/goods',
                            name:'goods',
                            label:'商城',
                            icon:'goods',
                            url:'Goods'
                        },
                        {
                            path:'/message',
                            name:'message',
                            label:'消息',
                            icon:'chat-dot-round',
                            url:'Message'
                        },
                        {
                            path:'other',
                            label:'其他',
                            icon:'position',
                            children:[
                                {
                                path:'/i',
                                name:'i',
                                label:'我的',
                                icon:'user',
                                url:'I'
                                },
                                {
                                path:'/setting',
                                name:'setting',    
                                label:'设置',
                                icon:'setting',
                                url:'Setting'
                                },
                            ]
                        }
                    ]
                }
            }
        }
    }
}