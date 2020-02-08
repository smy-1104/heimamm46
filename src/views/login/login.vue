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
      <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="48px" id="login-form">
        <!-- 手机号 -->
        <el-form-item>
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="loginCode">
          <el-col class="item" :span="17">
            <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="loginForm.loginCode"></el-input>
          </el-col>
          <el-col class="item code-col" :span="7">
            <img src="../../assets/login_captcha.png" alt class="login-code" />
          </el-col>
        </el-form-item>
        <!-- 用户协议 -->
        <el-form-item>
          <el-checkbox v-model="loginForm.checked">
            我已阅读并同意
            <el-link class="font-link" type="primary">用户协议</el-link>和
            <el-link class="font-link" type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-col class="item" :span="24" v-model="loginForm.denglu">
            <el-button type="primary" @click="submitForm('loginForm')" class="my-btn">登录</el-button>
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
      loginForm: {
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
      },
      //校验规则
      rules: {
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 12,
            message: "密码的长度为6-12位",
            trigger: "blur"
          }
        ],
        loginCode: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          },
          {
            min: 4,
            max: 4,
            message: "验证码的长度为4位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  //方法
  mathods: {
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("对啦!");
          //验证正确
          this.$message.success("验证成功");
        } else {
          // console.log("验证失败");
          //验证错误
          this.$message.error("验证失败");
          return false;
        }
      });
    }
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
      .code-col {
        height: 40.8px;

        .login-code {
          width: 100%;
          height: 40.8px;
        }
      }
      //登录验证码
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