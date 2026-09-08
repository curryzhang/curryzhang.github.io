<template>
  <div class="moment card">
    <div class="moment-avatar">{{ initial }}</div>
    <div class="moment-body">
      <div class="moment-head">
        <span class="moment-author">{{ author }}</span>
        <span class="moment-date">{{ formatDate(date) }}</span>
      </div>
      <div class="moment-content" v-html="rendered"></div>
      <div v-if="images && images.length" class="moment-images">
        <img v-for="(img, i) in images" :key="i" :src="img" alt="配图" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
import { renderMarkdown } from '../lib/markdown.js'
import { CONFIG } from '../config.js'

const props = defineProps({
  content: String,
  date: String,
  images: { type: Array, default: () => [] }
})

const author = CONFIG.author
const initial = (author || 'C').slice(0, 1).toUpperCase()
const rendered = computed(() => renderMarkdown(props.content || ''))

function formatDate(d) {
  if (!d) return ''
  return dayjs(d).format('YYYY-MM-DD HH:mm')
}
</script>

<style scoped>
.moment {
  display: flex;
  gap: 12px;
  padding: 16px 18px;
  margin-bottom: 14px;
}
.moment-avatar {
  flex: 0 0 40px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-soft);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
.moment-body {
  flex: 1;
  min-width: 0;
}
.moment-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 4px;
}
.moment-author {
  font-weight: 600;
  font-size: 14px;
}
.moment-date {
  font-size: 12px;
  color: var(--text-muted);
}
.moment-content {
  font-size: 15px;
  word-break: break-word;
}
.moment-images {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}
.moment-images img {
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--border);
}
</style>
