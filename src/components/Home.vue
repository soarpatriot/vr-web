<template>
  <div class="home">
    <div class="fluid-container stage">
      <navigator/>
      <el-row class="display">
        <el-col :xs="24" :sm="16">
          <model v-if="post" :file="post.asset" :fullScreen="true"></model>
        </el-col>
        <el-col :xs="24" :sm="8">
        </el-col>
      </el-row> 
    </div>
    <div class="fluid-container">
      <el-row class="site-service">
        <el-col :xs="24" :sm="8">
          <div>
            <img src="/static/images/upload.png">
          </div>
          <p>
            无限上传你的VR，模型 
          </p>
 
        </el-col>
        <el-col :xs="24" :sm="8">
          <div>
            <img src="/static/images/univer.png">
          </div>
          <p>
            支持多种VR，3D模型 
          </p>
 
        </el-col>
        <el-col :xs="24" :sm="8">
          <div>
            <img src="/static/images/univer.png">
          </div>
          <p>
            嵌入到你的网站 
          </p>
 
        </el-col>


      </el-row> 
 
    </div>
    <vfooter/>
  </div>
</template>

<script>
import Navigator from './Navigator'
import Model from './Model'
export default {
  name: 'home',
  components: {
    Navigator,
    Model
  },
  data () {
    return {
      'msg': 'hello',
      post: null,
    }
  },
  created () {
    const HIGH_URL = `${process.env.API_URL}/highlights/lastest`
    this.$http.get(HIGH_URL).then((response) => {
      this.post = response.body.data
    }, (response) => {
      console.log(`error: ${JSON.stringify(response)}`)
    })
  }
}

</script>
<style lang="scss">
@import "../assets/scss/vr.scss";
</style>
<style lang="scss" scoped>
@import "../assets/scss/vr.scss";
.home {
  min-height: 400px;
}
.stage{
  // background: #404040;
  min-height: 200px;
  background: #404040;
}
.display{
  // background: #65697f; 
  // background: #666 url(/static/images/conbg.png) 0 0 repeat; 
}
.intro{
  display: table; 
  .site-slogn{
    color: #fff;
    height: 200px; 
    padding: 0 40px;
    display: table-cell;
    vertical-align: middle;
		@include breakpoint($lg){
      height: 400px; 
		}
		@include breakpoint($md){
      height: 380px; 
		}


  }
}
.site-service{
  font-size: 14px;
  padding: 40px;
  text-align: center;
  color: #eee;
  background: #1caad9 url(/static/images/intro.png) 0 100% repeat-x;
  img{
    width: 64px;
    height: 64px;
  }
}
</style>
