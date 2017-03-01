<template>
  <div id="main">
    <div class="container login-container">
      <h1 class="h1">登录</h1>
      <form class="upload-form" novalidate @submit.stop.prevent="submit">
        <div class="tip" v-show="!!msg"> 
          <label class="md-error">{{msg}}</label>
        </div>
        <md-input-container>
          <label>用户名／邮箱</label>
          <md-input v-model="user.email" required></md-input>
        </md-input-container>
        <md-input-container md-has-password>
          <label>密码</label>
          <md-input v-model="user.password" type="password"></md-input>
        </md-input-container> 
        <md-button type="submit" class="md-raised md-primary">登录</md-button>

      </form> 
     
    </div>
  </div>
</template>

<script>
import Vfooter from './components/Vfooter'
import Navbar from './components/Navbar'
import Icon from 'vue-icons'
export default {
  name: 'app',
  components: {
    Navbar,
    Vfooter,
    Icon
  },
  data () {
    return {
      msg: '',
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      const REG_URL = 'http://localhost:4000/login'
      this.$http.post(REG_URL, { session: this.user }).then((response) => {
        // console.log(`success: ${JSON.stringify(response)}`)
        // console.log(`success: ${response.body.token}`)
        window.localStorage.setItem('token', response.body.token)
        this.$router.push('/')
      }, (response) => {
        console.log(`error: ${JSON.stringify(response.body)}`)
        this.msg = response.body.msg
      })
    }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/break.scss";
@import "./assets/scss/grid.scss";
.h1{
 text-align: center;
}
.tip{
 color: #ff5722;
 padding: 10px 20px;
 background-color: rgba(0, 0, 0, 0.15);
}
.login-container{
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  
  @include breakpoint($lg){
		width: 50%;
  }
  @include breakpoint($md){
		width: 80%;
  }
}
</style>
