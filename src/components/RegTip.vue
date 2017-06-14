<template>
  <div id="main">
    <Navigator/>
    <div class="container login-container">
      <h2 class="title">注册成功</h2>
      <div>
        <p class="reg-tip">您已成功注册账号，
          立即
          <router-link
              class="login-link"
              active-class="active"
              :to="`/login`">登陆
          </router-link>
 
          体验3D之旅。
        </p>
        
      </div>

    </div>
    <Vfooter/>
  </div>
</template>

<script>
export default {
  name: 'regtip',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/break.scss";
@import "../assets/scss/grid.scss";
.title{
  text-align: center;
}
.login-container{
  min-height: 400px;
  padding-top: 30px;
  @include breakpoint($lg){
		width: 40%;
  }
  @include breakpoint($md){
		width: 50%;
  }
}
.reg-tip{
  font-size: 18px;
}
.login-link{
  font-size: 24px;
  text-decoration: none;
}
</style>
