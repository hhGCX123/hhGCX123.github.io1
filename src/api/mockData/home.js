export default{
    getAdListData:()=>{
        return{
            code:200,
            data:[
                
                {
                    name:'6',
                    url:'https://www.xiaohongshu.com/explore',
                },
                {
                    name:'7',
                    url:'https://www.changdunovel.com/',
                },
                {
                    name:'8',
                    url:'https://www.douyin.com/',
                },
                {
                    name:'9',
                    url:'https://pvp.qq.com/',
                },
                
            ]
        }
    },
    getOneDayEnvData:()=>{
        return{
            code:200,
            data:{
                time:["0:00","1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00",
                    "9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00",
                    "17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
                temp:[31.2, 32.1, 31.6, 27.9, 38.8, 26.3, 30.4, 35.1, 34.4, 
                    35.2, 26.2, 37.5, 28.5, 36.8, 38.7, 29.9, 40.0, 30.3, 
                    31.0, 36.7, 33.2, 34.4, 37.0, 26.5],
                humi:[79, 58, 59, 60, 78, 68, 62, 52, 62, 75, 51, 65,
                    69, 72, 67, 75, 57, 79, 63, 74, 55, 71, 56, 71],
            },           
        }
    },
    getSuggestData:()=>{
        return{
            code:200,
            data:[
                {
                    name:'10',
                    title:'穿衣',
                    message:'盛夏装'
                },
                {
                    name:'11',
                    title:'防晒',
                    message:'SPF>20'
                },
                {
                    name:'12',
                    title:'旅游',
                    message:'不适宜'
                },
                {
                    name:'13',
                    title:'运动',
                    message:'较不宜'
                },
                {
                    name:'14',
                    title:'钓鱼',
                    message:'不适宜'
                },
                {
                    name:'15',
                    title:'洗车',
                    message:'较适宜'
                },
                {
                    name:'16',
                    title:'过敏',
                    message:'不易发'
                },
                {
                    name:'17',
                    title:'感冒',
                    message:'不易'
                }
                
            ]
            
        }
    },
    getRealTimeEnvData:()=>{
        return{
            code:200,
            data:{
                temp:33,
                humi:56,
                light:2,
                lifeTip:'温度较高，建议多喝水，以防中暑!',
                url:'https://www.whsyy.net/view_8305.html',
            }
        }
    },
}
