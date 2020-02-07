import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import welcome from '@/views/welcome'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  }, {
    path: '/',
    component: Home,
    children: [{
      path: '/',
      component: welcome
    }]
  }]
})

export default router
