import * as THREE from 'three'
export {directLight, ambientLight}

function directLight () {
  const d = 300
  let light = new THREE.DirectionalLight(0xffffff, 1.75)
  light.position.set(50, 200, 100)
  light.position.multiplyScalar(1.3)
  light.castShadow = true
  // shadow
  light.shadow.mapSize.width = 1024
  light.shadow.mapSize.height = 1024
  light.shadow.camera.left = - d
  light.shadow.camera.right = d
  light.shadow.camera.top = d
  light.shadow.camera.bottom = - d
  light.shadow.camera.far = 1000

  return light
}

function ambientLight () {
  new THREE.AmbientLight(0x666666)
}
