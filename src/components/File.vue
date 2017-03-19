<template>
  <div class="container upload-container">
   <template v-if="!done">
   <h1>上传我的VR</h1>
   <form class="upload-form" novalidate @submit.stop.prevent="submit">
		<md-input-container :class="{ 'md-input-invalid': hasError('post.title') }">
			<label>标题</label>
			<md-input v-model.trim="post.title" @change="validate" debounce="500" required></md-input>
      <span v-show="hasError('post.title')" class="md-error">{{errorOne('post.title')}}</span>
		</md-input-container>
	  <md-input-container :class="{ 'md-input-invalid': hasError('post.description') }">
			<label>描述</label>
			<md-textarea v-model.trim="post.description" @change="validate" debounce="500" required></md-textarea>
      <span v-show="hasError('post.description')" class="md-error">{{errorOne('post.description')}}</span>
		</md-input-container>
    <bar v-for="file in files" :file="file"></bar>

    <md-input-container :class="{ 'md-input-invalid': hasError('post.file') }">
      <span class="up-span md-raised md-primary"> 
         选择文件 
				<input class="up-btn" @change="onFileChange" type="file" multiple></input>
      </span>
      <span v-show="hasError('post.file')" class="md-error">{{errorOne('post.file')}}</span>
		</md-input-container>


    <div 
      v-bind:class="[{'drag-over': isDragOver}, 'drag-area']"
      @dragover="onDragOver"
      @drop="onDrop">
      拖拽到这里上传
    </div>
    <div class="opt-area">
      <md-button type="submit" class="md-raised md-primary">发布</md-button>
    </div>
    </form> 
    </template>
    <template v-else>
      <p>模型已上传成功</p>
    </template>
  </div>
</template>

<script>
import Bar from './Bar'
export default {
  name: 'file',
  components: {
    Bar
  },

  data () {
    return {
      post: {
        title: '',
        description: '',
        file: null
      },
      files: [],
      errors: [],
      url: 'http://localhost:3000/files',
      isDragOver: false,
      image: '',
      name: '',
      size: '',
      type: '',
      progress: 0,
      done: false,
      msg: ''
    }
  },
  methods: {
    add (file) {
      // url: 'http://assets.dreamreality.cn/files',
      this.files.push(file)
    },
    validate () {
      this.errors = []
      if (this.post.title === '') {
        let error = {field: 'post.title', type: 'required', tip: '请填写标题！'}
        this.errors.push(error)
      }
      if (this.post.description === '') {
        let error = {field: 'post.description', type: 'required', tip: '请填写描述！'}
        this.errors.push(error)
      }
      console.log(`file: ${this.post.file}`)
      if (this.post.file === null || this.post.file === '') {
        let error = {field: 'post.file', type: 'required', tip: '请上传文件！'}
        this.errors.push(error)
      }
      console.log(`errors: ${this.errors.length}`)
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
    },
    submit (e) {
      let files = window.localStorage.getItem('files')
      let token = window.localStorage.getItem('token')
      let tokenStr = `Token: ${token}`
      const POST_URL = 'http://localhost:4000/posts'
      if (files) {
        let fileArr = JSON.parse(files)
        let file = fileArr[0]
        this.post.file = file
        console.log(`ready file: ${file.filename}`)
      }
      this.validate()
      if (!this.any()) {
        console.log('aa')
        this.$http.post(POST_URL, { post: this.post }, { headers: {
          'api-token': tokenStr
        }
        }).then((response) => {
          console.log(`success: ${response}`)
          this.done = true
          window.localStorage.removeItem('files')
        }, (response) => {
          console.log(`error: ${response}`)
        })
        console.log(`data: ${this.post}`)
      }
      console.log(files)
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      var file = files[0]
      const name = file.name
      const size = (file.size / 1024 / 1024).toFixed(2)
      const type = file.type
      let fileObj = {
        image: false,
        name: name,
        size: size,
        type: type,
        progress: 20,
        msg: 'ok',
        relative: ''
      }
      // this.files.push(fileObj)
      // const len = this.files.length
      if (this.isImage(files[0])) {
        this.createImage(files[0])
      } else {
        this.removeImage()
      }
      this.add(fileObj)
      this.upload(file, fileObj)
    },
    onDragOver (e) {
      e.preventDefault()
      this.isDragOver = true
    },
    onDrop (e) {
      e.preventDefault()
      this.isDragOver = false
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      var file = files[0]
      this.optFile(file)
    },
    optFile (file) {
      this.name = file.name
      this.size = (file.size / 1024 / 1024).toFixed(2)
      this.type = file.type
      if (this.isImage(file)) {
        this.createImage(file)
      } else {
        this.removeImage()
      }
      this.upload(file)
    },
    createImage (file) {
      // var image = new Image()
      var reader = new window.FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      this.image = ''
    },
    isImage: function (file) {
      var acceptedTypes = {
        'image/png': true,
        'image/jpeg': true,
        'image/gif': true
      }
      return acceptedTypes[file.type] === true
    },
    upload: function (file, fileObj) {
      var that = this
      if (window.FormData) {
        var formData = new window.FormData()
        formData.append('upload', file)
      }
      var xhr = new window.XMLHttpRequest()
      xhr.open('POST', this.url)
      xhr.onload = function () {
        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText)
          console.log(`上传成功: ${result[0].relative}`)
          fileObj.relative = result[0].relative
          fileObj.msg = '上传成功！'
          window.localStorage.setItem('files', xhr.responseText)
          console.log(`上传成功: ${xhr.responseText}`)
        } else {
          fileObj.msg = '上传出错，请重试！'
          // fileObj.msg = '上传出错，请重试！'
          console.log('出错了')
        }
      }
      xhr.onerror = function () {
        that.msg = '服务没有响应！'
        console.log('远程服务器错误')
      }
      xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
          var complete = (event.loaded / event.total * 100 | 0)
          console.log(complete)
          that.progress = complete
          fileObj.progress = complete
        }
      }
      xhr.send(formData)
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/break.scss";
@import "../assets/scss/grid.scss";
.upload-container{
  padding-top: 30px;
  @include breakpoint($lg){
		width: 50%;
 
  }
  @include breakpoint($md){
		width: 80%;
 
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
</style>

