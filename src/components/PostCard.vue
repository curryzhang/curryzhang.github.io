<template>
  <router-link :to="`/post/${post.slug}`" class="post-card card">
    <h2 class="post-title">{{ post.title }}</h2>
    <div class="post-meta">
      <span>{{ formatDate(post.date) }}</span>
      <span v-if="post.category" class="cat">{{ post.category }}</span>
      <span v-if="post.tags && post.tags.length" class="post-tags">
        <span v-for="t in post.tags" :key="t" class="tag">{{ t }}</span>
      </span>
    </div>
    <p v-if="post.description" class="post-desc">{{ post.description }}</p>
  </router-link>
</template>

<script setup>
import dayjs from 'dayjs'

defineProps({ post: { type: Object, required: true } })

function formatDate(d) {
  return d ? dayjs(d).format('YYYY-MM-DD') : ''
}
</script>

<style scoped>
.post-card {
  display: block;
  padding: 20px 22px;
  margin-bottom: 16px;
  color: var(--text);
  transition: transform 0.15s, box-shadow 0.15s;
}
.post-card:hover {
  text-decoration: none;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}
.post-title {
  margin: 0 0 8px;
  font-size: 19px;
}
.post-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.cat {
  display: inline-block;
  padding: 1px 9px;
  font-size: 12px;
  border-radius: 999px;
  background: #fff7ed;
  color: #c2410c;
  border: 1px solid #fed7aa;
}
.post-desc {
  margin: 0;
  color: var(--text-muted);
  font-size: 14px;
}
</style>
