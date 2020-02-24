// 导入Vue
import Vue from 'vue';
// 导入Vue-router
import VueRouter from 'vue-router';

// 导入 进度条组件
import NProgress from 'nprogress';
// 导入 进度条样式
import 'nprogress/nprogress.css';

// 导入token的工具函数 获取token
import {
    getToken,
    removeToken
} from '@/uitils/token.js';

// 导入 用户信息获取接口
import {
    info
} from '@/api/index.js';

// 按需导入 Element-ui的弹框
import {
    Message
} from 'element-ui';

//导入仓库
import store from "@/store/index.js";

// 注册一下 use
Vue.use(VueRouter);

// 导入 组件 login
import login from '../views/login/login.vue';
// 导入 组件 index
import index from '../views/index/index.vue';

// 导入组件 嵌套路由 数据 chart
import chart from '@/views/index/chart/chart.vue';
// 导入组件 嵌套路由 用户 user
import user from '@/views/index/user/user.vue';
// 导入组件 嵌套路由 题库 question
import question from '@/views/index/question/question.vue';
// 导入组件 嵌套路由 企业 enterprise
import enterprise from '@/views/index/enterprise/enterprise.vue';
// 导入组件 嵌套路由 学科 subject
import subject from '@/views/index/subject/subject.vue';


//创建路由对象
const router = new VueRouter({
    //路由规则
    routes: [
        //空地址的重定向
        {
            path: "/",
            redirect: "/login"
        },
        //登录
        {
            path: "/login",
            component: login,
            meta: {
                title: "登录"
            }
        },
        //首页
        {
            path: "/index",
            component: index,
            meta: {
                title: "首页"
            },
            //嵌套路由
            children: [
                //chart
                {
                    //路径不需要写/ 被解析为 /index/chart
                    path: "chart",
                    component: chart,
                    meta: {
                        title: "数据概览"
                    }
                },
                //user
                {
                    //路径不需要写/ 被解析为 /index/user
                    path: "user",
                    component: user,
                    meta: {
                        title: "用户列表"
                    }
                },
                //question
                {
                    //路径不需要写/ 被解析为 /index/question
                    path: "question",
                    component: question,
                    meta: {
                        title: "题库列表"
                    }
                },
                //enterprise
                {
                    //路径不需要写/ 被解析为 /index/enterprise
                    path: "enterprise",
                    component: enterprise,
                    meta: {
                        title: "企业列表"
                    }
                },
                //subject
                {
                    //路径不需要写/ 被解析为 /index/subject
                    path: "subject",
                    component: subject,
                    meta: {
                        title: "学科列表"
                    }
                },
            ]
        },
    ]
});

//定义路由白名单(不需要登录就可以访问的页面)
const whitePaths = ['/login'];

//导航守卫beforeEach 进入之前
router.beforeEach((to, from, next) => {
    //开启进度条
    NProgress.start()
    //访问的页面是哪个
    // window.console.log(to.path)
    //向后走
    // if (to.path != "/login") {
    //白名单判断 不存在
    //toLocaleLowerCase()转小写
    if (whitePaths.includes(to.path.toLocaleLowerCase()) != true) {
        //需要判断登录状态
        //token非空
        if (getToken() == undefined) {
            //为空
            // this是不是vue实例
            // this.$message.warning('请先登录');
            Message.warning("登录状态有误，请检查");
            NProgress.done();
            //打开登录页需要关闭进度条，因为不会触发afterEach
            // this.$router.push('/login')
            next('/login');
        } else {
            //token 不为空 正确判断
            info().then(res => {
                //window.console.log(res)
                if (res.data.code === 206) {
                    //删除token
                    removeToken();
                    //提示用户
                    Message.warning('登录状态有误，请检查');
                    NProgress.done();
                    //返回登录页
                    next('/login');
                } else if (res.data.code === 200) {
                    //处理用户的信息 用户的名字
                    const username = res.data.data.username;
                    //处理用户的信息 用户的头像
                    const userIcon = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
                    //调用仓库的方法
                    //登录成功后把数据保存到仓库中
                   store.commit("changeIcon",userIcon);
                   store.commit("changeName",username);
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
    //关闭进度条
    NProgress.done();
    //修改标题(没搞出来)
    // window.document.title = to.meta.title;
})


//暴露出去
export default router;