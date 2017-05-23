
export {modelType, modelUrl, modelMtlUrl, modelMaterial}

function modelType(asset) {
  const js = asset.parts.find(findJs) 
  const mtl = asset.parts.find(findMtl) 
  const REGEX = /(.json|.obj|.js)$/gi
  const arrs = modelUrl(asset).split(REGEX) 
  const type = arrs[1].slice(1).toUpperCase()
  console.log(`js: ${js}`)
  if(js) {
    return 'JS'
  }
  if(mtl && type === 'OBJ'){
    return 'OBJ_MTL'
  }
  return type
}

function modelUrl(asset) {
  const part = asset.parts.find(findModel) 
  console.log(`part:  ${JSON.stringify(part)}`)
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
  const jsMatch = findJs(part)
  console.log(`js Match: ${jsMatch}`)
  if(jsMatch){
    return jsMatch
  }
  const REGEX = /(.json|.obj|.js)$/gi
  const match = REGEX.test(part.data.name)
  return match 
} 

function findJs(part) {
  const REGEX = /.js$/gi
  return endWith(REGEX, part.data.name)
  // console.log(`findjs match: ${match}`)
  // return match
}


function endWith(reg, name) {
  return reg.test(name)
} 


function findMtl(part) {
  const REGEX = /.mtl$/gi
  const match = REGEX.test(part.data.name)
  return match 
} 


