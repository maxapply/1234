import axios from 'axios'
import auth from '@/utils/auth'
import router from '@/router'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers.Authorization = `Bearer ${auth.getUser().token}`

axios.interceptors.request.use(config => {
  const user = auth.getUser()
  if (user.token) config.headers.Authorization = `Bearer ${user.token}`
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response && err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
