<template>
  <div class="model-area" ref="area">
    <canvas ref="model" class="model">
    </canvas>
    <div class="extra" v-show="fullScreen">
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
.model-area{
  width: 100%;
  position: relative;
  height: 100%;
}
.model{
  width: 100%;
}
.extra{
  position: absolute;
  right: 0;
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
var OBJLoader = require('../assets/venders/OBJLoader.js')
OBJLoader(THREE)
var OrbitControls = require('three-orbit-controls')(THREE)
// import OrbitControls from 'orbit-controls-es6'
// import * as OrbitControls from 'three-orbit-controls'
// import * as OrbitControls from '../../node_modules/three/examples/js/controls/OrbitControls.js'
export default {
  name: 'model',
  props: ['files', 'fullScreen'],
  data () {
    return {
      url: '',
      progress: 0,
      showProgress: true,
      count: 0,
      modelPhotoData: '',
      camera: null,
      scene: null,
      renderer: null,
      windowHalfX: 0,
      windowHalfY: 0,
      width: 800,
      height: 360,
      mouseX: 0,
      mouseY: 0,
      controls: null
    }
  },
  mounted () {
    this.windowHalfX = window.innerWidth / 2
    this.windowHalfY = window.innerHeight / 2
    this.modelUrl()
    this.first()
    this.addFullListener()
    this.animate()
  },
  methods: {
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
    modelUrl () {
      const modelFiles = this.files.filter((file) => {
        console.log(`file: ${JSON.stringify(file)}`)
        console.log(`full: ${file.full}`)
        const REGEX = /(.json|.obj)$/gi
        const match = REGEX.test(file.full)
        console.log(`match: ${match}`)
        if (match) {
          return file
        }
      })
      console.log(`full: ${modelFiles}`)
      if (modelFiles.length > 0) {
        this.url = modelFiles[0].full
      }
    },
    percent () {
      return window.innerHeight / window.innerWidth
    },
    first () {
      let container = this.$refs.model
      let area = this.$refs.area
      let width = area.clientWidth
      let height = width * 0.55
      // console.log(`container: ${height}`)
      const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      console.log(`client: ${w}`)
      this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000)
      this.camera.position.x = 0
      this.camera.position.y = 0
      this.camera.position.z = 10
      this.scene = new THREE.Scene()
      // this.scene.position.y = -20
      const ambient = light.ambientLight()
      // const ambient = new THREE.AmbientLight(0xffffff)
      this.scene.add(ambient)

      // let directionalLight = light.directLight()
      // this.scene.add(directionalLight)

      let that = this

      // let manager = new THREE.LoadingManager()
      // manager.onProgress = function (url, loaded, total) {
      //  console.log(`loaded: ${loaded}`)
      // }
      THREE.DefaultLoadingManager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total)
      }

      this.renderer = new THREE.WebGLRenderer({canvas: container, preserveDrawingBuffer: true, alpha: true})
      this.renderer.setClearColor(0x000000, 0.1)
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

      if (this.url.endsWith('.obj')) {
        let loader = new THREE.OBJLoader()
        // let threeModel = null
        // const renderArea = this.renderer.domElement
        loader.load(this.url, function (object) {
          that.showProgress = false
          object.traverse(function (child) {
            // if (child instanceof THREE.mesh) {
            // child.material.map = texture
            // }
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
      if (this.url.endsWith('.json')) {
        this.controls.maxDistance = 80
        this.controls.minDistance = 5
        let objectLoader = new THREE.ObjectLoader()
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
        let height = width * 0.55
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
      // this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05
      // this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05
      this.camera.lookAt(this.scene.position)
      this.renderer.render(this.scene, this.camera)
      // this.controls.update()
      if (this.count === 0) {
        // this.modelPhotoData = this.renderer.domElement.toDataURL()
        // const blob = file.toBlob(this.modelPhotoData)
        // console.log(blob)
      }
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
