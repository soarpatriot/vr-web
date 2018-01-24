<template>
  <div id="main">
    <navigator/>
    <div class="container">
      <div class="profile-container">
        <el-row :gutter="20">
          <el-col :span="8" :offset="8">
            <div class="avatar-wrapper">
              <img :src="user.avatar_url" class="avatar">
            </div>
            <div class="progress-bar" :class="{'progressing': showProgress}">
              <el-progress :percentage="percentage"></el-progress>
            </div>
            <el-upload
              class="avatar-uploader"
              :action="QINIU_URL"
              :show-file-list="false"
              :data="extraInfo"
              :drag="true"
              :on-progress="handleProgress"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <i class="el-icon-plus avatar-uploader-icon">更改头像</i>
              <p class="upload-tip">点击或拖动文件到此区域</p>
            </el-upload> 

          </el-col>
        </el-row>
        <el-row :gutter="20" class="space">
          <el-col :span="8">
            昵称
          </el-col>
           <el-col :span="16">
            {{user.name}}
          </el-col>
        </el-row>
        <hr class="hr"/> 
        <el-row :gutter="20" class="space">
          <el-col :span="8">
            邮箱
          </el-col>
           <el-col :span="16">
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
  import * as user from '../assets/javascripts/user.js'
  export default {
    data() {
      return {
        user: {
          id: 0,
          name: '',
          email: '',
          avatar_url: ''
        },
        showProgress: false,
        percentage: 0,
        errorMsg: '',
        extraInfo: {
          token: 'sdfasd',
          key: ''
        },
        QINIU_URL: "https://up-z1.qbox.me",
        imageUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNDk3NDQ3Mjk4Njk2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExNzAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODMwLjAzMiA2ODEuMDA4Yy05Ljc3Ni05Ljc5Mi0yNS42LTkuNzkyLTM1LjM0NCAwLTkuNzQ0IDkuNzI4LTkuNzQ0IDI1LjYgMC4wMzIgMzUuMzI4IDc1LjUwNCA3NS41MzYgMTE3LjA1NiAxNzUuOTA0IDExNy4wNTYgMjgyLjY4OCAwIDEzLjgwOCAxMS4xODQgMjQuOTkyIDI1LjAwOCAyNC45OTJzMjQuOTc2LTExLjE2OCAyNC45NzYtMjQuOTkyQzk2MS43NDQgODc4Ljg5NiA5MTQuOTc2IDc2NS45MzYgODMwLjAzMiA2ODEuMDA4ek01MTIuMDE2IDBjLTE2NS4zNDQgMC0yOTkuODQgMTM0LjQ5Ni0yOTkuODQgMjk5LjgyNCAwIDExOC4wNDggNjguNzM2IDIyMC4wOCAxNjguMTQ0IDI2OC45Ni02OS42NDggMjEuMjE2LTEzMy40MjQgNTkuMzEyLTE4Ni4zMzYgMTEyLjIyNC04NC45NDQgODQuOTQ0LTEzMS43MTIgMTk3Ljg4OC0xMzEuNzEyIDMxOC4wMTZDNjIuMjcyIDEwMTIuODMyIDczLjQ1NiAxMDI0IDg3LjI0OCAxMDI0YzEzLjgwOCAwIDI1LjAwOC0xMS4xNjggMjUuMDA4LTI0Ljk5MiAwLTEwNi43ODQgNDEuNTY4LTIwNy4xNTIgMTE3LjA4OC0yODIuNjg4IDc0LjE0NC03NC4xOTIgMTcyLjM2OC0xMTUuNTA0IDI3Ny4wNTYtMTE2Ljk2IDEuODg4IDAuMDMyIDMuNzI4IDAuMjg4IDUuNjMyIDAuMjg4IDE2NS4zMjggMCAyOTkuODI0LTEzNC41MTIgMjk5LjgyNC0yOTkuODRDODExLjg0IDEzNC40OCA2NzcuMzQ0IDAgNTEyLjAxNiAwek01MTQuNjcyIDU0OS41MzZjLTAuODk2LTAuMDk2LTEuNzc2LTAuMjcyLTIuNjg4LTAuMjcyLTEuNzkyIDAtMy41ODQgMC4xMTItNS4zNiAwLjEyOC0xMzUuMjQ4LTIuOTEyLTI0NC40NDgtMTEzLjYzMi0yNDQuNDQ4LTI0OS41NjggMC0xMzcuNzYgMTEyLjA5Ni0yNDkuODU2IDI0OS44NTYtMjQ5Ljg1NnMyNDkuODg4IDExMi4wOTYgMjQ5Ljg4OCAyNDkuODU2Qzc2MS45MDQgNDM2LjY4OCA2NTEuMjE2IDU0OC4wOTYgNTE0LjY3MiA1NDkuNTM2eiIgcC1pZD0iMTE3MSIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg=='
      }
    },
    created () {
      user.me((user) => {
        this.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url
        }
      }, (e) => {
        console.log(`error: ${e}`)
        // QINIU_URL: "http://up-z1.qiniu.com",
      })
    },
    methods: {
      upload() {
      },
      handleProgress(event, file, fileList){
        const percent = event.percent.toFixed(0)
        this.percentage = parseInt(percent)
        // console.log(percent)
      },
      handleAvatarSuccess(res, file) {
        const DOMAIN = `${process.env.STATIC_URL}`
        const SUFIX = "imageView2/1/w/200/h/200/q/75|imageslim"
        const IMG_URL = `${DOMAIN}/${res.key}?${SUFIX}`
        this.showProgress = false
        // console.log(JSON.stringify(res))
        // console.log(JSON.stringify(file))
        // this.imageUrl = URL.createObjectURL(file.raw)
        this.imageUrl = IMG_URL
        const AVATAR_URL = `${process.env.API_URL}/users/${this.user.id}`
        let token = window.localStorage.getItem('token')
        let tokenStr = `Token: ${token}`
        let params = {avatar_url: IMG_URL}
        axios.put(AVATAR_URL, {user: params}, {headers: {'api-token': tokenStr}})
          .then((response) => {
            // console.log(`token: ${JSON.stringify(response)}`)
          })
          .catch((error) => {
            // that.errorMsg = '十分抱歉，模型保存错误，请重试！' 
            console.log(`token error: ${error}`)
          })
 
      },
      beforeAvatarUpload(file) {
        let that = this
        this.showProgress = true
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          // this.$message.error('上传头像图片只能是 JPG 格式!')
          // return isJPG
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
            // console.log(`token: ${JSON.stringify(response)}`)
            const extraInfo = {
              token: response.data.token
            }
            this.extraInfo = extraInfo
            // console.log(`token extra: ${JSON.stringify(this.extraInfo)}`)
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
  .el-upload-dragger{
    padding: 0 20px;
    width: 100%;
    height: 64px;
    &:hover{
      .upload-tip{
        display: block;
      }
    }
 
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
    height: 64px;
    line-height: 64px;
    text-align: center;
  }
  .avatar {
    border: 3px solid #EDF2FC;
    background: #DFE4ED;
    width: 100%;
    max-width: 200px;
    // width: 178px;
    // display: block;
  }
  .upload-tip{
    display: none;
    position: absolute;
  }
  .hr {
    border: 1px dashed #EDF2FC;
    height: 0;
  }
.avatar-wrapper{
  text-align:center;
  margin: 20px auto;
}
.progress-bar{
  display:none;
  text-align:center;
  margin: 20px auto;
}
.progressing{
  display:block
}
</style>


