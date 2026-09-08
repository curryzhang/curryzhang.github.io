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
              v-for="c in CONFIG.categories"
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
import { ref } from 'vue'
import { CONFIG } from '../config.js'

const dropOpen = ref(false)
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
