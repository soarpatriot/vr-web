<template>
  <div class="model-area">
    <canvas ref="model" class="model">
    </canvas>
    <div class="extra">
      <md-button class="md-icon-button" @click.native="full">
        <icon name="full-screen" scale="20"></icon>
      </md-button>
    </div>
  </div>
</template>

<style lang="scss">
.model-area{
  position: relative;
  height: 100%;
}
.model{
  width: 100%;
}
.extra{
  position: absolute;
  right: 10px;
  bottom: 5px;
}
</style>
<script>
// import * as file from '../assets/javascripts/file.js'
import * as THREE from 'three'
import * as full from '../assets/javascripts/full.js'
var OrbitControls = require('three-orbit-controls')(THREE)
// import OrbitControls from 'orbit-controls-es6'
// import * as OrbitControls from 'three-orbit-controls'
// import * as OrbitControls from '../../node_modules/three/examples/js/controls/OrbitControls.js'
export default {
  name: 'model',
  props: ['url'],
  data () {
    return {
      count: 0,
      modelPhotoData: '',
      camera: null,
      scene: null,
      renderer: null,
      windowHalfX: 0,
      windowHalfY: 0,
      mouseX: 0,
      mouseY: 0
    }
  },
  mounted () {
    this.windowHalfX = window.innerWidth / 2
    this.windowHalfY = window.innerHeight / 2
    this.first()
    this.animate()
  },
  methods: {
    full () {
      let element = this.$refs.model
      full.requestFull(element)
      this.fullSize()
    },
    animate () {
      window.requestAnimationFrame(this.animate)
      this.show()
    },
    first () {
      // let container = document.createElement('div')
      // let container = document.getElementById('model')
      let container = this.$refs.model
      let height = container.clientHeight
      let width = container.clientWidth
      console.log(`container: ${height}`)
      // document.body.appendChild(container)
      this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
      this.camera.position.z = 10
      this.scene = new THREE.Scene()
      let ambient = new THREE.AmbientLight(0x888888)
      this.scene.add(ambient)

      let directionalLight = new THREE.DirectionalLight(0xffeedd)
      directionalLight.position.set(0, 0, 1).normalize()
      this.scene.add(directionalLight)

      let that = this
      let objectLoader = new THREE.ObjectLoader()
      objectLoader.load(this.url, function (obj) {
        that.scene.add(obj)
      })
      this.renderer = new THREE.WebGLRenderer({canvas: container, preserveDrawingBuffer: true, alpha: true})
      this.renderer.setClearColor(0x000000, 0.1)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      let controls = new OrbitControls(this.camera, container)
      controls.enabled = true
      controls.maxDistance = 20
      controls.minDistance = 3
      controls.addEventListener('change', this.show)
      // this.renderer.setSize(width, height)
      // container.appendChild(this.renderer.domElement)
      document.addEventListener('resize', this.resize, false)
      // document.addEventListener('mousemove', this.onDocumentMouseMove, false)
    },
    fullSize (event) {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    resize (event) {
      let container = this.$refs.model
      let height = container.height
      let width = container.width
      this.renderer.setSize(width, height)
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
      if (this.count === 0) {
        // this.modelPhotoData = this.renderer.domElement.toDataURL()
        // const blob = file.toBlob(this.modelPhotoData)
        // console.log(blob)
      }
    }
  }
}
</script>


