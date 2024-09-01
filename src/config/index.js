const env=import.meta.env.MODE || "prod";/* import.meta.env.MODE 是一个特殊的变量，它包含了当前应用运行的环境模式。这个变量是由构建工具（如 Vite、Webpack 等）在构建应用时设置的。 */
const EnvConfig={
    development:{
        baseApi:"https://apifoxmock.com/m1/4068509-0-default/api",
        mockApi:"/api",
    },
    test:{
        baseApi:"https://apifoxmock.com/m1/4068509-0-default/api",
        mockApi:"/api",
    },
    prod:{
        baseApi:"https://apifoxmock.com/m1/4068509-0-default/api",
        mockApi:"/api",
    }

};
export default{
    env,
    ...EnvConfig[env],
    mock:false,
};