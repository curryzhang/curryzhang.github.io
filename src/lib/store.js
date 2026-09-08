// 简单的登录态管理：GitHub Token 存于浏览器 localStorage
import { reactive } from 'vue'

const state = reactive({
  token: localStorage.getItem('gh_token') || '',
  user: JSON.parse(localStorage.getItem('gh_user') || 'null')
})

export function setToken(token, user) {
  state.token = token
  state.user = user || null
  if (token) {
    localStorage.setItem('gh_token', token)
    if (user) localStorage.setItem('gh_user', JSON.stringify(user))
  } else {
    localStorage.removeItem('gh_token')
    localStorage.removeItem('gh_user')
  }
}

export function getToken() {
  return state.token
}

export function isLoggedIn() {
  return !!state.token
}

export { state as authState }
