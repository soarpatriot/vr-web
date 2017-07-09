<template>
  <div class="container upload-container">
  <h2 class="upload-title">上传我的模型</h2>
  <p>
  <el-alert v-if="!!errorMsg"
    :title="errorMsg"
    :closable="false"
    type="error"
    show-icon>
  </el-alert>
  </p>
   <el-form ref="form" :rules="rules" :model="post" label-width="80px">
    <el-form-item label="标题" prop="title">
      <el-input v-model="post.title"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input type="textarea" v-model="post.description"> </el-input>
    </el-form-item>
    <el-form-item label="" prop="file">
      <el-upload class="model-upload" 
         accept="application/zip" name="model" 
         drag :action="uploadUrl"
         :file-list="fileList"
         :on-success="handleSuccess"
         :on-error="handleError"
         :on-change="fileChange"> 
         <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传zip文件，且不超过50MB</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">发布</el-button>
    </el-form-item>

   </el-form>
  </div>
</template>
<script>
export default {
  name: 'file',
  components: {
  },
  data () {
    let validateFile = (rule, value, callback) => {
      if (this.fileList.length <= 0 ){
        callback(new Error('请上传文件!'))
      }else {
        callback()
      }
    }
    return {
      fileList: [],
      post: {
        title: '',
        description: '',
        file: null
      },
      assetId: 0,
      errorMsg: '',
      uploadUrl: `${process.env.ASSETS_URL}/files`,
      postUrl: `${process.env.API_URL}/posts`,
      assetUrl: `${process.env.API_URL}/assets`,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 30, message: '长度在 30 个字符内', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 255 个字符内', trigger: 'blur' }
        ],
        file: [
          { validator: validateFile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    fileChange (file, fileList) {
      this.assetId = 0
      this.errorMsg = '' 
      this.fileList = [file]
    },
    handleSuccess (response, file, fileList){
      console.log(`response: ${JSON.stringify(response)}`)
      let that = this;
      this.saveFileToDb(response, function (res) {
        that.assetId = res.body.data.id
        console.log(`id: ${that.assetId}`)
      }, function (response) {
        that.errorMsg = '十分抱歉，保存文件错误，请重试！' 
        console.log('response')
      })
    },
    handleError(err, file, fileList) {
      this.errorMsg = '十分抱歉，上传过程出现错误，请重试！' 
    },
    onSubmit (formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
          that.errorMsg = ''
          if (valid) {
            let token = window.localStorage.getItem('token')
            let tokenStr = `Token: ${token}`
            // const idArr = this.files.map((file) => file.id)
            // const ids = idArr.join(',')
            // console.log(`ready file: ${ids}`)
            // const assetId = this.fileList[0].id
            if (this.assetId) {
              this.post.file_id = this.assetId
              this.$http.post(this.postUrl, { post: this.post }, { headers: {
                'api-token': tokenStr
              }
              }).then((response) => {
                console.log(`success: ${response}`)
                // window.localStorage.removeItem('files')
                const id = response.data.data.id 
                const POST_URL = `${process.env.HOST}/#/posts/${id}`
                window.location.href = `${POST_URL}`
                // this.$router.push({path: '#/my'})
              }, (response) => {
                that.errorMsg = '十分抱歉，模型保存错误，请重试！' 
                console.log(`error: ${response}`)
              })
              console.log(`data: ${this.post}`)
            } else {
              that.errorMsg = '十分抱歉，保存文件错误，请重试！' 
            }
          } else {
            console.log('error submit!!')
            return false
          }
      })
    },
    saveFileToDb: function (file, success, error) {
      let token = window.localStorage.getItem('token')
      let tokenStr = `Token: ${token}`
      const fileObj = {
        murl: file.murl,
        filename: file.filename,
        mimetype: file.mimetype,
        relative: file.relative,
        parent: file.parent,
        parts: file.list,
        full: file.full,
        size: file.size
      }
      // const fileResult = response.body.data
      // console.log(`success: ${JSON.stringify(fileResult)}`)
      this.$http.post(this.assetUrl, { asset: fileObj },
        { headers: {'api-token': tokenStr} }).then(success, error)
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/break.scss";
@import "../assets/scss/grid.scss";
.upload-container{
  padding-top: 30px;
  @include breakpoint($xs){
		width: 90%;
  }
  @include breakpoint($sm){
		width: 75%;
  }
  @include breakpoint($md){
		width: 60%;
  }
  @include breakpoint($lg){
		width: 400px;
  }
 
}
.up-span{
  position: relative;
  overflow: hidden;
  text-align: center;
  background-color:#5cb85c;
  width: 100px; 
  display: block;
  line-height: 1.42857143;
  cursor: pointer;
  vertical-align: middle;
  white-space: nowrap;
  color: #fff;
  padding:8px 10px 8px 14px;
  marign: 0;
}
.md-input-container .up-btn{
  position: absolute;
  top:0;
  right: 0;
  margin: 0;
  opacity: 0;
  -ms-filter: 'alpha(opacity=0)';
  font-size: 200px;
  direction: ltr;
  cursor: pointer;
}
.file-img{
  max-width: 200px;
  display:block;
}
.file-tip{
  text-align: left;
}
.progress{
  text-align: left;
}

.drag-area{
  height: 100px;
  border: dashed 3px #eee;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  display: flex
}
.drag-over {
  border: dashed 3px #5cb85c;
}
.upload-form{
  text-align: left;
}
.opt-area{
  margin-top: 20px;
  text-align: center;
}
.upload-title{
  text-align: center;
}
</style>

<style lang="scss">
.model-upload{
  .el-upload{
    width: 100%;
    display: block;
  }
  .el-upload-dragger{
    width: 100%;
  }
}
</style>
