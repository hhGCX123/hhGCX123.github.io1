<template>
    <div class="all">
        <div class="user-header">
            <el-button type="primary" @click="handleAdd">新增</el-button>
            <el-form :inline="true" :model="formInline">  <!-- 横向布局 -->
                <el-form-item >
                    <el-select
                        v-model="defalutxaila"
                        clearable
                        placeholder="Select"
                        style="width: 100px"
                        @change="handleXiaLaChange"
                        >
                        <el-option
                            v-for="item in xialaSelectList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item >
                    <el-input placeholder="input" v-model="formInline.keyWord"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table">
            <el-table :data="tableData" style="widows: 100%;">
                <el-table-column
                    v-for="item of tableLabel"
                    :key="item.prop"
                    :width="item.width?item.width:125"
                    :prop="item.prop"
                    :label="item.label"  
                />
                <el-table-column fixed="right" label="Operations" min-width="120">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
            <el-pagination 
                class="pager"
                background 
                layout="prev, pager, next" 
                :total="config.total" 
                size="small"
                :default-page-size="15"
                @current-change="handleChange"
            />
        </div>
    </div>

    <el-dialog
    v-model="dialogVisible"
    :title="action=='add'?'新增用户':'编辑用户'"
    width="35%"
    :before-close="handleClose"
    >
        <!-- 需要注意的是设置了：Inline="true",
        会对el-select的样式造成影响，我们通给他设置一个class=select-clearn
        在css进行处理 -->
        <el-form :inline="true" :model="formUser" :rules="rules" ref="userForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="formUser.userName" placeholder="输入用户名"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="密码" prop="password">
                        <div style="display: flex;">
                            <el-input :type="pstype" v-model.number="formUser.password" placeholder="输入密码"/>
                            <img :src="getImageUrl(image_eyes)" @click="handle_eyes" style="width: 20px;height: 20px;margin-left: 10px;margin-top: 5px;"/>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item  label="权限" prop="power">
                        <el-input v-model="formUser.power" placeholder="设置权限"/>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item  label="昵称" prop="userNickName">
                        <el-input v-model="formUser.userNickName" placeholder="设置昵称"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item class="select-clearn" label="性别" prop="sex">
                        <el-select v-model="formUser.sex" placeholder="请选择">
                            <el-option label="男" value="男"/>
                            <el-option label="女" value="女"/>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item  label="出生日期" prop="birth">
                        <el-date-picker
                        v-model="formUser.birth"
                        type="date"
                        placeholder="请输入"
                        style="width: 100%;"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="产品" prop="equipment">
                        <el-input v-model="formUser.equipment" placeholder="请输入产品" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item  label="电话" prop="phoneNumber">
                        <el-input v-model="formUser.phoneNumber" placeholder="输入电话号码"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>  
                <el-form-item label="地址" prop="address">
                    <el-input v-model="formUser.address" placeholder="请输入地址" />
                </el-form-item>
            </el-row>
            <el-row style="justify-content: flex-end">
                <el-form-item>
                    <el-button type="primary" @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="oneSubmit">确定</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script setup>

import {ref,getCurrentInstance,onMounted,reactive,nextTick} from 'vue'
import {ElMessage,ElMessageBox} from 'element-plus'
import { valid } from 'mockjs';


const {proxy}=getCurrentInstance()

const tableData =ref([])

//表单初始化数据
const getUserNameData=async()=>{
    const data=await proxy.$api.getUserNameData(config)
    tableData.value=data.list
    console.log()
    config.total=data.count
}
const getUserNickNameData=async()=>{
    const data=await proxy.$api.getUserNickNameData(config1)
    tableData.value=data.list
    config.total=data.count
}
const getPowerData=async()=>{
    const data=await proxy.$api.getPowerData(config2)
    tableData.value=data.list
    config.total=data.count
}
const getSexData=async()=>{
    const data=await proxy.$api.getSexData(config3)
    tableData.value=data.list
    config.total=data.count
}
const getBirthData=async()=>{
    const data=await proxy.$api.getBirthData(config4)
    tableData.value=data.list
    config.total=data.count
}
const getAddressData=async()=>{
    const data=await proxy.$api.getAddressData(config5)
    tableData.value=data.list
    config.total=data.count
}
const getPhoneNumberData=async()=>{
    const data=await proxy.$api.getPhoneNumberData(config6)
    tableData.value=data.list
    config.total=data.count
}
const getEquipmentData=async()=>{
    const data=await proxy.$api.getEquipmentData(config7)
    tableData.value=data.list
    config.total=data.count
}

//表单内容定义
const tableLabel=reactive([
    {
        prop:'userName',
        label:'用户名',
        width:200
    },
    {
        prop:'userNickName',
        label:'昵称',
        width:200
    },
    {
        prop:'power',
        label:'权限'
    },
    {
        prop:'sex',
        label:'性别',
    },
    {
        prop:'birth',
        label:'生日',
        width:200
    },
    {
        prop:'address',
        label:'地址',
        width:400
    },
    {
        prop:'phoneNumber',
        label:'手机号码',
        width:200
    },
    {
        prop:'equipment',
        label:'产品',
    },
    
])

//搜索框中的内容
const formInline=reactive({
    keyWord:''
})

//保存查找方式和页脚，以及查找到的条数
const config=reactive({
    userName:'',
    total:0,
    page:1
})
const config1=reactive({
    userNickName:'',
    total:0,
    page:1
})
const config2=reactive({
    power:'',
    total:0,
    page:1
})
const config3=reactive({
    sex:'',
    total:0,
    page:1
})
const config4=reactive({
    birth:'',
    total:0,
    page:1
})
const config5=reactive({
    address:'',
    total:0,
    page:1
})
const config6=reactive({
    phoneNumber:'',
    total:0,
    page:1
})
const config7=reactive({
    equipment:'',
    total:0,
    page:1
})

//下拉框初始化
const defalutxaila = ref('userName')
//下拉框选项
const xialaSelectList = [
  {
    value: 'userName',
    label: '用户名',
  },
  {
    value: 'userNickName',
    label: '昵称',
  },
  {
    value: 'power',
    label: '权限',
  },
  {
    value: 'sex',
    label: '性别',
  },
  {
    value: 'birth',
    label: '生日',
  },
  {
    value: 'address',
    label: '地址',
  },
  {
    value: 'phoneNumber',
    label: '手机号码',
  },
  {
    value: 'equipment',
    label: '产品',
  },
]
const status=ref('userName')
const handleXiaLaChange=(value)=>{
    status.value=value
}

//各个属性的查找
const handleSearch=()=>{
    if(status.value==='userName'){
        config.userName=formInline.keyWord
        getUserNameData()
    }
    else if(status.value==='userNickName'){
        config1.userNickName=formInline.keyWord
        getUserNickNameData()
    }
    else if(status.value==='power'){
        config2.power=formInline.keyWord
        getPowerData()
    }
    else if(status.value==='sex'){
        config3.sex=formInline.keyWord
        getSexData()
    }
    else if(status.value==='birth'){
        config4.birth=formInline.keyWord
        getBirthData()
    }
    else if(status.value==='address'){
        config5.address=formInline.keyWord
        getAddressData()
    }
    else if(status.value==='phoneNumber'){
        config6.phoneNumber=formInline.keyWord
        getPhoneNumberData()
    }
    else if(status.value==='equipment'){
        config7.equipment=formInline.keyWord
        getEquipmentData()
    }
    else{
        ElMessage({
            showClose:true,
            message:'请选择要查找的类型',
            type:'warning'
        })
    }
    
}

//改变页脚时或进行其他操作时页面能保持渲染
const handleChange=(page)=>{
    if(status.value==='userName'){
        config.page=page;
        getUserNameData()
    }
    else if(status.value==='userNickName'){
        config1.page=page;
        getUserNickNameData()
    }
    else if(status.value==='power'){
        config2.page=page;
        getPowerData()
    }
    else if(status.value==='sex'){
        config3.page=page;
        getSexData()
    }
    else if(status.value==='birth'){
        config4.page=page;
        getBirthData()
    }
    else if(status.value==='address'){
        config5.page=page;
        getAddressData()
    }
    else if(status.value==='phoneNumber'){
        config6.page=page;
        getPhoneNumberData()
    }
    else if(status.value==='equipment'){
        config7.page=page;
        getEquipmentData()
    }
    else{
        config.page=page;
        getUserNameData();
    } 
}

const handleDelete=(val)=>{
    ElMessageBox.confirm("你确定要删除吗？").then(async()=>{
        await proxy.$api.deleteUser({id:val.id})
        ElMessage({
            showClose:true,
            message:'删除成功',
            type:'success'
        })
        handleSearch();
    })
}
const action=ref('add')
const dialogVisible=ref(false)
const formUser=reactive({

})

const pstype=ref('password')
const image_eyes=ref('eyes')
const handle_eyes=()=>{
    if(image_eyes.value==='eyes'){
        image_eyes.value='eyes1'
        pstype.value='primary'
    }else{
        image_eyes.value='eyes'
        pstype.value='password'
    }
}
const getImageUrl=(user)=>{
    return new URL(`../assets/images/${user}.png`,import.meta.url).href;
}

const rules=reactive({
    userName:[{required:true,message:"用户名是必填项",trigger:"blur"}],
    password:[{required:true,message:"密码是必填项",trigger:"blur"}],
    power:[{required:true,message:"权限是必填项",trigger:"blur"}],
    userNickName:[{required:true,message:"昵称是必填项",trigger:"blur"}],
    sex:[{required:true,message:"性别是必填项",trigger:"change"}],
    birth:[{required:true,message:"出生日期是必填项"}],
    address:[{required:true,message:"地址是必填项"}],
    phoneNumber:[{required:true,message:"电话号码是必填项"}],
    equipment:[{required:true,message:"使用产品是必填项"}]
})
const handleClose=()=>{
    //获取表单重置表单
    dialogVisible.value=false;
}
const handleCancel=()=>{
    dialogVisible.value=false;
}
const handleAdd=()=>{
    dialogVisible.value=true;
    action.value='add';
}
const timeFormat=(time)=>{
    var time=new Date(time)
    var year=time.getFullYear()
    var month=time.getMonth()+1
    var date=time.getDate()
    function add(m){
        return m<10 ? "0" + m : m
    }
    return year+"-"+add(month)+"-"+add(date)
}
const oneSubmit = () => {
    // 先校验
    proxy.$refs['userForm'].validate(async (valid) => {
        if (valid) {
            formUser.birth = /^\d{4}-\d{2}-\d{2}$/.test(formUser.birth) ? formUser.birth : timeFormat(formUser.birth);
            if (action.value === 'add') {
                const res = await proxy.$api.addUser(formUser);
                if (res) {
                    dialogVisible.value = false;
                    proxy.$refs['userForm'].resetFields();
                    config.page=1 //跳转到第一页，可以看见新增用户
                    getUserNameData();
                    ElMessage({
                        showClose: true,
                        message: '新建成功',
                        type: 'success',
                    });
                }
            } else {
                const res = await proxy.$api.editUser(formUser);
                if (res) {
                    dialogVisible.value = false;
                    proxy.$refs['userForm'].resetFields();
                    handleSearch();
                    ElMessage({
                        showClose: true,
                        message: '编辑成功',
                        type: 'success',
                        
                    });
                }
            }
        } else {
            ElMessage({
                showClose: true,
                message: '请输入正确的内容',
                type: 'error',
            });
        }
    });
};
const handleEdit = (val) => {
  action.value = 'edit';
  dialogVisible.value = true;
  // 等待 DOM 更新后修改 formUser 状态
  nextTick(() => {
    Object.assign(formUser, { ...val, sex: '' + val.sex });
  });
  
};

onMounted(()=>{
    getUserNameData();
})

</script>

<style lang="less" scoped>

.all{
    overflow-y: auto; 
    overflow-x: auto; 
    .user-header{
    display: flex;  //水平排列，对齐
    justify-content: space-between;//两端对齐
    }
}
.table{
    position: relative;
    height: 720px;
    .pager{
        position: absolute;
        bottom: 30px;
        right: 10px;
    }
    .el-table{
        width: 100%;
        height: 700px;
    }
    
}
.select-clearn{
    display: flex;
    width: 77%;
}

</style>
