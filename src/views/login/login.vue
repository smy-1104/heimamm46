<template>
  <!-- 整体容器 -->
  <div class="login-container">
    <!-- 左侧盒子 -->
    <div class="left-box">
      <!-- 上方标题盒子 -->
      <div class="title-box">
        <img src="../../assets/login-logo.png" alt class="logo" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 下方表单盒子 -->
      <!-- 登录表单 -->
      <el-form ref="form" :model="form" label-width="48px" id="login-form">
        <!-- 手机号 -->
        <el-form-item>
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="Loginform.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="Loginform.password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item class="login-captcha">
          <el-col class="item" :span="17">
            <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="Loginform.loginCode"></el-input>
          </el-col>
          <el-col class="item" :span="7">
            <img src="../../assets/login_captcha.png" alt class="login-code" />
          </el-col>
        </el-form-item>
        <!-- 用户协议 -->
        <el-form-item>
          <el-checkbox v-model="Loginform.checked">
            我已阅读并同意
            <el-link class="font-link" type="primary">用户协议</el-link>和
            <el-link class="font-link" type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-col class="item" :span="24" v-model="Loginform.denglu">
            <el-button type="primary" @click="onSubmit" class="my-btn">登录</el-button>
          </el-col>
          <el-col class="item" :span="24">
            <el-button type="primary" class="my-btn my-btn2">注册</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>
<script>
export default {
  //组件名字
  name: "login",
  data() {
    return {
      Loginform: {
        //手机号
        phone: "",
        //密码
        password: "",
        //验证码
        loginCode: "",
        //登录按钮
        denglu: "",
        //是否勾选
        checked: false
      }
    };
  }
};
</script>




<style lang="less">
.login-container {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  /*开启弹性布局*/
  display: flex;
  /* 上下居中 */
  align-items: center;
  /* 左右均分 */
  justify-content: space-around;
  //左侧盒子
  .left-box {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    //修改样式 把表单右间隙空出来
    box-sizing: border-box;
    padding-right: 41px;

    .title-box {
      display: flex;
      align-items: center;
      margin-left: 48px;
      margin-top: 44px;
      //底部间隙
      margin-bottom: 27px;

      .logo {
      }
      .title {
        font-size: 24px;
        font-family: SourceHanSansCN;
        color: rgba(12, 12, 12, 1);
        margin-left: 16px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-left: 14px;
      }
      .sub-title {
        font-size: 22px;
        font-family: PingFangSC;
        color: rgba(12, 12, 12, 1);
        margin-left: 12px;
      }
    }

    #login-form {
      //登录验证码
      .login-code {
        width: 100%;
        height: 40.8px;
      }
    }
    //协议区域布局水平对齐
    .el-checkbox {
      display: flex;
      //上下居中
      align-items: center;
      .el-checkbox__label {
        display: flex;
      }
    }
    //按钮
    .my-btn {
      width: 100%;
    }
    .my-btn2 {
      margin-top: 26px;
    }
  }
}

.login-container .left-box {
  width: 478px;
  height: 550px;
  background-color: #f5f5f5;
}
</style>