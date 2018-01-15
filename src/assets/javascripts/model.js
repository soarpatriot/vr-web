
export {modelType, modelUrl, mtlUrl}
import * as _ from 'lodash'

function modelType(asset) {
  const parts = asset.parts
  const daeTypes = _.filter(parts, function(p) {return  /.dae$/gi.test(p.data.name) }) 
  const jsTypes = _.filter(parts, function(p) {return  /.js$/gi.test(p.data.name) }) 
  const binTypes = _.filter(parts, function(p) {return  /.bin$/gi.test(p.data.name) }) 
  const objTypes = _.filter(parts, function(p) {return  /.obj$/gi.test(p.data.name) }) 
  const otherTypes = _.filter(parts, function(p) {return /(.json|.obj)$/gi.test(p.data.name) }) 
  const mtlType = _.filter(parts, function(p) {return /.mtl$/gi.test(p.data.name) }) 
  const REGEX = /(.json|.obj|.js|.dae)$/gi 
  const arrs = modelUrl(asset).split(REGEX) 
  const type = arrs[1].slice(1).toUpperCase()

  //remove js bin type
  if (daeTypes.length > 0){
    return 'DAE'
  }


  //remove js bin type
  if (jsTypes.length > 0 && binTypes.length > 0){
    return 'JS_BIN'
  }

  if (jsTypes.length > 0 && objTypes.length > 0){
    return 'JS_OBJ'
  }
  if (jsTypes.length > 0) {
    return 'JS'
  }
  if(mtlType.length > 0 && type === 'OBJ'){
    return 'OBJ_MTL'
  }
  return type
}


function modelUrl(asset) {
  const parts = asset.parts 
  const jsParts = _.filter(parts, function(p) { return /.js$/gi.test(p.data.name) }) 
  const otherParts = _.filter(parts, function(p) {return /(.json|.obj|.dae)$/gi.test(p.data.name) }) 
  console.log(`js parts: ${JSON.stringify(jsParts)}`)
  console.log(`other parts: ${JSON.stringify(otherParts)}`)
  if (jsParts.length > 0) {
    return `${asset.parent}/${jsParts[0].data.name}`
  }
  if (otherParts.length > 0) {
    return `${asset.parent}/${otherParts[0].data.name}`
  }
  return ``
}

function mtlUrl(asset) {
  const parts = asset.parts 
  const mtlParts = _.filter(parts, function(p) { return /.mtl$/gi.test(p.data.name) }) 
  if (mtlParts.length > 0) {
    return `${asset.parent}/${mtlParts[0].data.name}`
  }
  return ``
}

function loadMtlObj(file) {
  THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader())
  THREE.Loader.Handlers.add( /\.jpg$/i, textureLoader)
  THREE.ImageUtils.crossOrigin = ''
  let textureLoader = new THREE.TextureLoader()
  let mtlLoader = new THREE.MTLLoader()
  const baseUrl = `${file.murl}/`
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
    })
  })
}
