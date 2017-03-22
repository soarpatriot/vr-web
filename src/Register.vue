<template>
  <div id="main">
    <div class="container login-container">
      <h1>注册</h1>
      <div v-show="done">
        <md-card md-with-hover>
					<md-card-header>
						<div class="md-subhead">注册成功</div>
					</md-card-header>

					<md-card-content>
            感谢您加入我们
					</md-card-content>

					<md-card-actions>
						<md-button class="md-primary" href="/login">登录</md-button>
						<md-button href="/">首页</md-button>
					</md-card-actions>
				</md-card>

		  </div>
      <form v-show="!done" class="upload-form" novalidate @submit.prevent="submit">
        <md-input-container :class="{ 'md-input-invalid': hasError('user.name') }">
          <label>用户名</label>
          <md-input @change="validate" v-model="user.name" required></md-input>
          <span v-show="hasError('user.name')" class="md-error">{{errorOne('user.name')}}</span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': hasError('user.email') }"  >
          <label>邮箱</label>
          <md-input v-model="user.email" required></md-input>
          <span v-show="hasError('user.email')" class="md-error">{{errorOne('user.email')}}</span>
        </md-input-container>
        <md-input-container :class="{ 'md-input-invalid': hasError('user.password') }" md-has-password>
          <label>密码</label>
          <md-input v-model="user.password"  required type="password"></md-input>
          <span v-show="hasError('user.password')" class="md-error">{{errorOne('user.password')}}</span>
        </md-input-container> 
        <md-input-container md-has-password :class="{ 'md-input-invalid': hasError('user.passwordConfirm') }">
          <label>密码确认</label>
          <md-input v-model="user.passwordConfirm" required type="password"></md-input>
          <span v-show="hasError('user.passwordConfirm')" class="md-error">{{errorOne('user.passwordConfirm')}}</span>
        </md-input-container> 
 
        <md-button type="submit"  class="md-raised md-primary">登录</md-button>


      </form> 
     
    </div>
  </div>
</template>

<script>
import Icon from 'vue-icons'
export default {
  name: 'app',
  components: {
    Icon
  },
  data () {
    return {
      done: false,
      user: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
      },
      errors: []
    }
  },
  methods: {
    submit () {
      // this.$validator.validateAll()
      const REG_URL = `${process.env.API_URL}/users`
      this.validate()
      let formData = { user: this.user }
      if (!this.any()) {
        this.$http.post(REG_URL, { user: this.user }).then((response) => {
          console.log(`success: ${response}`)
          // window.localStorage.setItem('token', response.data token)
          this.done = true
          // this.$route._router.go('/')
        }, (response) => {
          console.log(`error: ${response}`)
        })
        console.log(`data: ${formData}`)
      }
    },
    validate () {
      this.errors = []
      if (this.user.name === '') {
        let error = {field: 'user.name', type: 'required', tip: '请填写用户名！'}
        this.errors.push(error)
      }
      if (this.user.email === '') {
        let error = {field: 'user.email', type: 'required', tip: '请填写邮箱！'}
        this.errors.push(error)
      }
      if (this.user.password === '') {
        let error = {field: 'user.password', type: 'required', tip: '密码必须填写哦！'}
        this.errors.push(error)
      }
      if (this.user.passwordConfirm === '') {
        let error = {field: 'user.passwordConfirm', type: 'required', tip: '确认密码必须填写哦！'}
        this.errors.push(error)
      }
      if (this.user.passwordConfirm !== this.user.password) {
        let error = {field: 'user.passwordConfirm', type: 'match', tip: '两次输入密码不匹配！'}
        this.errors.push(error)
      }
    },
    any () {
      return this.errors.length > 0
    },
    hasError (field) {
      let errors = this.errorArray(field)
      return errors.length > 0
    },
    errorOne (field) {
      let errors = this.errorArray(field)
      if (errors && errors.length > 0) {
        return errors[0].tip
      }
    },
    errorArray (field) {
      return this.errors.filter(error => error.field === field)
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
