<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/foo">foo</router-link>
    <router-link to="/bar">bar</router-link>
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Foo from './components/Foo'

export default {
  name: 'app',
  components: {
    Hello,
    Foo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
