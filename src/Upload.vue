<template>
  <div id="main">

    <navbar></navbar>
    <div class="fluid-container home-model">
    </div>
    <vfooter></vfooter>
  </div>
</template>

<script>
import Vfooter from './components/File'
import File from './components/Vfooter'
import Navbar from './components/Navbar'
import Icon from 'vue-icons'
export default {
  name: 'app',
  components: {
    Navbar,
    Vfooter,
    File,
    Icon
  }
}
</script>

<style lang="scss">
@import "./assets/scss/break.scss";
@import "./assets/scss/grid.scss";
body {
  margin: 0;
}
.home-model{
  color: #eee;
  background: #333 url(/static/images/conbg.png) left top repeat-x;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #fff;
  color: #2c3e50;
}
.site-intro{
  background: #333 url(/static/images/conbg.png) top bottom repeat-y;
  width: 100%;
  height: 60px;
  padding-top: 5px;

  @include breakpoint($lg){
		float:left; 
		width: 40%;
		padding-top: 120px;
 
  }
  @include breakpoint($md){
		float:left; 
		width: 30%;
    padding-left: 30px;
		padding-top: 100px;
 
  }
}
</style>
