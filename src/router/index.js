//导入vue
import Vue from 'vue'
//导入vue-router
import VueRouter from 'vue-router'
//注册一下 use
Vue.use(VueRouter)


//导入 组件 登录
import login from '../views/login/login.vue'
//创建路由对象
const router = new VueRouter({
    //路由规则
    routes:[
        //登录
        {
                path:"/login",
                component:login
        }
    ]
})
//暴露出去
export default router