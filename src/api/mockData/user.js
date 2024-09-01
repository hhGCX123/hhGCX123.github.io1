import config from '@/config'
import Mock from 'mockjs'
//get请求从config.url获取数据，post从config.body中获取参数
function param2Obj(url){
    const search=url.split('?')[1]
    if(!search){
        return{}
    }
    return JSON.parse(
        '{"'+
        decodeURIComponent(search)
        .replace(/"/g,'\\"')
        .replace(/&/g,'","')
        .replace(/=/g,'":"')+
        '"}'
    )
}


let List=[]

// 将自定义数据添加到列表中
List.push(
    Mock.mock({
        id:Mock.Random.guid(),
        userName:'hhGCX123',
        password: 'hhGCX123', 
        userNickName: '玲宝天天开心',
        power:'root',
        sex: '男',
        birth: '2001-09-11',
        address: '重庆市 綦江区',
        phoneNumber:'18300914793',
        equipment:'研发四代',
    })
);
List.push(
    Mock.mock({
        id:Mock.Random.guid(),
        userName:'hjr',
        password: 'hjr', 
        userNickName: '独行者',
        power:'ordinary',
        sex: '男',
        birth: '2000-01-01',
        address: '重庆市 南岸区',
        phoneNumber:'13333333333',
        equipment:'研发三代',
    })
);

// 生成10位随机密码的函数
function generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}
// 生成11位随机电话号码的函数
function generateRandomPhone() {
    const firstDigit = '13'; // 假设电话号码以13开头
    const characters = '123456789'; // 去掉0，确保电话号码的首位不是0
    let phone = firstDigit;
    for (let i = 0; i < 9; i++) {
      phone += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return phone;
}

const startId = 1; // 开始的ID值
let currentId = startId; // 当前ID，初始化为开始值

const count = 200; // 总共要生成的数据条数
// 模拟用户数据，ID从00000001开始自增
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
        id:Mock.Random.guid(),
        userName: ('00000000' + currentId).slice(-8), // 生成8位ID，不足部分用0填充
        password: generateRandomPassword(), // 生成10位随机密码
        userNickName: Mock.Random.cname(),
        power:'ordinary',
        sex: Mock.Random.pick(['男', '女']),
        birth: Mock.Random.date(),
        address: Mock.mock('@county(true)'),
        phoneNumber:generateRandomPhone(),//11位随机电话号码
        equipment:Mock.Random.pick(['研发一代', '研发二代']),
    })
  );
  currentId++; // 自增ID
}



export default{
    /**
     * 获取列表
     * 要带参数userName，page，limt；userName可以不填，page.limit有默认值
     * @param userName,page,limit
     * @return{{code:number,const:number,data:*[]}}
     */
    getUserNameData:config=>{
        const {userName,page=1,limit=15}=param2Obj(config.url)
        //limit默认值是10，因为分页器默认也是一页10个
        const mockList=List.filter(user=>{
            //如果userName存在会,根据userName筛选数据
            if(userName&&user.userName.indexOf(userName)===-1) return false
            return true
        })
        //分页
        const pageList=mockList.filter((item,index)=>index<limit*page&&index>=limit*(page-1))
        return{
            code:200,
            data:{
                list:pageList,
                count:mockList.length,//数据总的条数需要返回
            }
        }
    },

    getUserNickNameData:config=>{
        const {userNickName,page=1,limit=15}=param2Obj(config.url)
        //limit默认值是10，因为分页器默认也是一页10个
        const mockList=List.filter(user=>{
            //如果userNickName存在会,根据userNickName筛选数据
            if(userNickName&&user.userNickName.indexOf(userNickName)===-1) return false
            return true
        })
        //分页
        const pageList=mockList.filter((item,index)=>index<limit*page&&index>=limit*(page-1))
        return{
            code:200,
            data:{
                list:pageList,
                count:mockList.length,//数据总的条数需要返回
            }
        }
    },

    getPowerData:config=>{
        const {power,page=1,limit=15}=param2Obj(config.url)
        //limit默认值是10，因为分页器默认也是一页10个
        const mockList=List.filter(user=>{
            //如果power存在会,根据power筛选数据
            if(power&&user.power.indexOf(power)===-1) return false
            return true
        })
        //分页
        const pageList=mockList.filter((item,index)=>index<limit*page&&index>=limit*(page-1))
        return{
            code:200,
            data:{
                list:pageList,
                count:mockList.length,//数据总的条数需要返回
            }
        }
    },

    getSexData:config=>{
        const {sex,page=1,limit=15}=param2Obj(config.url)
        //limit默认值是10，因为分页器默认也是一页10个
        const mockList=List.filter(user=>{
            //如果sex存在会,根据sex筛选数据
            if(sex&&user.sex.indexOf(sex)===-1) return false
            return true
        })
        //分页
        const pageList=mockList.filter((item,index)=>index<limit*page&&index>=limit*(page-1))
        return{
            code:200,
            data:{
                list:pageList,
                count:mockList.length,//数据总的条数需要返回
            }
        }
    },

    getBirthData:config=>{
        const {birth,page=1,limit=15}=param2Obj(config.url)
        //limit默认值是10，因为分页器默认也是一页10个
        const mockList=List.filter(user=>{
            //如果birth存在会,根据birth筛选数据
            if(birth&&user.birth.indexOf(birth)==-1) return false
            return true
        })
        //分页
        const pageList=mockList.filter((item,index)=>index<limit*page&&index>=limit*(page-1))
        return{
            code:200,
            data:{
                list:pageList,
                count:mockList.length,//数据总的条数需要返回
            }
        }
    },

    getAddressData:config=>{
        const {address,page=1,limit=15}=param2Obj(config.url)
        //limit默认值是10，因为分页器默认也是一页10个
        const mockList=List.filter(user=>{
            //如果address存在会,根据address筛选数据
            if(address&&user.address.indexOf(address)===-1) return false
            return true
        })
        //分页
        const pageList=mockList.filter((item,index)=>index<limit*page&&index>=limit*(page-1))
        return{
            code:200,
            data:{
                list:pageList,
                count:mockList.length,//数据总的条数需要返回
            }
        }
    },

    getPhoneNumberData:config=>{
        const {phoneNumber,page=1,limit=15}=param2Obj(config.url)
        //limit默认值是10，因为分页器默认也是一页10个
        const mockList=List.filter(user=>{
            //如果phoneNumber存在会,根据phoneNumber筛选数据
            if(phoneNumber&&user.phoneNumber.indexOf(phoneNumber)===-1) return false
            return true
        })
        //分页
        const pageList=mockList.filter((item,index)=>index<limit*page&&index>=limit*(page-1))
        return{
            code:200,
            data:{
                list:pageList,
                count:mockList.length,//数据总的条数需要返回
            }
        }
    },

    getEquipmentData:config=>{
        const {equipment,page=1,limit=15}=param2Obj(config.url)
        //limit默认值是10，因为分页器默认也是一页10个
        const mockList=List.filter(user=>{
            //如果equipment存在会,根据equipment筛选数据
            if(equipment&&user.equipment.indexOf(equipment)===-1) return false
            return true
        })
        //分页
        const pageList=mockList.filter((item,index)=>index<limit*page&&index>=limit*(page-1))
        return{
            code:200,
            data:{
                list:pageList,
                count:mockList.length,//数据总的条数需要返回
            }
        }
    },




    /**
     * 删除用户
     * @param
     * @return
     */
    deleteUser :config=>{
        const {id} =param2Obj(config.url)
        if(!id){
            return{
                code:-999,
                message:'参数不正确'
            }
        }else{
            List =List.filter(u=>u.id!==id)
            return{
                code:200,
                message:'删除成功'
            }
        }
    },

    /**
     * 增加用户
     * @param userName,password,userNickName,power,sex,birth,address,phoneNumber,equipment
     * @return {{code:number,data:{message:string}}}
     */
    createUser:config=>{
        const{userName,password,userNickName,power,sex,birth,address,phoneNumber,equipment}=JSON.parse(config.body)
        List.unshift({
            id:Mock.Random.guid(),
            userName:userName,
            password: password, 
            userNickName: userNickName,
            power:power,
            sex: sex,
            birth: birth,
            address: address,
            phoneNumber:phoneNumber,
            equipment:equipment,
        })
        return{
            code:200,
            data:{
                message:'添加成功'
            }
        }
    },

    /**
     * 修改用户
     * @param id,userName,password,userNickName,power,sex,birth,address,phoneNumber,equipment
     * return {{code:number,data:{message:string}}}
     */
    updateUser:config=>{
        const{id,userName,password,userNickName,power,sex,birth,address,phoneNumber,equipment}=JSON.parse(config.body)
        const sex_num=parseInt(sex)
        List.some(u=>{
            if(u.id===id){
                u.userName=userName
                u.password=password
                u.userNickName=userNickName
                u.power=power
                u.sex=sex
                u.birth=birth
                u.address=address
                u.phoneNumber=phoneNumber
                u.equipment=equipment
                return true

            }
        })
        return{
            code:200,
            data:{
                message:'编辑成功'
            }               
        }
    },


    getLoginInformationData:config=>{
        const {userName,password} =JSON.parse(config.body)
        // 查找用户
        const user = List.find(user => (user.userName === userName||user.phoneNumber===userName) && user.password === password);
        if (user) {
            // 用户存在且密码正确，登录成功
            return{
                code:200,
                data:{
                    power: user.power,
                    allow: true,
                    userName:user.userName,
                    userNickName:user.userNickName,
                    sex:user.sex,
                    birth:user.birth,
                    address:user.address,
                    phoneNumber:user.phoneNumber,
                    equipment:user.equipment,
                }               
            }
        } else {
            // 用户不存在或密码错误，登录失败
            return{
                code:200,
                data:{
                    allow: false
                }               
            }
        }
    },

}