import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import My from '@/components/My'
import Upload from '@/components/Upload'
import Profile from '@/components/profile'
import Navigator from '@/components/Navigator'
import Vfooter from '@/components/Vfooter'
import Register from '@/components/Register'
import RegTip from '@/components/RegTip'
import Login from '@/components/Login'
import Post from '@/components/Post'
import Show from '@/components/Show'
import Embed from '@/components/Embed'
import E from '@/components/E'
import Activation from '@/components/Activation'
import Reactivation from '@/components/Reactivation'
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
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/activation',
      name: 'Activation',
      component: Activation
    },
    {
      path: '/reactivation',
      name: 'Reactivation',
      component: Reactivation
    },
    {
      path: '/regged',
      name: 'RegTip',
      component: RegTip
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
    },
    {
      path: '/embed/:id',
      name: 'embed',
      component: Embed
    },
    {
      path: '/e',
      name: 'e',
      component: E
    }
  ]
})
