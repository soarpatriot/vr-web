<template>
    <md-toolbar class="md-accent">
      <md-button class="md-icon-button">
        <md-icon class="md-primary">menu</md-icon>
      </md-button>
      <h2 class="md-title">唯美VR</h2>
      <md-button>浏览</md-button>
      <md-button href="/upload">上传</md-button>
      <span style="flex: 1;"></span>
      <md-button href="/login">登录</md-button>
      <span>/</span>
      <md-button href="/register">注册</md-button>
    </md-toolbar>
</template>
<script>
export default {
  name: 'navbar',
  components: {
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    let token = window.localStorage.getItem('token')
    const USER_URL = 'http://localhost:4000/validate'
    if (token) {
      let tokenStr = `Token: ${token}`
      console.log(`token: ${tokenStr}`)
      this.$http.get(USER_URL, { headers: {
        'api-token': tokenStr
      } }).then((response) => {
        console.log(`token success: ${JSON.stringify(response)}`)
      }, (response) => {
        console.log(`error: ${JSON.stringify(response)}`)
      })
    }
  },
  methods: {
  }
}
</script>
<style>
.my-navbar{
  color: #fff;
  background: rgba(0,0,0,.9);
  box-shadow: 0 1px 5px rgba(0,0,0,.15)
}

 
</style>

