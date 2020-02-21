<template>
  <!-- 挂载的元素 -->
  <div id="app">
    <el-container class="my-container">
      <el-header class="my-header">
        <div class="left">
          <i class="el-icon-s-fold"></i>
          <img src="../../assets/index_logo.png" alt />
          <span>黑马面面</span>
        </div>
        <div class="right">
          <img :src="userIcon" alt />
          <span class="name">{{username}},你好</span>
          <el-button type="primary" @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside class="my-aside" width="200px">Aside</el-aside>
        <el-main class="my-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//导入接口
import { info, logout } from "@/api/index.js";
//导入token函数
import { removeToken } from "@/uitils/token.js";
export default {
  name: "index",
  data() {
    //定义数据
    return {
      //用户名
      username: "",
      //用户头像
      userIcon: ""
    };
  },
  methods: {
    logout() {
      this.$confirm("你确定要退出登录吗?", "友情提示", {
        confirmButtonText: "狠心离开",
        cancelButtonText: "继续看看",
        type: "warning"
        // type: 'error',
        // type: 'success',
      })
        .then(() => {
          //点击确定
          logout().then(res=>{
            //windows.console.log(res)
            if (res.data.code===200) {
              //移出token
              removeToken()
              //去登录页
              this.$router.push("/login")
            }
          })
        })
        .catch(() => {
          //点击取消
          
        });
    }
  },
  created() {
    info().then(res => {
      window.console.log(res);
      this.username = res.data.data.username;
      //服务器返回的头像地址不完整，需要进行拼接
      this.userIcon = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    });
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;

  #app {
    height: 100%;

    .my-container {
      height: 100%;

      .my-header {
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .el-icon-s-fold {
            font-size: 24px;
            margin-right: 22px;
          }
          img {
            margin-right: 11px;
          }
          span {
            font-size: 22px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: rgba(73, 161, 255, 1);
          }
        }
        .right {
          display: flex;
          align-items: center;

          img {
            display: inline-block;
            width: 43px;
            height: 43px;
            border-radius: 50%;
            margin-right: 9px;
          }
          span.name {
            margin-right: 38px;
            font-size: 14px;
          }
        }
      }
      .my-aside {
        background-color: rgb(234, 240, 181);
      }
      .my-main {
        background-color: rgb(195, 186, 247);
      }
    }
  }
}
</style>