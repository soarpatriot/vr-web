<template>
  <div id="main" v-md-theme="'default'">

    <navbar></navbar>
    <div class="container">
      <stage></stage>
    </div>
  </div>
</template>

<script>
import Stage from './components/Stage'
import Navbar from './components/Navbar'
import Hello from './components/Hello'
import Icon from 'vue-icons'
export default {
  name: 'app',
  components: {
    Hello,
    Navbar,
    Stage,
    Icon
  }
}
</script>

<style lang="scss">
@import "./assets/scss/break.scss";
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container{
  margin: 0 auto;
  
  @include breakpoint($md){
    padding: 0 20px;
  }
  @include breakpoint($lg){
    padding: 0 20px;
    width:1170px;
  }
}
</style>
