const KEY = 'hm-toutiao-pc-93-user'
const serUser = (user) => {
  //存储用户信息
  window.sessionStorage.setItem(KEY, JSON.stringify(user))
}

//获取用户信息
const getUser = () => {
  return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
}

//删除用户信息
const delUser = () => {
  window.sessionStorage.removeItem(KEY)
}
export default {
  serUser,
  getUser,
  delUser
}
