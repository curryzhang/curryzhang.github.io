import { ref } from 'vue'

// 初始化：index.html 的 inline 脚本通常已设置好 data-theme，
// 这里只是把当前值读进响应式变量（兜底按系统偏好）。
function current() {
  return document.documentElement.getAttribute('data-theme') || 'light'
}

const theme = ref(current())

function apply(t) {
  theme.value = t
  document.documentElement.setAttribute('data-theme', t)
  try {
    localStorage.setItem('theme', t)
  } catch (e) {
    // localStorage 不可用时忽略
  }
}

function toggleTheme() {
  apply(theme.value === 'dark' ? 'light' : 'dark')
}

export function useTheme() {
  return { theme, toggleTheme }
}
