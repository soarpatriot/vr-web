<template>
  <div class="container upload-container">
   <h1>上传我的VR</h1>
   <form class="upload-form" novalidate @submit.stop.prevent="submit">
		<md-input-container>
			<label>标题</label>
			<md-input required></md-input>
		</md-input-container>

		<md-input-container>
			<label>描述</label>
			<md-textarea required></md-textarea>
		</md-input-container>
    <div v-if="name" class="img-show">
			<img :src="image" class="file-img"/>
			<p class="file-tip">
				 {{name}}, {{size}}M, 类型：{{type}}
			</p>
			<p class="progress">
				<progress class="prgoress-bar" min="0" max="100" v-bind:value="progress">{{progress}}</progress>
				{{progress}}%
			</p>
			<p class="md-body-2">
				{{msg}}
			</p>
	
    </div>
	  <md-input-container>
      <span class="up-span md-raised md-primary"> 
         选择文件 
				<input class="up-btn" @change="onFileChange" type="file"></input>
      <span>
		</md-input-container>
    <div 
      v-bind:class="[{'drag-over': isDragOver}, 'drag-area']"
      @dragover="onDragOver"
      @drop="onDrop">
      拖拽文件到此次上传文件
    </div>
    <div class="opt-area">
      <md-button type="submit" v-md-theme="'phone'" class="md-raised md-primary">发布</md-button>
    </div>


    </form> 
  </div>
</template>

<script>
export default {
  name: 'foo',
  data () {
    return {
      isDragOver: false,
      image: '',
      name: '',
      size: '',
      type: '',
      progress: 0,
      url: 'http://assets.dreamreality.cn/files',
      msg: ''
    }
  },
  methods: {
    submit (e) {
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      var file = files[0]
      this.name = file.name
      this.size = (file.size / 1024 / 1024).toFixed(2)
      this.type = file.type
      if (this.isImage(files[0])) {
        this.createImage(files[0])
      } else {
        this.removeImage()
      }
      this.upload(file)
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
    upload: function (file) {
      var that = this
      if (window.FormData) {
        var formData = new window.FormData()
        formData.append('upload', file)
      }
      var xhr = new window.XMLHttpRequest()
      xhr.open('POST', this.url)
      xhr.onload = function () {
        if (xhr.status === 200) {
          that.msg = '上传成功！'
          console.log('上传成功')
        } else {
          that.msg = '上传出错，请重试！'
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
        }
      }
      xhr.send(formData)
    }
  }

}
</script>

<style lang="scss">
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

