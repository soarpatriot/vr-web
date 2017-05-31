import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Upload from '@/components/Upload'
import Navigrator from '@/components/Navigator'
import Vfooter from '@/components/Vfooter'
import Login from '@/components/Login'

Vue.component('Navigator', Navigator)
Vue.component('Vfooter', Vfooter)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/post/new',
      name: 'upload',
      component: Upload
    },
 
  ]
})
