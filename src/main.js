import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'
import Element from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
// import VueMaterial from 'vue-material'
// import VeeValidate from 'vee-validate'
// import Icon from 'vue-svg-icon/Icon.vue'
// import Icon from 'vui-icon'
// import MaterialIcons from 'material-design-icons'
// import 'aframe'
// import 'vue-material/dist/vue-material.css'
// import 'material-design-icons/iconfonts/MaterialIcons-Regular.eot'
// import 'material-design-icons/iconfonts/MaterialIcons-Regular.svg'
// import 'material-design-icons/iconfonts/MaterialIcons-Regular.ttf'
// import 'material-design-icons/iconfonts/MaterialIcons-Regular.woff'
// import 'material-design-icons/iconfonts/MaterialIcons-Regular.woff2'
// import 'material-design-icons/iconfonts/material-icons.css'
// Vue.use(MaterialIcons)
// import Element from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// Vue.use(Element)
Vue.use(VueResource)
// Vue.use(axios)
Vue.use(Vuex)
Vue.use(Element)

// Vue.use(VeeValidate)
// Vue.use(VueMaterial)
// Vue.use(VuiIcon)

// Vue.component('icon', Icon)
// Icon.inject('full-screen')
/**
Vue.material.registerTheme({
  default: {
    primary: 'blue',
    accent: 'black',
    warn: 'red',
    background: 'white'
  },
  black: {
    primary: 'black',
    accent: 'pink'
  }
}) **/
// Vue.material.setCurrentTheme('black')
Vue.config.debug = true

import App from './App'
// vue store
const store = new Vuex.Store({
  state: {
    logined: false
  },
  mutations: {
    login (state) {
      state.logined = true
    },
    logout (state) {
      state.logined = false
    }
  }
})
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
/* eslint-disable no-new new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
}) */
