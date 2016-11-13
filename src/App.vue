<template>
  <div id="main">

    <navbar></navbar>
    <div class="fluid-container home-model">
      <stage></stage>
		  <div class="site-intro">
		  	<h3>发布，分享，发现唯美3D模型，在线VR</h3>
		  </div>  


    </div>
    <div class="fluid-container why">
			<div class="row">
				<div class="intro col-4">
          <img src="/static/images/upload.png"/>
          <p>
					无限上传你的VR，模型 
          </p>
				</div>  
				<div class="intro col-4">
          <img src="/static/images/univer.png"/>
          <p>
					支持3D模型和VR  
          </p>
				</div>  
				<div class="intro col-4">
          <img src="/static/images/univer.png"/>
          <p>
					嵌入VR到你的网站
          </p>
				</div>  
			</div>
    </div>


    <vfooter></vfooter>
  </div>
</template>

<script>
import Stage from './components/Stage'
import Vfooter from './components/Vfooter'
import Navbar from './components/Navbar'
import Hello from './components/Hello'
import Icon from 'vue-icons'
export default {
  name: 'app',
  components: {
    Hello,
    Navbar,
    Stage,
    Vfooter,
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
  background: #333 url(/images/conbg.png) left top repeat-x;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #fff;
  color: #2c3e50;
}
.why{
  padding: 30px 0;
  color: #eee;
  background: #1caad9 url(/intro.png) left bottom repeat-x;
  img{
    width: 64px;
  }
}
.site-intro{
  
  padding-top: 120px;
  @include breakpoint($xs){
    padding-top: 5px;
  }
  @include breakpoint($sm){
    padding-top: 5px;
  }
 
}
</style>
