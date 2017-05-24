import * as m from '../../../src/assets/javascripts/model'

const asset = {
  parent: 'http://api.com',
  parts: [
    {data: {name: "aa.js"}},
    {data: {name: "aa.obj"}}
  ] 
}

const asset1 = {
  parent: 'http://api.com',
  parts: [
    {data: {name: "aa.jpg"}},
    {data: {name: "aa.obj"}},
    {data: {name: "aa.mtl"}}
  ] 
}

const asset2 = {
  parent: 'http://api.com',
  parts: [
    {data: {name: "aa.jpg"}},
    {data: {name: "aa.js"}},
    {data: {name: "aa.bin"}}
  ] 
}
 
describe('modelUrl', () => {
  it('should return js url type', () => {
    const mType = m.modelUrl(asset)
    expect(mType)
      .to.equal('http://api.com/aa.js')
  })
  it('should return obj url type', () => {
    const mType = m.modelUrl(asset1)
    expect(mType)
      .to.equal('http://api.com/aa.obj')
  })

})

describe('modelType', () => {
  it('should return js type', () => {
    const mType = m.modelType(asset)
    expect(mType)
      .to.equal('JS')
  })
  it('should return js type', () => {
    const mType = m.modelType(asset2)
    expect(mType)
      .to.equal('JS_BIN')
  })
 
  it('should return obj url type', () => {
    const mType = m.modelType(asset1)
    expect(mType)
      .to.equal('OBJ_MTL')
  })

})

describe('mtlUrl', () => {
  it('should return blank mtl url', () => {
    const mUrl = m.mtlUrl(asset)
    expect(mUrl)
      .to.equal('')
  })
  it('should return mtl url', () => {
    const mUrl = m.mtlUrl(asset1)
    expect(mUrl)
      .to.equal('http://api.com/aa.mtl')
  })

})

