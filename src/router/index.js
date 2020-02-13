import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import welcome from '@/views/welcome'
import NotFund from '@/views/404'
import Article from '@/views/article'
import image from '@/views/image'

import auth from '@/utils/auth.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  }, {
    path: '/',
    component: Home,
    children: [{ path: '/', component: welcome },
      { path: '/article', component: Article },
      { path: '/image', component: image }]
  },
  { path: '*', component: NotFund }]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !auth.getUser().token) return next('/login')
  return next()
})

export default router
