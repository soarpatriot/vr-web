
export {modelType, modelUrl, modelMtlUrl, modelMaterial}

function modelType(asset) {
  const mtl = asset.parts.find(findMtl) 
  const REGEX = /(.json|.obj|.js)$/gi
  const arrs = modelUrl(asset).split(REGEX) 
  const type = arrs[1].slice(1).toUpperCase()
  if(mtl && type === 'OBJ'){
    return 'OBJ_MTL'
  }
  return type
}

function modelUrl(asset) {
  const part = asset.parts.find(findModel) 
  return `${asset.parent}/${part.data.name}`
}
function modelMtlUrl(asset) {
  const part = asset.parts.find(findMtl) 
  return `${asset.parent}/${part.data.name}`
}
function modelMaterial(asset) {
  const part = asset.parts.find(findMaterial) 
  // console.log(`part: ${part}`)
  if (part) {
    return `${asset.parent}/${part.data.name}`
  }
  return ``
}

function findMaterial(part) {
  const REGEX = /(.jpg|.jpeg)$/gi
  const match = REGEX.test(part.data.name)
  return match 
}
function findModel(part) {
  const REGEX = /(.json|.obj|.js)$/gi
  const match = REGEX.test(part.data.name)
  return match 
} 

function findMtl(part) {
  const REGEX = /.mtl$/gi
  const match = REGEX.test(part.data.name)
  return match 
} 


