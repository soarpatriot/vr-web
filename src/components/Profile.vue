<template>
  <div id="main">
    <navigator/>
    <div class="container">
      <div class="profile-container">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-upload
              class="avatar-uploader"
              :action="QINIU_URL"
              :show-file-list="false"
              :data="extraInfo"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="user.avatar_url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> 

          </el-col>
          <el-col :span="12">
            <div class="avatar-change-area">
              <el-button  round>更改头像</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="space">
          <el-col :span="12">
            昵称
          </el-col>
           <el-col :span="12">
            {{user.name}}
          </el-col>
        </el-row>
        <hr class="hr"/> 
        <el-row :gutter="20" class="space">
          <el-col :span="12">
            邮箱
          </el-col>
           <el-col :span="12">
            {{user.email}}
          </el-col>
        </el-row>
        <hr class="hr"/> 
      </div> 
    </div> 
    <vfooter/>

  </div> 
  </template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        user: {
          id: 0,
          name: '',
          email: '',
          avatar_url: ''
        },
        errorMsg: '',
        extraInfo: {
          token: 'sdfasd',
          key: ''
        },
        QINIU_URL: "http://up-z1.qiniu.com",
        imageUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDk3NDQ3Mjk4Njk2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExNzAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODMwLjAzMiA2ODEuMDA4Yy05Ljc3Ni05Ljc5Mi0yNS42LTkuNzkyLTM1LjM0NCAwLTkuNzQ0IDkuNzI4LTkuNzQ0IDI1LjYgMC4wMzIgMzUuMzI4IDc1LjUwNCA3NS41MzYgMTE3LjA1NiAxNzUuOTA0IDExNy4wNTYgMjgyLjY4OCAwIDEzLjgwOCAxMS4xODQgMjQuOTkyIDI1LjAwOCAyNC45OTJzMjQuOTc2LTExLjE2OCAyNC45NzYtMjQuOTkyQzk2MS43NDQgODc4Ljg5NiA5MTQuOTc2IDc2NS45MzYgODMwLjAzMiA2ODEuMDA4ek01MTIuMDE2IDBjLTE2NS4zNDQgMC0yOTkuODQgMTM0LjQ5Ni0yOTkuODQgMjk5LjgyNCAwIDExOC4wNDggNjguNzM2IDIyMC4wOCAxNjguMTQ0IDI2OC45Ni02OS42NDggMjEuMjE2LTEzMy40MjQgNTkuMzEyLTE4Ni4zMzYgMTEyLjIyNC04NC45NDQgODQuOTQ0LTEzMS43MTIgMTk3Ljg4OC0xMzEuNzEyIDMxOC4wMTZDNjIuMjcyIDEwMTIuODMyIDczLjQ1NiAxMDI0IDg3LjI0OCAxMDI0YzEzLjgwOCAwIDI1LjAwOC0xMS4xNjggMjUuMDA4LTI0Ljk5MiAwLTEwNi43ODQgNDEuNTY4LTIwNy4xNTIgMTE3LjA4OC0yODIuNjg4IDc0LjE0NC03NC4xOTIgMTcyLjM2OC0xMTUuNTA0IDI3Ny4wNTYtMTE2Ljk2IDEuODg4IDAuMDMyIDMuNzI4IDAuMjg4IDUuNjMyIDAuMjg4IDE2NS4zMjggMCAyOTkuODI0LTEzNC41MTIgMjk5LjgyNC0yOTkuODRDODExLjg0IDEzNC40OCA2NzcuMzQ0IDAgNTEyLjAxNiAwek01MTQuNjcyIDU0OS41MzZjLTAuODk2LTAuMDk2LTEuNzc2LTAuMjcyLTIuNjg4LTAuMjcyLTEuNzkyIDAtMy41ODQgMC4xMTItNS4zNiAwLjEyOC0xMzUuMjQ4LTIuOTEyLTI0NC40NDgtMTEzLjYzMi0yNDQuNDQ4LTI0OS41NjggMC0xMzcuNzYgMTEyLjA5Ni0yNDkuODU2IDI0OS44NTYtMjQ5Ljg1NnMyNDkuODg4IDExMi4wOTYgMjQ5Ljg4OCAyNDkuODU2Qzc2MS45MDQgNDM2LjY4OCA2NTEuMjE2IDU0OC4wOTYgNTE0LjY3MiA1NDkuNTM2eiIgcC1pZD0iMTE3MSIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg=='
      }
    },
    created () {
      const USER_INFO_URL = `${process.env.API_URL}/users/me`
      let token = window.localStorage.getItem('token')
      let tokenStr = `Token: ${token}`
      axios.get(USER_INFO_URL, {headers: {'api-token': tokenStr}})
        .then((response) => {
          const user= response.data.data
          this.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar_url: user.avatar_url || this.imageUrl
          }
          console.log(`token: ${JSON.stringify(response)}`)
        })
        .catch((error) => {
          console.log(`token error: ${error}`)
        })
    },
    methods: {
      upload() {
      },
      handleAvatarSuccess(res, file) {
        const DOMAIN = "http://p03vsh3hj.bkt.clouddn.com"
        const SUFIX = "imageView2/1/w/200/h/200/q/75|imageslim"
        const IMG_URL = `${DOMAIN}/${res.key}?${SUFIX}`
        console.log(JSON.stringify(res))
        console.log(JSON.stringify(file))
        // this.imageUrl = URL.createObjectURL(file.raw)
        this.imageUrl = IMG_URL
        const AVATAR_URL = `${process.env.API_URL}/users/${this.user.id}`
        let token = window.localStorage.getItem('token')
        let tokenStr = `Token: ${token}`
        let params = {avatar_url: IMG_URL}
        axios.put(AVATAR_URL, {user: params}, {headers: {'api-token': tokenStr}})
          .then((response) => {
            console.log(`token: ${JSON.stringify(response)}`)
          })
          .catch((error) => {
            // that.errorMsg = '十分抱歉，模型保存错误，请重试！' 
            console.log(`token error: ${error}`)
          })
 
      },
      beforeAvatarUpload(file) {
        let that = this
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
          return isJPG
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
          return isLt2M
        }
        const TOKEN_URL = `${process.env.API_URL}/users/qtoken`
        let token = window.localStorage.getItem('token')
        let tokenStr = `Token: ${token}`
        return axios.post(TOKEN_URL, {}, {headers: {'api-token': tokenStr}})
          .then((response) => {
            console.log(`token: ${JSON.stringify(response)}`)
            const extraInfo = {
              token: response.data.token
            }
            this.extraInfo = extraInfo
            console.log(`token extra: ${JSON.stringify(this.extraInfo)}`)
          })
          .catch((error) => {
            that.errorMsg = '十分抱歉，模型保存错误，请重试！' 
            console.log(`token error: ${error}`)
          })
      }
    }
  }
</script>
<style scope="scoped">
  .space{
    margin-top: 40px;
  }
  .avatar-change-area{
    height: 178px;
    line-height: 178px;
    display: inline-block;
    vertical-align: middle;
  }
  .profile-container {
    font-size: 14px;
    width: 60%;
    text-align: center;
    margin: 40px auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    background: #DFE4ED;
    width: 178px;
    display: block;
  }
  .hr {
    border: 1px dashed #EDF2FC;
    height: 0;
  }
</style>


