<template>
    <md-toolbar class="md-accent">
      <md-button class="md-icon-button">
        <md-icon class="md-primary">menu</md-icon>
      </md-button>
      <h2 class="md-title">唯美VR</h2>
      <md-button href="/">首页</md-button>
      <md-button href="/posts">浏览</md-button>
      <md-button href="/upload">上传</md-button>
      <span style="flex: 1;"></span>
      <template v-if="logined">
				<md-menu md-direction="bottom left">
					<md-button md-menu-trigger>
            {{user.name}}
						<md-icon class="md-primary">people</md-icon>
          </md-button>
					<md-menu-content>
						<md-menu-item>我</md-menu-item>
						<md-menu-item>我的模型</md-menu-item>
						<md-menu-item @click="logout">退出</md-menu-item>
					</md-menu-content>
				</md-menu>
      </template>
      <template v-else>
        <md-button href="/login">登录</md-button>
        <span>/</span>
        <md-button href="/register">注册</md-button>
      </template>
 
   </md-toolbar>
</template>
<script>
export default {
  name: 'navbar',
  components: {
  },
  data () {
    return {
      user: {},
      logined: false
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
        this.logined = true
        this.user = response.body
        console.log(`token success: ${JSON.stringify(response)}`)
      }, (response) => {
        console.log(`error: ${JSON.stringify(response)}`)
      })
    }
  },
  methods: {
    logout () {
      window.localStorage.removeItem('token')
      this.logind = false
      this.$router.push('/')
    }
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

