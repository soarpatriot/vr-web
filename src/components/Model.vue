<template>
  <div class="model-area">
    <canvas ref="model" class="model">
    </canvas>
  </div>
</template>

<style lang="scss">
.model-area{
  height: 100%;
}
.model{
  width: 100%;
}
</style>
<script>
// import * as file from '../assets/javascripts/file.js'
import * as THREE from 'three'
var OrbitControls = require('three-orbit-controls')(THREE)
// import OrbitControls from 'orbit-controls-es6'
// import * as OrbitControls from 'three-orbit-controls'
// import * as OrbitControls from '../../node_modules/three/examples/js/controls/OrbitControls.js'
export default {
  name: 'model',
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
    animate () {
      window.requestAnimationFrame(this.animate)
      this.show()
    },
    first () {
      // let container = document.createElement('div')
      // let container = document.getElementById('model')
      let container = this.$refs.model
      let height = container.height
      let width = container.width
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
      objectLoader.load('http://localhost:8080/static/model/teapot-claraio.json', function (obj) {
        that.scene.add(obj)
      })
      this.renderer = new THREE.WebGLRenderer({canvas: container, preserveDrawingBuffer: true})
      this.renderer.setPixelRatio(window.devicePixelRatio)
      let controls = new OrbitControls(this.camera, container)
      controls.enabled = true
      controls.maxDistance = 20
      controls.minDistance = 3
      controls.addEventListener('change', this.show)
      // this.renderer.setSize(width, height)
      // container.appendChild(this.renderer.domElement)
      // document.addEventListener('mousemove', this.onDocumentMouseMove, false)
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


