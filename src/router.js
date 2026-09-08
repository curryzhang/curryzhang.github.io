import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import PostDetail from './views/PostDetail.vue'
import Moments from './views/Moments.vue'
import Admin from './views/Admin.vue'
import CategoryView from './views/CategoryView.vue'

// 使用 hash 路由：GitHub Pages 默认没有 SPA fallback，
// 用 #/post/xxx 这种形式刷新/直链都不会 404。
const routes = [
  { path: '/', name: 'home', component: Home, meta: { title: '首页' } },
  { path: '/post/:slug', name: 'post', component: PostDetail, meta: { title: '文章' } },
  { path: '/moments', name: 'moments', component: Moments, meta: { title: '说说' } },
  { path: '/category/:name', name: 'category', component: CategoryView, meta: { title: '代码笔记' } },
  { path: '/admin', name: 'admin', component: Admin, meta: { title: '管理' } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
