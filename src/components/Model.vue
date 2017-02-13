<template>
  <div class="foo" ref="foo">
    <canvas ref="model">
    </canvas>
    <img :src="modelPhotoData">
  </div>
</template>
<script>
import {toBlob} from '../assets/javascripts/file.js'
import * as THREE from 'three'
export default {
  name: 'model',
  data () {
    return {
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
      console.log(`container: ${container}`)
      // document.body.appendChild(container)
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000)
      this.camera.position.z = 10
      this.scene = new THREE.Scene()
      let ambient = new THREE.AmbientLight(0x444444)
      this.scene.add(ambient)

      let directionalLight = new THREE.DirectionalLight(0xffeedd)
      directionalLight.position.set(0, 0, 1).normalize()
      this.scene.add(directionalLight)

      let that = this
      let objectLoader = new THREE.ObjectLoader()
      objectLoader.load('http://192.168.31.174:8080/static/model/teapot-claraio.json', function (obj) {
        that.scene.add(obj)
      })
      this.renderer = new THREE.WebGLRenderer({canvas: container, preserveDrawingBuffer: true})
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      // container.appendChild(this.renderer.domElement)
      document.addEventListener('mousemove', this.onDocumentMouseMove, false)
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
      this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05
      this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05
      this.camera.lookAt(this.scene.position)
      this.renderer.render(this.scene, this.camera)
      this.modelPhotoData = this.renderer.domElement.toDataURL()
      const blob = toBlob(this.modelPhotoData)
      console.log(blob)
    }
  }
}
</script>


