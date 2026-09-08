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
        <router-link to="/admin">管理</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { CONFIG } from '../config.js'
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
</style>
