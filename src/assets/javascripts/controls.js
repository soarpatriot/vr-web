import * as THREE from 'three'
export {myControls}
function myControls (camera, dom) {
  let OrbitControls = require('three-orbit-controls')(THREE)
  let controls = new OrbitControls(camera, dom)
  controls.target.set(0, 0, 0)
  controls.update()
  controls.maxDistance = 2000
  controls.minDistance = 100
  return controls
}
