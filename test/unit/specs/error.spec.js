import * as e from '../../../src/assets/javascripts/error'

const errors = {email:["已经存在，请更换一个"]} 
describe('tip', () => {
  it('should return error tip', () => {
    const msg = e.tip(errors)
    expect(msg)
      .to.equal('邮箱已经存在，请更换一个')
  })
})

