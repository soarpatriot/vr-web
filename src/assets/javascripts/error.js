export { tip }

import * as _ from 'lodash'
const words = {
  email: '邮箱',
  name: '用户名'
}
function tip (errors) {
  const arrTips = _.map(errors,function(value, key){
    // console.log(`${value}  ${key}`)
    if(words[key]) {
       return `${words[key]}${value}` 
    }else {
      return `${key}${value}` 
    }
    // return _.get(errors, words[key], key) + _.join(value, ',')
  })
  // console.log(`${JSON.stringify(arrTips)}`)
  return _.join(arrTips, ',')
}



