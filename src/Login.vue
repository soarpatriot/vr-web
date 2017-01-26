<template>
  <div id="main">
    <navbar></navbar>
    <div class="container login-container">
      <h1>登录</h1>
      <form class="upload-form" novalidate @submit.stop.prevent="submit">
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
        console.log(`error: ${response}`)
      })
    }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/break.scss";
@import "./assets/scss/grid.scss";
.login-container{
  padding-top: 30px;
  @include breakpoint($lg){
		width: 50%;
  }
  @include breakpoint($md){
		width: 80%;
  }
}
</style>
