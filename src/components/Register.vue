<template>
  <div id="main">
    <Navigator/>
    <div class="container login-container">
      <h2 class="title">注册</h2>
      <div class="msg" v-if="!!msg">
        <el-alert :title="msg" type="warning" showIcon :closable="false"></el-alert>
      </div>

      <el-form ref="register"  :rules="rules" label-position="left" :model="form" label-width="100px">
        <el-form-item label="用户名：" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
     
        <el-form-item label="邮箱：" prop="email">
            <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="密码确认：" prop="passwordConfirm">
            <el-input type="password" v-model="form.passwordConfirm"></el-input>
        </el-form-item>
 
        <el-form-item>
            <el-button type="primary" @click="onSubmit('register')" plain>注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Vfooter/>
  </div>
</template>

<script>
import * as error from '../assets/javascripts/error.js'
export default {
  name: 'app',
  components: {
  },
  data () {
    let validateConfirm = (rule, value, callback) => {
      if(value != this.form.password) {
        callback(new Error('两次输入密码不一致!')) 
      } else {
        callback()
      }
    }
    return {
      msg: '',
      form: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 30 个字符内', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' } 
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 30, message: '长度在 8 到 30 个字符', trigger: 'blur' }
        ],
        passwordConfirm: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 8, max: 30, message: '长度在 8 到 30 个字符', trigger: 'blur' },
          { validator: validateConfirm, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      const REG_URL = `${process.env.API_URL}/users`
      // let formData = { user: this.form }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(REG_URL, { user: this.form }).then((response) => {
            // window.location.href = '/' 
            this.$router.push({path:'regged'})
            // console.log(`success: ${response}`)
            // window.localStorage.setItem('token', response.data token)
            // this.$route._router.go('/')
          }, (response) => {
            const errors = response.body.errors
            // console.log(`error: ${JSON.stringify(response.body.errors)}`)
            this.msg = error.tip(errors) 
            // console.log(`error: ${JSON.stringify(this.msg)}`)
          })
        } else {
          console.log('not valid')
        }
      })
    }
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
  padding-top: 30px;
  @include breakpoint($lg){
		width: 40%;
  }
  @include breakpoint($md){
		width: 50%;
  }
}
</style>
