import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(Element)
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.debug = true

import App from './App'

import Foo from './components/Foo'
const Bar = { template: '<div>bar</div>' }
// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: App
    },
    {
      path: '/foo',
      component: Foo
    },
    {
      path: '/bar',
      component: Bar
    }

  ]
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
new Vue({
  router: router
}).$mount('#app')
/* eslint-disable no-new new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
}) */
