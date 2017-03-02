<template>
 <div id="main" class="my-navbar">
       
        <div class="md-hide-medium-and-up">
			    <md-toolbar class="md-accent md-hide-xsmall-and-up">
						<md-button class="md-icon-button" @click.native="$refs.sidenav.toggle()">
							<md-icon class="md-primary">menu</md-icon>
						</md-button>
				    <h2 class="md-title">三维云</h2>
		      </md-toolbar>
        </div>  
        <div class="md-hide-small container">
			   <md-toolbar class="md-accent">
				 <h2 class="md-title">三维云</h2>
					<md-button href="/">首页</md-button>
					<md-button href="/posts">浏览</md-button>
					<md-button href="/upload">上传</md-button>
					<span style="flex: 1;"></span>
					<template v-if="logined">
						<md-menu  md-align-trigger md-direction="bottom left">
							<md-button md-menu-trigger>
								{{user.name}}
								<md-icon class="md-primary">people</md-icon>
							</md-button>
							<md-menu-content>
								<md-button @click.native="logout">退出</md-button>
							</md-menu-content>
						</md-menu>
					</template>
					<template v-else>
						<md-button href="/login">登录</md-button>
						<span>/</span>
						<md-button href="/register">注册</md-button>
					</template>
		 
			</md-toolbar>
    </div>  
		<md-sidenav md-theme="black" class="md-left" ref="sidenav">
			<md-toolbar class="md-account-header">
				<md-list class="md-transparent">
					<md-list-item class="md-avatar-list">
						<md-avatar class="md-large">
							<img src="https://placeimg.com/64/64/people/8" alt="People">
						</md-avatar>

						<span style="flex: 1"></span>

						<md-avatar>
							<img src="https://placeimg.com/40/40/people/3" alt="People">
						</md-avatar>

						<md-avatar>
							<img src="https://placeimg.com/40/40/people/4" alt="People">
						</md-avatar>
					</md-list-item>

					<md-list-item>
						<div class="md-list-text-container">
							<span>John Doe</span>
							<span>johndoe@email.com</span>
						</div>

						<md-button class="md-icon-button md-list-action">
							<md-icon>arrow_drop_down</md-icon>
						</md-button>
					</md-list-item>
				</md-list>
			</md-toolbar>
			<md-list>
				<md-list-item href="/" @click.native="$refs.sidenav.toggle()" class="md-primary">
					<md-icon>insert_drive_file</md-icon> <span>首页</span>
				</md-list-item>

				<md-list-item href="/posts" @click.native="$refs.sidenav.toggle()">
					<md-icon>people</md-icon> <span>浏览</span>
				</md-list-item>

				<md-list-item href="/upload" @click.native="$refs.sidenav.toggle()">
					<md-icon>access_time</md-icon> <span>上传</span>
				</md-list-item>
			</md-list>
		</md-sidenav>
</div>
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
  computed: {
    // logined () {
    //  return this.$store.state.logined
    // }
  },
  created () {
    let token = window.localStorage.getItem('token')
    // const USER_URL = 'http://localhost:4000/validate'
    const USER_URL = `${process.env.API_URL}/validate`
    if (token) {
      let tokenStr = `Token: ${token}`
      console.log(`token: ${tokenStr}`)
      this.$http.get(USER_URL, { headers: {
        'api-token': tokenStr
      } }).then((response) => {
        this.logined = true
        this.user = response.body
        // console.log(`token success: ${JSON.stringify(response)}`)
      }, (response) => {
        console.log(`error: ${JSON.stringify(response)}`)
      })
    }
  },
  methods: {
    logout () {
      console.log('fff')
      this.logined = false
      window.localStorage.removeItem('token')
      window.location.href = '/'
      // this.$route.router.go('/')
      // this.$router.push('/')
    }
  }
}
</script>
<style>
.my-navbar{
  background-color: #000; 
  color: rgba(255, 255, 255, .87);
  // color: #fff;
  // background: rgba(0,0,0,.9);
  box-shadow: 0 1px 5px rgba(0,0,0,.15)
}

 
</style>

