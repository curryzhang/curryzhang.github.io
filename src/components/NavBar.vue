<template>
  <header class="navbar">
    <div class="container nav-inner">
      <router-link to="/" class="brand">
        <span class="logo">C</span>
        <span class="brand-text">{{ CONFIG.siteTitle }}</span>
      </router-link>
      <nav class="nav-links">
        <router-link to="/">首页</router-link>
        <router-link to="/moments">说说</router-link>
        <div
          class="nav-dropdown"
          @mouseenter="dropOpen = true"
          @mouseleave="dropOpen = false"
        >
          <button class="nav-dropdown-toggle" @click="dropOpen = !dropOpen">
            代码笔记 <span class="caret">▾</span>
          </button>
          <div class="nav-dropdown-menu" v-show="dropOpen">
            <router-link
              v-for="c in categories"
              :key="c"
              :to="`/category/${encodeURIComponent(c)}`"
              class="nav-dropdown-item"
              @click="dropOpen = false"
            >{{ c }}</router-link>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { CONFIG } from '../config.js'
import { listPosts, getRawFile } from '../lib/github.js'
import { parseFrontmatter } from '../lib/frontmatter.js'

const dropOpen = ref(false)
// 默认类别来自 config，再合并文章里出现过的自定义类别，让导航下拉始终包含全部类别
const categories = ref([...CONFIG.categories])

onMounted(async () => {
  try {
    const files = await listPosts(null)
    const found = new Set(CONFIG.categories)
    for (const f of files) {
      try {
        const { data } = parseFrontmatter(await getRawFile(f.path))
        if (data.category) found.add(data.category)
      } catch (e) {
        // 单篇失败忽略
      }
    }
    categories.value = [...found].sort()
  } catch (e) {
    // 拉取失败就退回默认类别
  }
})
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding-top: 0;
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
  font-weight: 700;
  font-size: 16px;
}
.brand:hover {
  text-decoration: none;
}
.logo {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}
.nav-links {
  display: flex;
  gap: 18px;
}
.nav-links a {
  color: var(--text-muted);
  font-size: 14px;
  padding: 4px 2px;
  border-bottom: 2px solid transparent;
}
.nav-links a.router-link-active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}
.nav-dropdown {
  position: relative;
}
.nav-dropdown-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-muted);
  font-size: 14px;
  padding: 4px 2px;
  border-bottom: 2px solid transparent;
  font-family: inherit;
}
.nav-dropdown-toggle:hover {
  color: var(--primary);
}
.caret {
  font-size: 10px;
}
.nav-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 6px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow);
  padding: 6px;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  z-index: 20;
}
/* 透明桥接区：覆盖按钮与菜单之间的 6px 间隙，鼠标移动时不触发 mouseleave，避免列表闪烁 */
.nav-dropdown-menu::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -12px;
  height: 12px;
}
.nav-dropdown-item {
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--text);
  font-size: 14px;
}
.nav-dropdown-item:hover {
  background: var(--primary-soft);
  color: var(--primary);
  text-decoration: none;
}
</style>
