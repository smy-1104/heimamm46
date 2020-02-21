//导入vue
import Vue from 'vue';
//导入vue-router
import VueRouter from 'vue-router';

//导入进度条组件
import NProgress from 'nprogress';
//导入进度条样式
import 'nprogress/nprogress.css';
//注册一下 use
Vue.use(VueRouter)


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
router.beforeEach((to,from,next)=>{
    //开启进度条
    NProgress.start()
    //向后走
    next()
})
//导航守卫afterEach 进入完成之后
//router.afterEach((to,from)=>{})
router.afterEach(()=>{
    NProgress.done()
})


//暴露出去
export default router