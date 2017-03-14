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
 
