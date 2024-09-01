<template>
    <el-aside :width="widthStatus">
        <el-menu
            background-color="#545c64"
            text-color="#fff"
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-active="activeMenu"
      >
        <el-menu-item 
        v-for="item of noChildren"
        :key="item.path"
        :index="item.path"
        @click="handleMenu(item)"
        >
          <component class="icons" :is="item.icon"></component>
          <span>{{item.label}}</span>
        </el-menu-item>
        <el-sub-menu 
            v-for="item of hasChildren"
            :key="item.path"
            :index="item.path"
        >
          <template #title>
            <component class="icons" :is="item.icon"></component>
            <span>{{item.label}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
                v-for="subItem of item.children"
                :key="subItem.path" 
                :index="subItem.path"
                @click="handleMenu(subItem)"
            >
                <component class="icons" :is="subItem.icon"></component>
                <span>{{subItem.label}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
</template>

<script setup>
import{ref,computed} from 'vue'
import{userAllDataStore} from '@/stores'
import { useRouter,useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const store=userAllDataStore()
const tags=computed(()=>store.state)
const handleMenu=(item)=>{
    /* if() */
    router.push(item.path);
    store.selectMenu(item);
}
const activeMenu=computed(()=>route.path)
const list=computed(()=>store.state.menuList)
const noChildren=computed(()=>list.value.filter(item=>!item.children))
const hasChildren=computed(()=>list.value.filter(item=>item.children))
const isCollapse=computed(()=>store.state.isCollapse)
//width
const widthStatus=computed(()=>store.state.isCollapse?'60px':'150px')//const声明的变量必须是响应式数据时，其变量的值才能变化。如果不是响应式数据，其变量的值不会改变

</script>

<style lang="less" scoped>/* 使用less语言编写 */
.icons{
    width: 18px;
    height: 18px;
    margin-right: 10px;/* 右侧外边距 */
}
.el-menu{
    border-right: none;
    h3{
        line-height: 48px;/* 行高 */
        color: #fff;
        text-align: center;
    }
}
.el-aside{
    height: 100%;
    background-color: #545c64;
}
</style>