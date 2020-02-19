<template>
  <!-- 挂载的元素 -->
  <div id="app">
    <el-container class="my-container">
      <el-header class="my-header">Header</el-header>
      <el-container>
        <el-aside class="my-aside" width="200px">Aside</el-aside>
        <el-main class="my-main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
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
        background-color: tomato;
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