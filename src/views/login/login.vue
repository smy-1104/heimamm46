<template>
  <div class="login-container">
    <div class="left-box">
      <div class="title-box">
        <img src="../../assets/login-logo.png" alt class="logo" />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
    </div>
    <img src="../../assets/login_banner_ele.png" alt />
  </div>
</template>
<script>
export default {
  //组件名字
  name: "login"
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