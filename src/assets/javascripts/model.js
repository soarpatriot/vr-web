
export {modelType, modelUrl, mtlUrl}
import * as _ from 'lodash'

function modelType(asset) {
  const parts = asset.parts
  const jsTypes = _.filter(parts, function(p) {return  /.js$/gi.test(p.data.name) }) 
  const binTypes = _.filter(parts, function(p) {return  /.bin$/gi.test(p.data.name) }) 
  const objTypes = _.filter(parts, function(p) {return  /.obj$/gi.test(p.data.name) }) 
  const otherTypes = _.filter(parts, function(p) {return /(.json|.obj)$/gi.test(p.data.name) }) 
  const mtlType = _.filter(parts, function(p) {return /.mtl$/gi.test(p.data.name) }) 
  const REGEX = /(.json|.obj|.js)$/gi 
  const arrs = modelUrl(asset).split(REGEX) 
  const type = arrs[1].slice(1).toUpperCase()

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
  const otherParts = _.filter(parts, function(p) {return /(.json|.obj)$/gi.test(p.data.name) }) 
  console.log(`js parts: ${JSON.stringify(jsParts)}`)
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


function findJs(name) {
  const REGEX = /.js$/gi
  return REGEX.test(name)
}

function findMtl(part) {
  const REGEX = /.mtl$/gi
  return REGEX.test(part.data.name)
} 


