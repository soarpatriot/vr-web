<template>
  <div id="main">
    <Navigator/>
    <div class="container login-container">
      <h2 class="h1">登录</h2>
      <div class="login-area">
				<el-form ref="form" :rules="rules" :model="user" label-width="80px">
						<el-form-item label="用户名：" prop="email">
								<el-input v-model="user.email"></el-input>
						</el-form-item>
						<el-form-item label="密码：" prop="password">
								<el-input v-model="user.password"></el-input>
						</el-form-item>
						<el-form-item>
								<el-button type="primary" @click="onSubmit">登陆</el-button>
						</el-form-item>
				</el-form>
      </div>
        
    </div>
  </div>
</template>

<script>
import Navigator from './Navigator'
export default {
  name: 'app',
  components: {
    Navigator
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 30 个字符内', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 30, message: '长度在 8 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      const REG_URL = `${process.env.API_URL}/login`
      this.$http.post(REG_URL, { session: this.user }).then((response) => {
        // console.log(`success: ${JSON.stringify(response)}`)
        // console.log(`success: ${response.body.token}`)
        // this.$store.commit('login')
        window.localStorage.setItem('token', response.body.token)
        window.location.href = '/'
        // this.$router.push('/')
      }, (response) => {
        const status = response.status
        if (status === 0) {
          this.msg = '服务暂时连接不上，请重试！'
        } else {
          this.msg = response.body.msg
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/break.scss";
@import "../assets/scss/grid.scss";
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
