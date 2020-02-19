//导入 axios
import axios from "axios"

//为了更加方便地设置每个模块的请求，一般会通过creat创建新的axios对象
//创建的对象 和axios功能一样，但是可以单独的为他设置自己的属性

const loginRequest = axios.create({
    //基地址
    baseURL:process.env.VUE_APP_URL,
    //是否跨域
    withCredentials:true
})

// 把注册相关的接口调用 抽取为函数 并暴露 带名字的暴露
export function login( data ) {
    return loginRequest({
        url:"/login",
        method:'post',
        //是否跨域携带cookie 默认是false
        withCredentials: true,
        data
    });
}
