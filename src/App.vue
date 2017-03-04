<template>
  <div id="main">
    <div class="container home-model">
      <md-layout md-gutter>
          <md-layout md-flex-xsmall="100" md-flex-small="60" md-flex-medium="60">
            <model v-if="!!url" :url="url"></model>
          </md-layout>
          <md-layout md-flex-xsmall="100" md-flex-small="40" md-flex-medium="40">
            <div class="site-intro">
              <h3>发布，分享，发现唯美3D模型，在线VR</h3>
            </div>  
          </md-layout>
      </md-layout>
    </div>
    <div class="container why">
      <md-layout md-gutter>
        <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
          <p class="tip-img-p">
          <img src="/static/images/upload.png"/>
          </p>
          <p class="tip-text-p">
					无限上传你的VR，模型 
          </p>
        </md-layout>
        <md-layout md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
          <p class="tip-img-p">
          <img src="/static/images/univer.png"/>
          </p>
          <p class="tip-text-p">
					支持3D模型和VR  
          </p>
		
        </md-layout>
        <md-layout  md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33">
          <p class="tip-img-p">
          <img src="/static/images/univer.png"/>
          </p>
          <p class="tip-text-p">
					嵌入VR到你的网站
          </p>
        </md-layout>
      </md-layout>
    </div>

  </div>
</template>

<script>
import Model from './components/Model'
// import Icon from 'vue-icons'
export default {
  name: 'app',
  components: {
    Model
  },
  data () {
    return {
      url: ''
    }
  },

  created () {
    const HIGH_URL = `${process.env.API_URL}/highlights/lastest`

    this.$http.get(HIGH_URL).then((response) => {
      let modelUrl = response.body.data.full
      this.url = modelUrl
      console.log(`post success: ${JSON.stringify(response.body)}`)
    }, (response) => {
      console.log(`error: ${JSON.stringify(response)}`)
    })
  }

}
</script>

<style lang="scss" scoped>
@import "./assets/scss/break.scss";
@import "./assets/scss/grid.scss";
body {
  margin: 0;
}
.home-model{
  margin-top: 40px;
  color: #eee;
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
  margin-top: 40px;
  padding: 30px 0;
  color: #eee;
  background: #1caad9 url(/static/images/intro.png) left bottom repeat-x;
  img{
    width: 64px;
    height: 64px;
    display: block;
  }
}

.site-intro{
  width: 100%;

  padding-left: 10px;
  background: #333 url(/static/images/conbg.png) top bottom repeat-y;
  @include breakpoint($lg){
    padding-left: 20px;
		padding-top: 120px;
    background: #333 url(/static/images/conbg.png) left top repeat-x;
  }
  @include breakpoint($md){
    padding-left: 30px;
		padding-top: 100px;
    background: #333 url(/static/images/conbg.png) left top repeat-x;
 
  }
 
}
.tip-img-p{
  display: block;
  width: 100%;
  img{
    margin: 0 auto;
  }
}
.tip-text-p{
  width: 100%;
  text-align: center;
}
</style>
