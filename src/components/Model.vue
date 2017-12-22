<template>
  <div class="model-area" ref="area">
    <canvas ref="model" class="model">
    </canvas>
    <transition name="el-zoom-in-center">
      <img :src="snapshot" v-show="showCover" class="transition-box photo-cover"/>
    </transition>
    <div class="extra">
			<el-popover
				ref="popover4"
				placement="top"
				trigger="click">
				<el-alert
					title="拷贝如下代码嵌入模型到自己的网站"
					type="info"
					:description="embedUrl"
          :closable="false"
					show-icon>
				</el-alert>
	
			</el-popover>


      <el-button type="text" v-popover:popover4>
        <img src="../assets/images/embed.svg" class="camera">
      </el-button>
 
      <el-button type="text" @click="photo" v-show="showCamera">
        <img src="../assets/images/camera.svg" class="camera">
      </el-button>
      <el-button type="text" @click.native="full" v-show="fullScreen">
        <img src="../assets/images/full-screen.svg" class="camera">
      </el-button>
	  </div>
    <div class="progress-bar" v-show="showProgress">
      <el-progress type="circle" :percentage="progress"></el-progress>
    </div>
  </div>
</template>

<style lang="scss">
.camera{
  width: 32px;
  height: 32px;
}
.photo-cover{
  top: 0;
  border: 5px solid #fff;
  position: absolute;
  width: 100%;
  height: 100%; 
  transform:rotate(-10deg);
}
.model-area{
  cursor: pointer;
  // background: #fff;
  width: 100%;
  position: relative;
  .progress-bar{
    position: absolute;
    display: block;
    text-align: center;
    color: #2196f3;
    left: 25%;
    width: 50%;
    top: 50%; 
    margin-top: -73px;
  }
}
.model{
  width: 100%;
  vertical-align: middle;
  // background: rgba(0, 0, 0, .75); 
}
.extra{
  position: absolute;
  right: 10px;
  bottom: 5px;
}
</style>
<script>
// import * as file from '../assets/javascripts/file.js'
import * as light from '../assets/javascripts/light.js'
import * as THREE from 'three'
import * as full from '../assets/javascripts/full.js'
import * as error from '../assets/javascripts/error.js'
import * as m from '../assets/javascripts/model.js'
import * as camera from '../assets/javascripts/camera.js'
import * as controls from '../assets/javascripts/controls.js'
var OBJLoader = require('../assets/venders/OBJLoader.js')
var MTLLoader = require('../assets/venders/MTLLoader.js')
var DDSLoader = require('../assets/venders/DDSLoader.js')
var BinaryLoader = require('../assets/venders/BinaryLoader.js')
MTLLoader(THREE)
OBJLoader(THREE)
DDSLoader(THREE)
BinaryLoader(THREE)
THREE.Cache.enabled = true
export default {
  name: 'model',
  props: ['id', 'file', 'fullScreen', 'showCamera'],
  data () {
    return {
      showCover: false,
      snapshot: '',
      snapshotUrl: `${process.env.ASSETS_URL}/files/snapshot`,
      url: '',
      embedUrl: '',
      textureUrl: '',
      progress: 0,
      showProgress: true,
      count: 0,
      modelPhotoData: '',
      modelStyle: '',
      camera: null,
      scene: null,
      renderer: null,
      windowHalfX: 0,
      windowHalfY: 0,
      width: 800,
      height: 360,
      mouseX: 0,
      mouseY: 0,
      controls: null,
      radius: 600,
      theta: 0,
      prevTime: new Date(),
      mixer: null
    }
  },
  mounted () {
    this.windowHalfX = window.innerWidth / 2
    this.windowHalfY = window.innerHeight / 2
    this.url = m.modelUrl(this.file)
    this.modelStyle = m.modelType(this.file)
    this.first()
    this.addFullListener()
    this.animate()
    const EMBED_URL = `${process.env.HOST}/#/embed/${this.id}`
    this.embedUrl = `<iframe width="560" height="420" src="${EMBED_URL}" frameborder="0" allowfullscreen></iframe>`
  },
  methods: {
    photo () {
      this.showCover = true
      // const dataUrl = this.renderer.domElement.toDataURL('image/png')
      const COVER_URL = `${process.env.API_URL}/covers`
      let token = window.localStorage.getItem('token')
      let tokenStr = `Token: ${token}`
 
      this.snapshot = this.renderer.domElement.toDataURL() 
      // this.snapshot = 'data:image/png;base64,'+Base64.encode(blob)
      this.renderer.domElement.toBlob((blob) => {
        let fd = new FormData()
        fd.append('post_id', this.id)
        fd.append('avatar', blob, 'snap.jpg')
        console.log(`id: ${this.id}`)
        this.$http.post(this.snapshotUrl, fd)
          .then((response) => {
            const result = response.body
            const cover = {
              post_id: this.id,
              filename: result.originalname,
              mimetype: result.mimetype,
              full: result.full,
              size: result.size,
              parent: result.path 
            } 
            this.$http.post(COVER_URL, { cover: cover }, { headers: {
                'api-token': tokenStr
              }
            }).then((response) => {
              console.log(`success: ${response}`)
            }, (response) => {
              const errors = response.body.errors
              // console.log(`error: ${JSON.stringify(response.body.errors)}`)
              this.msg = error.tip(errors) 
              console.log(`error: ${JSON.stringify(this.msg)}`)
            })
            console.log(`response ${JSON.stringify(response)}`)
          }).catch((err) => {
            console.log(`err ${err}`)
          })
      })
      setTimeout(() => {
        this.showCover = false
      }, 3000)
    },
    full () {
      let element = this.$refs.model
      full.requestFull(element)
    },
    animate () {
      window.requestAnimationFrame(this.animate)
      this.controls.update()
      this.show()
    },
    first () {
      let container = this.$refs.model
      let area = this.$refs.area
      let width = area.clientWidth
      let height = width * 0.75
      this.camera = camera.myCamera(width, height)
      this.scene = new THREE.Scene()
      let ambient = light.ambientLight()
      this.scene.add(ambient)

      let directionalLight = light.directLight()
      this.scene.add(directionalLight)

      let that = this
      let manager = new THREE.LoadingManager()
      THREE.ImageUtils.crossOrigin = ''
      manager.onProgress = function (url, loaded, total) {
        console.log(`process loaded: ${loaded}`)
      }
      THREE.DefaultLoadingManager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total)
      }

      this.renderer = new THREE.WebGLRenderer({canvas: container, preserveDrawingBuffer: true, alpha: true})
      this.renderer.setClearColor(0x000000, 0)
      // this.renderer.setClearColor(0xf0f0f0)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.controls = controls.myControls(this.camera, this.renderer.domElement) 
      this.controls.addEventListener('mousemove', this.show)
      this.renderer.setSize(width, height)
      this.showProgress = true 
      window.addEventListener('resize', this.resize, false)

      if (this.modelStyle === 'JS_BIN') {
        let loader = new THREE.BinaryLoader()
        loader.crossOrigin = ''
        loader.setCrossOrigin('')
        loader.load(this.url, function (geometry, mat) {
          console.log(`geometry: ${geometry} , js bin mat: ${mat}`)
          that.showProgress = false
          let materials = new THREE.MultiMaterial(mat)
          let mesh = new THREE.Mesh(geometry, materials)
          mesh.position.setY(-10)
          mesh.scale.set(1, 1, 1)
          mesh.dynamic = true
          that.scene.add(mesh)
        }, function (xhr) {
          console.log(`js xhr: ${xhr.loaded}  ${xhr.total}`)
          that.progress = parseInt(xhr.loaded / xhr.total * 100)
          console.log(`js loaded: ${that.progress}`)
        }, function () {
          console.log('111 error')
        })
      }
      if (this.modelStyle === 'JS_OBJ') {
        console.log(`url js: ${this.url}`)
        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader())
        let loader = new THREE.JSONLoader()
        loader.crossOrigin = ''
        loader.load(this.url, function (geometry, mat) {
          console.log(`geometry: ${geometry} , materials: ${materials}`)
          that.showProgress = false
          let materials = new THREE.MeshFaceMaterial(mat)
          let mesh = new THREE.Mesh(geometry, materials)
          mesh.position.setY(-120)
          mesh.scale.set(1.5, 1.5, 1.5)
          that.scene.add(mesh)
          that.mixer = new THREE.AnimationMixer(mesh)
          let clip = THREE.AnimationClip.CreateFromMorphTargetSequence('gallop', geometry.morphTargets, 30)
          that.mixer.clipAction(clip).setDuration(2).play()
        }, function (xhr) {
          console.log(`js xhr: ${xhr.loaded}  ${xhr.total}`)
          that.progress = parseInt(xhr.loaded / xhr.total * 100)
          console.log(`js loaded: ${that.progress}`)
        }, function () {
          console.log('111 error')
        })
      }
      if (this.modelStyle === 'JS') {
        let loader = new THREE.JSONLoader()
        loader.crossOrigin = ''
        // loader.setTexturePath('')
        loader.load(this.url, function (geometry, mat) {
          console.log(`geometry: ${geometry} , materials: ${materials}`)
          that.showProgress = false
          let materials = new THREE.MeshLambertMaterial({
            vertexColors: THREE.FaceColors,
            morphTargets: true,
            overdraw: 0.5
          })
          let mesh = new THREE.Mesh(geometry, materials)
          mesh.position.setY(-120)
          mesh.scale.set(1.5, 1.5, 1.5)
          that.scene.add(mesh)
          that.mixer = new THREE.AnimationMixer(mesh)
          let clip = THREE.AnimationClip.CreateFromMorphTargetSequence('gallop', geometry.morphTargets, 30)
          that.mixer.clipAction(clip).setDuration(2).play()
        }, function (xhr) {
          console.log(`js xhr: ${xhr.loaded}  ${xhr.total}`)
          const total = xhr.total === 0 ? 200000 : xhr.total
          that.progress = parseInt(xhr.loaded / total * 100)
          console.log(`js loaded: ${that.progress}`)
        }, function () {
          console.log('111 error')
        })
      }
      if (this.modelStyle === 'OBJ_MTL') {
        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader())
        const baseUrl = `${this.file.murl}/`
        THREE.ImageUtils.crossOrigin = ''
        let textureLoader = new THREE.TextureLoader()
        THREE.Loader.Handlers.add( /\.jpg$/i, textureLoader)
        let mtlLoader = new THREE.MTLLoader()
        mtlLoader.setTexturePath(baseUrl)
        mtlLoader.setCrossOrigin('')
        const MTL_URL = m.mtlUrl(this.file)
        console.log(`MTL Url: ${MTL_URL}`)
        mtlLoader.load(MTL_URL, function (materials) {
          materials.preload()
          let loader = new THREE.OBJLoader(manager)
          loader.setMaterials(materials)
          loader.load(that.url, function (object) {
            that.showProgress = false
            // threeModel = object
            // object.position.x = 0
            object.position.y = -95
            // object.position.z = -200
            that.scene.add(object)
          }, function (xhr) {
            that.progress = parseInt(xhr.loaded / xhr.total * 100)
            console.log(`loaded: ${that.progress}`)
          })
        })
      }
      if (this.modelStyle === 'OBJ') {
        console.log('OBJ style')
        let loader = new THREE.OBJLoader(manager)
        loader.load(this.url, function (object) {
          that.showProgress = false
          object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
              // child.material.map = texture
            }
          })
          object.position.y = -95
          // object.position.z = -200
          that.scene.add(object)
        }, function (xhr) {
          that.progress = parseInt(xhr.loaded / xhr.total * 100)
          console.log(`loaded: ${that.progress}`)
        })
      }
      if (this.modelStyle === 'JSON') {
        this.controls.maxDistance = 80
        this.controls.minDistance = 5
        console.log(`JSON`)
        let objectLoader = new THREE.JSONLoader()
        objectLoader.load(this.url, function (obj) {
          that.showProgress = false
          that.scene.add(obj)
        }, function (xhr) {
          that.progress = parseInt(xhr.loaded / xhr.total * 100)
          console.log(`loaded: ${that.progress}`)
        })
      }
    },
    fullSize (event) {
      this.camera.aspect = window.clientWidth / window.clientHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.clientWidth, window.clientHeight)
    },
    resize (event) {
      const activated = full.activated()
      let container = this.$refs.area
      if (container) {
        // console.log(`container resize: ${container.clientWidth}`)
        let width = container.clientWidth
        let height = width * 0.75
        // let width = window.innerWidth
        // let  height = window.innerHeight
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        if (activated) {
          width = window.innerWidth
          height = window.innerHeight
        }
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
 
        // console.log(`client in resize: ${window.clientWidth}`)
        // console.log(`height: ${height}`)
        // console.log(`width: ${width}`)
        this.renderer.setSize(width, height)
      }
    },
    mprogress (xhr) {
      if (xhr.lengthComputable) {
        const percentComplete = xhr.loaded / xhr.total * 100
        console.log(Math.round(percentComplete, 2) + '% downloaded')
      }
    },
    error (xhr) {
    },
    show () {
      // this.theta += 0.1
      // this.camera.position.x = this.radius * Math.sin(THREE.Math.degToRad(this.theta))
      // this.camera.position.z = this.radius * Math.cos(THREE.Math.degToRad(this.theta))
      this.camera.lookAt(this.scene.position)
      if (this.mixer) {
        const time = Date.now()
        this.mixer.update((time - this.prevTime) * 0.001)
        this.prevTime = time
      }
      this.renderer.render(this.scene, this.camera)
    },
    addFullListener () {
      document.addEventListener('fullscreenchange', this.exitFull)
      document.addEventListener('mozfullscreenchange', this.exitFull)
      document.addEventListener('webkitfullscreenchange', this.exitFull)
    },
    exitFull (event) {
      if (document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        document.webkitFullscreenElement) {
      } else {
        this.resize(event)
        // this.renderer.setSize(this.width, this.height)
      }
    }
  }
}
</script>
