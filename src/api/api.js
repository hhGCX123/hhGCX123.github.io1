/* 整个项目api的统一管理 */
import request from "./request";

//请求首页左侧的表格的数据
//如果是真实的请求，只需要修改config/index的baseApi,以及将本文件的mock请求置为true
export default{
    getTableData(){
        return request({
            url:"/i/getTableData",
            method:"get",
            mock:true,
        });
    },
    /* getTableData(){
        return request({
            url:"/home/getTableData",
            method:"get",
            mock:false,
        });
    }, */
    getCountData(){
        return request({
            url:"/i/getCountData",
            method:"get",
            mock:true,
        });
    },
    getChartData(){
        return request({
            url:"/i/getChartData",
            method:"get",
            mock:true,
        });
    },
    




    getUserNameData(data){
        return request({
            url:"/user/getUserNameData",
            method:"get",
            mock:true,
            data,
        });
    },
    getUserNickNameData(data){
        return request({
            url:"/user/getUserNickNameData",
            method:"get",
            mock:true,
            data,
        });
    },
    getPowerData(data){
        return request({
            url:"/user/getPowerData",
            method:"get",
            mock:true,
            data,
        });
    },
    getSexData(data){
        return request({
            url:"/user/getSexData",
            method:"get",
            mock:true,
            data,
        });
    },
    getBirthData(data){
        return request({
            url:"/user/getBirthData",
            method:"get",
            mock:true,
            data,
        });
    },
    getAddressData(data){
        return request({
            url:"/user/getAddressData",
            method:"get",
            mock:true,
            data,
        });
    },
    getPhoneNumberData(data){
        return request({
            url:"/user/getPhoneNumberData",
            method:"get",
            mock:true,
            data,
        });
    },
    getEquipmentData(data){
        return request({
            url:"/user/getEquipmentData",
            method:"get",
            mock:true,
            data,
        });
    },
    deleteUser(data){
        return request({
            url:"/user/deleteUser",
            method:"get",
            mock:true,
            data,
        });
    },
    addUser(data){
        return request({
            url:"/user/addUser",
            method:"post",
            mock:true,
            data,
        });
    },
    editUser(data){
        return request({
            url:"/user/editUser",
            method:"post",
            mock:true,
            data,
        });
    },
    getLoginInformationData(data){
        return request({
            url:"/user/getLoginInformationData",
            method:"get",
            mock:true,
            data,
        });
    },




    getMenu(data){
        return request({
            url:"/permission/getMenu",
            method:"get",
            mock:true,
            data,
        });
    },





    getImageListData(){
        return request({
            url:"/goods/getImageListData",
            method:"get",
            mock:true,
        });
    },
    getGoodsListData(){
        return request({
            url:"/goods/getGoodsListData",
            method:"get",
            mock:true,
        });
    },





    getAdListData(){
        return request({
            url:"/home/getAdListData",
            method:"get",
            mock:true,
        });
    },
    getOneDayEnvData(){
        return request({
            url:"/home/getOneDayEnvData",
            method:"get",
            mock:true,
        });
    },
    getSuggestData(){
        return request({
            url:"/home/getSuggestData",
            method:"get",
            mock:true,
        });
    },
    getRealTimeEnvData(){
        return request({
            url:"/home/getRealTimeEnvData",
            method:"get",
            mock:true,
        });
    },


    
}