import { createApp,ref } from 'vue'
import App from './App.vue'
import "@/assets/less/index.less"
import router from "./router/index.js"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from "pinia"
import piniaPluginPersist from 'pinia-plugin-persist';
import "@/api/mock.js"
import api from '@/api/api'
import { userAllDataStore } from "@/stores"

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersist);//pinia持久化存储

app.config.globalProperties.$api=api
app.use(ElementPlus)
app.use(pinia)
app.use(router)

//注册ElementPlus图标到vue应用实例app中
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

//未登录之前，无法访问登录后的服务,只可以访问找回密码和注册用户服务
router.beforeEach((to, from, next) => {
  const store = userAllDataStore()
  if(to.path === "/forget"||to.path === "/register"||to.path === "/login"){
    next();
  }
  else if(!store.state.loginTag)  {         
    next({ name: "login" });
  } else {
    next();
  }

})

//只有管理员才可以访问/user界面
router.beforeEach((to, from, next) => {
  const store = userAllDataStore()
  if (to.path === "/user") {
    if (store.state.power !== 'root') {
      // 如果是管理员，允许访问
      next({ name:"404" }); 
    } else {
      next();
    }
  }else{
    next();
  }
})

app.mount('#app')
