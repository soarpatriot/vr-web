import {modelType} from '../../src/assets/javascripts/model'

describe('modelType', () => {
  it('should render correct contents', () => {
    const type = modelType('http://aa.json')
    expect(type)
      .to.equal('json')
  })
})
