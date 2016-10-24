<template>
  <div>
  <el-menu theme="light" :router="true" default-active="1" class="el-menu-demo" mode="horizontal">
    <el-menu-item  index="foo">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
    </el-submenu>
    <el-menu-item index="bar">订单管理</el-menu-item>
  </el-menu>
  <div class="line"></div>
  </div>
</template>
<script>
export default {
  name: 'navbar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style>
  .el-menu-demo{
    padding-left: 55px;
  }
</style>

