<template>
 <div class="head-wrapper">
	<div class="container">
    <ul class="nav">
      <li class="nav-item">
        <a class="active" href="/login">登陆</a>
      </li>
      <li class="nav-item">
        <a href="/login">浏览</a>
      </li>
 
    </ul>
  </div>

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
<style lang="scss" scoped>
body {
  margin: 0;
}
a {
 text-decoration: none;
}
.nav{
  position: relative;
  background: transparent;
  line-height: 80px;
  padding: 0;
  margin: 0;
}
.nav-item{
  float: left;
  list-style: none;
  position: relative;
  cursor: pointer;
  margin-left: 20px;
  a {
    font-size: 16px;
    box-sizing: border-box;
    text-decoration: none;
    color: #fff;
    display: block;
    padding: 0 20px;
    opacity: .8;
    &:hover {
      opacity: 1;
    }
  }
  a.active{
    &:before{
      content: "";
			display: block;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 4px;
			background: #99d2fc;
    }
  }
}
.head-wrapper{
  height: 80px;
  background-color: rgb(32, 160, 255);
  // background-color: #000; 
  // color: rgba(255, 255, 255, .87);
  // color: #fff;
  // background: rgba(0,0,0,.9);
  box-shadow: 0 1px 5px rgba(0,0,0,.15)
}
.logined-menu{
  text-transform: none;
}
 
</style>

