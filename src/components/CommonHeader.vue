<template>
    <div class="header">
        <div class="l-content">
            <img :src="getImageUrl('菜单')" class="user0" @click.stop="handleCollapse">
            <el-tag
                v-for="(tag,index) of tags"
                :key="tag.name"
                :closable="tag.name!=='home'"
                :effect="route.name===tag.name ? 'dark' : 'plain'"
                class="tags"
                @click="handleMenu(tag)"
                @close="handleClose(tag,index)"
                
            >
            {{ tag.label }}
            </el-tag>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImageUrl('hjr')" class="user1">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="personalHandle">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="exitHandle">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

</template>

<script setup>
import{ref,computed} from 'vue'
import{userAllDataStore} from '@/stores'
import { useRouter,useRoute } from 'vue-router';
const getImageUrl = (user) => {
  return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};
const store=userAllDataStore()
const handleCollapse=()=>{
    store.state.isCollapse=!store.state.isCollapse

}
const route = useRoute()
const tags=computed(()=>store.state.tags)
const handleMenu = (tag) => {
    router.push(tag.name);
    store.selectMenu(tag);
    
};
const handleClose=(tag,index)=>{
    //通过pinia来管理tag
    store.updateTags(tag);
    //如果点击的关闭tag不是对应的当前界面
    if(tag.name!==route.name) return

    if(index===store.state.tags.length){
        store.selectMenu(tags.value[index-1]);
        router.push(tags.value[index-1].name);
    }else{
        store.selectMenu(tags.value[index]);
        router.push(tags.value[index].name);
    }

}
const router = useRouter()
const exitHandle=()=>{
    store.clean();
    router.push('/login');


}
const personalHandle=()=>{
    router.push('/i');
}
</script>

<style lang="less" scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%; 
    background-color: #fff;
}
icons{
    width: 20px;
    height: 20px;
}
.l-content{
    display:flex;
    align-items: center;
    .user0{
        margin-right: 40px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        transition: transform 0.3s ease; /* 平滑过渡效果 */
        &:active {
            transform: scale(1.1); /* 点击时放大图片 */
        }
    }
    .tags{
        margin-right: 10px;
        transition: transform 0.3s ease;
        &:active {
            transform: scale(1.1);
        }
    }
}
.r-content{
    .user1{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

</style>