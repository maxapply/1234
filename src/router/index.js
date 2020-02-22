import VueRouter from 'vue-router'
import Vue from 'vue'

const Login = () => import  ('@/views/login')
const Home = () => import('@/views/home')
const welcome = () => import('@/views/welcome')
const NotFund = () => import  ('@/views/404')
const Article = () => import('@/views/article')
const image = () => import  ('@/views/image')
const publish = () => import('@/views/publish')

const comment = () => import  ('@/views/comment')
const fans = () => import  ('@/views/fans')
const setting = () => import('@/views/setting')

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
      { path: '/image', component: image },
      { path: '/publish', component: publish },
      { path: '/comment', component: comment },
      { path: '/fans', component: fans },
      { path: '/setting', component: setting }
    ]
  },
  { path: '*', component: NotFund }]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !auth.getUser().token) return next('/login')
  return next()
})

export default router
