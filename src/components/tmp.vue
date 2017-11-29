                   <a-scene class="scene" embedded>
                    <a-sky :src="post.full"></a-sky>
                  </a-scene>
	   

<md-toolbar class="md-large" v-md-theme="'green'">
    <div class="md-toolbar-container">
      <md-button class="md-icon-button">
        <icon name="material-menu"></icon>
      </md-button>

      <span style="flex: 1;"></span>

      <md-button class="md-icon-button">
        <md-icon>search</md-icon>
      </md-button>

      <md-button class="md-icon-button">
        <md-icon>filter_list</md-icon>
      </md-button>
    </div>

    <div class="md-toolbar-container">
      <h2 class="md-title">Vue Material</h2>

      <md-button class="md-fab md-fab-bottom-right">
        <icon name="material-add"></icon>
      </md-button>
    </div>
    </md-toolbar>

    <md-input-container :class="{ 'md-input-invalid': hasError('post.file') }">
      <span class="up-span md-raised md-primary"> 
         选择文件 
				<input class="up-btn" @change="onFileChange" type="file"></input>
      </span>
      <span v-show="hasError('post.file')" class="md-error">{{errorOne('post.file')}}</span>
		</md-input-container>

      // THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader())
      let manager = new THREE.LoadingManager()
      manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total)
      }
      let texture = new THREE.Texture()
      let loader = new THREE.ImageLoader(manager)
      loader.load('textures/UV_Grid_Sm.jpg', function (image) {
        texture.image = image
        texture.needsUpdate = true
      })
      let objLoader = new THREE.ObjectLoader(manager)
      objLoader.load('http://localhost:8080/static/model/male02.obj', function (object) {
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material.map = texture
          }
        })
        object.position.y = -95
        this.scene.add(object)
      }, this.progress, this.error)

      // let mtlLoader = new THREE.MTLLoader()
      // mtlLoader.setPath('obj/male02/')
      // mtlLoader.load('http://localhost:8080/static/model/male02_dds.mtl', function (materials) {
      // materials.preload()
      // })




        renderArea.addEventListener('mousemove', function (e) {
          console.log(`loaded: move`)
          previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
          }
          let deltaMove = {
            x: e.offsetX - previousMousePosition.x,
            y: e.offsetY - previousMousePosition.y
          }

          if (isDragging) {
            console.log(`loaded: drag`)
            let deltaRotationQuaternion = new THREE.Quaternion()
              .setFromEuler(new THREE.Euler(
                  toRadians(deltaMove.y * 1),
                  toRadians(deltaMove.x * 1),
                  0,
                  'XYZ'
              ))
            object.quaternion.multiplyQuaternions(deltaRotationQuaternion, object.quaternion)
          }
        })
 
       function toRadians (angle) {
        return angle * (Math.PI / 180)
      }
      // function toDegrees (angle) {
      //  return angle * (180 / Math.PI)
      // }
      let isDragging = false
      let previousMousePosition = {
        x: 0,
        y: 0
      }
      renderArea.addEventListener('mousedown', function (e) {
        console.log(`loaded: down`)
        isDragging = true
      })
      renderArea.addEventListener('mouseup', function (e) {
        console.log(`loaded: up`)
        isDragging = false
      })
 
    //<img :src="image" class="file-img"/>
ooooooo




   <template v-if="!done">
   <form class="upload-form" novalidate @submit.stop.prevent="submit">
    <bar v-for="(file, index) in files" :file="file" @remove="remove"></bar>

    <md-input-container :class="{ 'md-input-invalid': hasError('post.file') }">
      <span class="up-span md-raised md-primary"> 
         选择文件 
				<input class="up-btn" @change="onFileChange" type="file" name="model"  multiple></input>
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


    remove (index) {
      this.files.splice(index, 1)
    },
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.optFile(files)
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
      this.optFile(files)
    },
    optFile (files) {
      for (let file of files) {
        const name = file.name
        const size = (file.size / 1024 / 1024).toFixed(2)
        const type = file.type
        let fileObj = {
          image: false,
          name: name,
          size: size,
          type: type,
          progress: 0,
          msg: 'ok',
          relative: ''
        }
        if (this.isImage(files[0])) {
          this.createImage(files[0])
        } else {
          this.removeImage()
        }
        this.add(fileObj)
        this.upload(file, fileObj)
      }
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
      const UPLOAD_URL = `${process.env.ASSETS_URL}/files`
      var that = this
      if (window.FormData) {
        var formData = new window.FormData()
        formData.append('model', file)
      }
      var xhr = new window.XMLHttpRequest()
      xhr.open('POST', UPLOAD_URL)
      xhr.onload = function () {
        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText)
          console.log(`上传成功: ${JSON.stringify(result)}`)
          fileObj.relative = result.relative
          fileObj.msg = '上传成功！'
          that.saveFileToDb(result, function (response) {
            const id = response.body.data.id
            fileObj.id = id
            console.log(`id: ${id}`)
          }, function (response) {
            console.log('response')
          })
          // window.localStorage.setItem('files', xhr.responseText)
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



















									<el-dropdown
										trigger="click"
										class="nav-dropdown"
										:class="{ 'is-active': dropdownVisible }">
									<span>
                    <img src="../assets/images/user.svg" class="user-icon">
                    {{user.name}}
										<i class="el-icon-arrow-down el-icon--right"></i>
									</span>
									<el-dropdown-menu
											slot="dropdown"
											class="nav-dropdown-list"
											@input="handleDropdownToggle">
										<el-dropdown-item>
                        <router-link
                          :to="`/profile`">我的信息
                        </router-link>
										</el-dropdown-item>
										<el-dropdown-item>
                        <span class="nav-lang" @click="logout">
                            退出
                        </span>
										</el-dropdown-item>
	
									</el-dropdown-menu>
								</el-dropdown>

