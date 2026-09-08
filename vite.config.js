import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base 用相对路径，部署到 GitHub Pages（含子路径）都不会找不到资源
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    port: 5173,
    open: true
  }
})
