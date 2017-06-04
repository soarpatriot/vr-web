import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import My from '@/components/My'
import Upload from '@/components/Upload'
import Navigator from '@/components/Navigator'
import Vfooter from '@/components/Vfooter'
import Login from '@/components/Login'
import Post from '@/components/Post'
import Show from '@/components/Show'

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
      path: '/posts',
      name: 'post',
      component: Post
    },
    {
      path: '/posts/:id',
      name: 'show',
      component: Show
    },
    {
      path: '/post/new',
      name: 'upload',
      component: Upload
    },
    {
      path: '/my',
      name: 'my',
      component: My
    }
  ]
})