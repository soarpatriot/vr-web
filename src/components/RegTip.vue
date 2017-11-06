<template>
  <div id="main">
    <Navigator/>
    <div class="container login-container">
      <h2 class="title">注册成功</h2>
      <div>
        <p class="reg-tip">您已成功注册账号，一封激活邮件已发送到您的邮箱，请在5小时内激活。激活后方可使用服务
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
