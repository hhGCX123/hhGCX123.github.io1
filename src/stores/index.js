import { createPinia,defineStore } from 'pinia';
import { ref } from 'vue';
import piniaPluginPersist from 'pinia-plugin-persist';


function initState() {
    return {
        isCollapse: false,
        tags: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'house',
            },
        ],
        currentMenu: null,
        menuList: [],
        userName: '',
        power: '',
        loginTag: false,
    };
}

export const userAllDataStore = defineStore('AllData', () => {
    // ref state属性
    const state = ref(initState());

    // computed getters
    // function actions

    function selectMenu(val) {
        if (val.name === 'home') {
            state.value.currentMenu = null;
        } else {
            let index = state.value.tags.findIndex(item => item.name === val.name);
            if (index === -1) {
                state.value.tags.push(val);
            }
        }
    }

    function updateTags(tag) {
        let index = state.value.tags.findIndex(item => item.name === tag.name);
        if (index !== -1) {
            state.value.tags.splice(index, 1);
        }
    }

    function updateMenuList(val1) {
        state.value.menuList = val1;
    }

    function clean() {
        // 重置state为初始状态
        state.value = initState();
    }

    return {
        state,
        selectMenu,
        updateTags,
        updateMenuList,
        clean,
    };
}, {
    // 使用pinia-plugin-persist插件配置持久化，当页面刷新时，pinia中state的值不会重置
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'AllData',
                storage: localStorage, // 使用localStorage存储
                paths: ['state'], //保存state中的所有数据
            },
        ],
    },
});

// 使用pinia-plugin-persist插件
const pinia = createPinia();
pinia.use(piniaPluginPersist);
