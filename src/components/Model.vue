<template>
  <div class="model-area" ref="area">
    <canvas ref="model" class="model">
    </canvas>
    <transition name="el-zoom-in-center">
      <img :src="snapshot" v-show="showCover" class="transition-box photo-cover"/>
    </transition>
    <div class="extra" v-show="fullScreen">
      <el-button type="text" @click="photo">
        <img src="../assets/images/camera.svg" class="camera">
      </el-button>
      <md-button class="md-icon-button" @click.native="full">
        <md-icon md-src="/static/images/full-screen.svg"></md-icon>
      </md-button>
    </div>
    <div class="progress-bar" v-show="showProgress">
      <div>{{progress}}%</div>
      <md-progress :md-progress="progress" class="progress"></md-progress>
    </div>
  </div>
</template>

<style lang="scss">
.camera{
  width: 42px;
  height: 42px;
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
  width: 100%;
  position: relative;
}
.model{
  width: 100%;
}
.extra{
  position: absolute;
  right: 10px;
  bottom: 5px;
}
.progress-bar{
  position: absolute;
  text-align: center;
  color: #2196f3;
  left: 25%;
  width: 50%;
  top: 45%; 
}
</style>
<script>
// import * as file from '../assets/javascripts/file.js'
import * as light from '../assets/javascripts/light.js'
import * as THREE from 'three'
import * as full from '../assets/javascripts/full.js'
import * as m from '../assets/javascripts/model.js'
var OBJLoader = require('../assets/venders/OBJLoader.js')
var MTLLoader = require('../assets/venders/MTLLoader.js')
var DDSLoader = require('../assets/venders/DDSLoader.js')
var BinaryLoader = require('../assets/venders/BinaryLoader.js')
MTLLoader(THREE)
OBJLoader(THREE)
DDSLoader(THREE)
BinaryLoader(THREE)
var OrbitControls = require('three-orbit-controls')(THREE)
// import OrbitControls from 'orbit-controls-es6'
// import * as OrbitControls from 'three-orbit-controls'
// import * as OrbitControls from '../../node_modules/three/examples/js/controls/OrbitControls.js'
export default {
  name: 'model',
  props: ['file', 'fullScreen'],
  data () {
    return {
      id: 0,
      showCover: false,
      snapshot: '',
      snapshotUrl: `${process.env.ASSETS_URL}/files/snapshot`,
      url: '',
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
    this.id = this.$route.params.id
    this.windowHalfX = window.innerWidth / 2
    this.windowHalfY = window.innerHeight / 2
    this.url = m.modelUrl(this.file)
    this.modelStyle = m.modelType(this.file)
    this.first()
    this.addFullListener()
    this.animate()
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
              // window.location.href = '/' 
              console.log(`success: ${response}`)
              // window.localStorage.setItem('token', response.data token)
              // this.$route._router.go('/')
            }, (response) => {
              const errors = response.body.errors
              console.log(`error: ${JSON.stringify(response.body.errors)}`)
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
      // console.log(`sdf ${dataUrl}`)
    },
    full () {
      let element = this.$refs.model
      full.requestFull(element)
      // this.fullSize()
    },
    animate () {
      window.requestAnimationFrame(this.animate)
      this.controls.update()
      this.show()
    },
    percent () {
      return window.innerHeight / window.innerWidth
    },
    first () {
      let container = this.$refs.model
      let area = this.$refs.area
      let width = area.clientWidth
      let height = width * 0.75
      this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000)
      this.camera.position.x = 0
      this.camera.position.y = 0
      this.camera.position.z = 10
      this.camera.target = new THREE.Vector3(0, 150, 0)
      this.scene = new THREE.Scene()
      // this.scene.position.y = -20
      let ambient = light.ambientLight()
      // let ambient = new THREE.AmbientLight(0x444444)
      this.scene.add(ambient)

      // let directionalLight = new THREE.DirectionalLight(0xffeedd)
      // directionalLight.position.set(0, 0, 1).normalize()
      // this.scene.add(directionalLight)
      let directionalLight = light.directLight()
      this.scene.add(directionalLight)

      let that = this
      let manager = new THREE.LoadingManager()
      THREE.ImageUtils.crossOrigin = ''
      // let texture = new THREE.Texture()
      // let imageLoader = new THREE.ImageLoader(manager)
      // imageLoader.crossOrigin = ''
      // imageLoader.load(this.textureUrl, function (image) {
      //  texture.image = image
      //  texture.needsUpdate = true
      // })
      manager.onProgress = function (url, loaded, total) {
        console.log(`process loaded: ${loaded}`)
      }
      THREE.DefaultLoadingManager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total)
      }

      this.renderer = new THREE.WebGLRenderer({canvas: container, preserveDrawingBuffer: true, alpha: true})
      this.renderer.setClearColor(0x000000, 0.75)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.target.set(0, 0, 0)
      this.controls.update()
      // let controls = new OrbitControls(this.camera, container)
      // let controls = new THREE.TrackballControls(this.camera, container)
      // this.controls.enabled = true
      this.controls.maxDistance = 800
      this.controls.minDistance = 200
      this.controls.addEventListener('mousemove', this.show)
      // this.renderer.setSize(this.width, this.height)
      this.renderer.setSize(width, height)
      // container.appendChild(this.renderer.domElement)
      window.addEventListener('resize', this.resize, false)
      // document.addEventListener('mousemove', this.onDocumentMouseMove, false)
      if (this.modelStyle === 'JS_BIN') {
        let loader = new THREE.BinaryLoader()
        loader.crossOrigin = ''
        // loader.setTexturePath('')
        loader.load(this.url, function (geometry, mat) {
          console.log(`geometry: ${geometry} , materials: ${materials}`)
          that.showProgress = false
          let materials = new THREE.MultiMaterial(mat)
          let mesh = new THREE.Mesh(geometry, materials)
          mesh.position.setY(-120)
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
        // loader.setTexturePath('')
        loader.load(this.url, function (geometry, mat) {
          console.log(`geometry: ${geometry} , materials: ${materials}`)
          that.showProgress = false
          let materials = new THREE.MeshFaceMaterial(mat)
          let mesh = new THREE.Mesh(geometry, materials)
          // let mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial(materials))
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
          that.progress = parseInt(xhr.loaded / xhr.total * 100)
          console.log(`js loaded: ${that.progress}`)
        }, function () {
          console.log('111 error')
        })
      }
      if (this.modelStyle === 'OBJ_MTL') {
        // THREE.Loader.Handlers.add(ma, new THREE.DDSLoader())
        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader())
        let mtlLoader = new THREE.MTLLoader()
        const baseUrl = `${this.file.parent}/`
        mtlLoader.setBaseUrl(baseUrl)
        // mtlLoader.setPath('http://localhost:3000/upload/20175/1494424374933/')
        const MTL_URL = m.mtlUrl(this.file)
        console.log(`MTL Url: ${MTL_URL}`)
        mtlLoader.load(MTL_URL, function (materials) {
          materials.preload()
          let loader = new THREE.OBJLoader(manager)
          loader.setMaterials(materials)
          // loader.setPath('http://localhost:3000/upload/20175/1494424374933/')
          loader.load(that.url, function (object) {
            that.showProgress = false
            // threeModel = object
            // object.position.x = 0
            object.position.y = -95
            // object.position.z = -200
            that.scene.add(object)
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
          // threeModel = object
          // object.position.x = 0
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
        console.log(`sdfasd`)
        // let objectLoader = new THREE.ObjectLoader()
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
      // this.camera.aspect = window.clientWidth / window.clientHeight
      // this.camera.updateProjectionMatrix()
      console.log(`client: ${window.clientWidth}`)
      this.renderer.setSize(window.clientWidth, window.clientHeight)
    },
    resize (event) {
      const activated = full.activated()
      let container = this.$refs.area
      if (container) {
        console.log(`container resize: ${container.clientWidth}`)
        let width = container.clientWidth
        let height = width * 0.6
        if (activated) {
          width = window.innerWidth
          height = window.innerHeight
        }
        // console.log(`client in resize: ${window.clientWidth}`)
        console.log(`height: ${height}`)
        console.log(`width: ${width}`)
        this.renderer.setSize(width, height)
      }
    },
    onDocumentMouseMove (event) {
      this.mouseX = (event.clientX - this.windowHalfX) / 2
      this.mouseY = (event.clientY - this.windowHalfY) / 2
    },
    progress (xhr) {
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
