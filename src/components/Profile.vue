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
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> 

          </el-col>
          <el-col :span="12">
            <div class="avatar-change-area">
                更改头像
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
          name: '',
          email: ''
        },
        errorMsg: '',
        extraInfo: {
          token: 'sdfasd',
          key: ''
        },
        QINIU_URL: "http://up-z1.qiniu.com",
        imageUrl: ''
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
            name: user.name,
            email: user.email
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
        this.imageUrl = URL.createObjectURL(file.raw)
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
    width: 178px;
    display: block;
  }
  .hr {
    border: 1px solid #EDF2FC;
    height: 0;
  }
</style>


