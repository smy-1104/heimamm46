//导入 axios
import axios from "axios"
//导入token工具函数
import {getToken} from "../uitils/token.js"


const indexRequest = axios.create({
    //基地址
    baseURL:process.env.VUE_APP_URL,
    //是否跨域
    withCredentials:true
})

// 把用户信息相关的接口调用 
export function info() {
    return indexRequest({
        url:"/info",
        method:'get',
        //设置请求头
        //headers是axios定义的设置方式
        headers:{
            token:getToken()
        }
    });
}
// 把用户退出相关的接口调用 
export function logout() {
    return indexRequest({
        url:"/logout",
        method:'get',
        //是否跨域携带cookie 默认是false
        // withCredentials: true,
        //设置请求头
        //headers是axios定义的设置方式
        headers:{
            token:getToken()
        }
    });
}
