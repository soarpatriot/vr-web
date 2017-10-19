import * as THREE from 'three'
export {myCamera}
function myCamera (width, height) {
  let camera = null
  // camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000)
  camera = new THREE.PerspectiveCamera(60, width / height, 1, 100000)
  camera.position.set(2000, 5000, 5000)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  return camera
}
