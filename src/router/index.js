//导入vue
import Vue from 'vue';
//导入vue-router
import VueRouter from 'vue-router';

//导入进度条组件
import NProgress from 'nprogress';
//导入进度条样式
import 'nprogress/nprogress.css';

//导入token 的工具函数 获取token
import {
    getToken,removeToken
} from "@/uitils/token.js";
//导入用户信息获取接口
import {
    info
} from "@/api/index.js";

//注册一下 use
Vue.use(VueRouter);


//导入 组件 登录
import login from '../views/login/login.vue';

//导入 组件 首页
import index from '../views/index/index.vue';
//导入组件 嵌套路由 数据 chart
import chart from '@/views/index/chart/chart.vue';
//导入组件 嵌套路由 用户 user
import user from "@/views/index/user/user.vue";
//导入组件 嵌套路由 题库 question
import question from "@/views/index/question/question.vue";
//导入组件 嵌套路由 企业 enterprise
import enterprise from "@/views/index/enterprise/enterprise.vue";
//导入组件 嵌套路由 学科 subject
import subject from "@/views/index/subject/subject.vue";
// import { removeToken } from '../uitils/token';




//创建路由对象
const router = new VueRouter({
    //路由规则
    routes: [
        //登录
        {
            path: "/login",
            component: login
        },
        //首页
        {
            path: "/index",
            component: index,
            //嵌套路由
            children: [
                //chart
                {
                    //路径不需要写/ 被解析为 /index/chart
                    path: "chart",
                    component: chart
                },
                //user
                {
                    //路径不需要写/ 被解析为 /index/user
                    path: "user",
                    component: user
                },
                //question
                {
                    //路径不需要写/ 被解析为 /index/question
                    path: "question",
                    component: question
                },
                //enterprise
                {
                    //路径不需要写/ 被解析为 /index/enterprise
                    path: "enterprise",
                    component: enterprise
                },
                //subject
                {
                    //路径不需要写/ 被解析为 /index/subject
                    path: "subject",
                    component: subject
                }
            ]
        },
    ]
});

//导航守卫beforeEach 进入之前
router.beforeEach((to, from, next) => {
    //开启进度条
    NProgress.start()
    //访问的页面是哪个
    // window.console.log(to.path)
    //向后走
    if (to.path != "/login") {
        //需要判断登录状态
        //token非空
        if (getToken() == undefined) {
            //为空
            // this是不是vue实例
            // this.$message.warning('请先登录');
            // this.$router.push('/login')
            next('/login');
        } else {
            //token 不为空 正确判断
            info().then(res => {
                //window.console.log(res)
                if (res.data.code === 206) {
                    //提示用户
                     //删除token
                     removeToken();
                    //返回登录页
                    next('/login');
                } else if (res.data.code === 200) {
                    //获取成功
                    //放走
                    next();
                }
            });
        }
    } else {
        //是登录页
        next()
    }
})
//导航守卫afterEach 进入完成之后
//router.afterEach((to,from)=>{})
router.afterEach(() => {
    NProgress.done()
})


//暴露出去
export default router