<template>
  <div id="app">
    <navbar></navbar>
    <img src="./assets/logo.png">
    <router-link to="/foo">foo</router-link>
    <router-link to="/bar">bar</router-link>
    <hello></hello>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello,
    Navbar
  }
}
</script>

<style>
body{
  margin: 0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
