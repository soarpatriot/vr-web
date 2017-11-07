<template>
  <div id="main">
    <Navigator/>
    <div class="container login-container">
      <h2 class="h1">登录</h2>
      <div class="login-area">
        <div class="msg" v-if="!!msg">
          <el-alert :title="msg" type="warning" showIcon :closable="false"></el-alert>
        </div>
				<el-form ref="form" :rules="rules" :model="user" label-width="80px">
						<el-form-item label="邮箱：" prop="email">
								<el-input v-model="user.email"></el-input>
						</el-form-item>
						<el-form-item label="密码：" prop="password">
								<el-input type="password" v-model="user.password"></el-input>
						</el-form-item>
						<el-form-item>
								<el-button type="primary" @click="onSubmit('form')">登陆</el-button>
                <router-link class="a-link"
                  :to="`/reactivation`"> 激活账号
                </router-link>
	
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
      msg: '',
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
    onSubmit (formName) {
      const REG_URL = `${process.env.API_URL}/login`
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
      })
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/break.scss";
@import "../assets/scss/grid.scss";
.a-link{
  float: right;
  margin: 0 10px;
  text-decoration: none;
}
.h1{
 text-align: center;
}
.tip{
 color: #ff5722;
 padding: 10px 20px;
 background-color: rgba(0, 0, 0, 0.15);
}
.msg{
  margin: 10px auto;
}
.login-container{
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  
  @include breakpoint($lg){
		width: 40%;
  }
  @include breakpoint($md){
		width: 50%;
  }

}
</style>
