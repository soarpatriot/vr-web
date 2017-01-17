<template>
  <div id="main">
    <navbar></navbar>
    <div class="container login-container">
      <h1>注册</h1>
      <form class="upload-form" novalidate @submit.prevent="submit">
        <md-input-container :class="{ 'md-input-invalid': hasError('user.name') }">
          <label>用户名</label>
          <md-input @change="validate" v-model="user.name" required></md-input>
          <span v-show="hasError('user.name')" class="md-error">{{errorOne('user.name')}}</span>
        </md-input-container>
        <md-input-container>
          <label>邮箱</label>
          <md-input v-model="user.email" required></md-input>
        </md-input-container>
        <md-input-container md-has-password>
          <label>密码</label>
          <md-input v-model="user.password"  required type="password"></md-input>
        </md-input-container> 
        <md-input-container md-has-password>
          <label>密码确认</label>
          <md-input v-model="user.passwordConfirm" required type="password"></md-input>
        </md-input-container> 
 
        <md-button type="submit"  class="md-raised md-primary">登录</md-button>


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
      name: '',
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
      this.validate()
      let formData = JSON.stringify(this.user)
      if (!this.any()) {
        console.log(`data: ${formData}`)
      }
    },
    validate () {
      this.errors = []
      if (this.user.name === '') {
        let error = {field: 'user.name', type: 'required', tip: '请填写用户名！'}
        console.log('aa')
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
        console.log(`error: ${errors[0]}`)
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
