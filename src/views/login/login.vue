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
      <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
                <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="input1">
                </el-input>
                <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="input2" show-password>
                </el-input>
                <el-col class="item" :span="16">
                    <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="input3">
                    </el-input>
                </el-col>

            </el-form-item>
            <el-form-item>
                <el-checkbox-group v-model="form.type">
                    <el-checkbox name="type">
                        我已阅读并同意
                        <el-link class="font-link" type="primary">用户协议</el-link>
                        和
                        <el-link class="font-link" type="primary">隐私条款</el-link>
                    </el-checkbox>

                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-col class="item" :span="24">
                    <el-button type="primary" @click="onSubmit" class="my-btn">登录</el-button>
                </el-col>
                <el-col class="item" :span="24">
                    <el-button class="my-btn">注册</el-button>
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
  data:{
                input1: "",
                input2: "",
                input3: "",
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            },
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

  .left-box {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;

    .title-box {
      display: flex;
      align-items: center;
      margin-left: 48px;
      margin-top: 44px;
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
  }
}

.login-container .left-box {
  width: 478px;
  height: 550px;
  background-color: #f5f5f5;
}
</style>