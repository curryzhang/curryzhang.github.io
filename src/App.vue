<template>
  <NavBar />
  <main class="container">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <footer class="footer">
    <span>© {{ year }} {{ CONFIG.author }} · Powered by Vue3 + GitHub Pages</span>
    <span class="footer-tip">纯前端 · 无后端 · 无数据库</span>
  </footer>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import { CONFIG } from './config.js'

const year = ref(new Date().getFullYear())
</script>

<style scoped>
.footer {
  margin-top: 48px;
  padding: 24px 16px;
  text-align: center;
  color: var(--text-muted);
  font-size: 13px;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.footer-tip {
  font-size: 12px;
  opacity: 0.7;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
