<template>
  <div class="activation">
    <navigator/>
    <div class="container activation-tip">
      <el-row>
        <el-col :span="18" :offset="3">
          <div class="msg" v-if="!!msg">
            <el-alert :title="msg" type="warning" showIcon :closable="false"></el-alert>
          </div>
        </el-col>
 
      </el-row>
       <el-row>
        <el-col :span="18"  :offset="3">
            <div v-if="sent">
              激活码已发送到您的邮箱，5小时后失效。请登陆邮箱激活您的账号！激活后，
              <router-link
                :to="`/login`"> 登陆
              </router-link>
              三维云 
            </div>
            <div v-else>
              <el-form ref="reactivate"  :rules="rules" label-position="left" :model="form" label-width="80px">
                <el-form-item label="邮箱：" prop="email">
                  <el-col :span="18">
                    <el-input v-model="form.email"></el-input>
                  </el-col>
                  <el-col class="line" :span="2">
                    &nbsp;
                  </el-col>
                  <el-col :span="4">
                    <el-button type="primary" @click="onSubmit('reactivate')">发送激活码</el-button>
                  </el-col>
                </el-form-item>
              </el-form> 
            </div>
        </el-col>
      </el-row>
    </div>
    <vfooter/>
  </div>
</template>
<style lang="scss" scoped>
.activation-tip{
  min-height: 400px;
  margin: 100px auto;
}
.active-note{
  margin: 0 auto;
  width: 600px;
}
</style>
<script>
import * as error from '../assets/javascripts/error.js'
export default {
  name: 'reactivation',
  data () {
    return {
      sent: false,
      msg: '',
      form: {
        email: '',
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' } 
        ]
      } 
    }
  },
  created () {
  },
  methods: {
    onSubmit (formName) {
      const REACTIVE_URL = `${process.env.API_URL}/users/reactivation`
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const email = this.form.email
          console.log(email) 
          this.$http.post(REACTIVE_URL, { email: email }).then((response) => {
            const m = JSON.parse(response.bodyText)
            console.log(m.code)
            if (m.code === 0) {
              this.sent = true
            } else {
              this.msg = m.msg 
            }
          }, (response) => {
            const errors = response.body.errors
            // console.log(errors)
            this.msg = error.tip(errors) 
          })
        } else {
          this.msg = "请填写正确的信息！" 
          // console.log('not valid')
        }
      })

    }
  }
}
</script>
