import Mock from "mockjs";
import iApi from './mockData/i';
import userApi from './mockData/user';
import permissionApi from './mockData/permission';
import goodsApi from './mockData/goods'
import homeApi from './mockData/home'
//1拦截的路径 2方法 3制造出假数据
Mock.mock(/api\/i\/getTableData/,"get",iApi.getTableData); 
Mock.mock(/api\/i\/getCountData/,"get",iApi.getCountData); 
Mock.mock(/api\/i\/getChartData/,"get",iApi.getChartData); 

Mock.mock(/api\/user\/getUserNameData/,"get",userApi.getUserNameData); 
Mock.mock(/api\/user\/getUserNickNameData/,"get",userApi.getUserNickNameData); 
Mock.mock(/api\/user\/getPowerData/,"get",userApi.getPowerData); 
Mock.mock(/api\/user\/getSexData/,"get",userApi.getSexData); 
Mock.mock(/api\/user\/getBirthData/,"get",userApi.getBirthData); 
Mock.mock(/api\/user\/getAddressData/,"get",userApi.getAddressData); 
Mock.mock(/api\/user\/getPhoneNumberData/,"get",userApi.getPhoneNumberData); 
Mock.mock(/api\/user\/getEquipmentData/,"get",userApi.getEquipmentData); 
Mock.mock(/api\/user\/deleteUser/,"get",userApi.deleteUser); 
Mock.mock(/api\/user\/addUser/,"post",userApi.createUser); 
Mock.mock(/api\/user\/editUser/,"post",userApi.updateUser); 
Mock.mock(/api\/user\/getLoginInformationData/,"get",userApi.getLoginInformationData); 


Mock.mock(/api\/permission\/getMenu/,"get",permissionApi.getMenu); 

Mock.mock(/api\/goods\/getImageListData/,"get",goodsApi.getImageListData); 
Mock.mock(/api\/goods\/getGoodsListData/,"get",goodsApi.getGoodsListData); 

Mock.mock(/api\/home\/getAdListData/,"get",homeApi.getAdListData); 
Mock.mock(/api\/home\/getOneDayEnvData/,"get",homeApi.getOneDayEnvData); 
Mock.mock(/api\/home\/getSuggestData/,"get",homeApi.getSuggestData); 
Mock.mock(/api\/home\/getRealTimeEnvData/,"get",homeApi.getRealTimeEnvData); 
