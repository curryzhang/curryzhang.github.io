<template>
  <section v-if="post">
    <router-link to="/" class="back">‹ 返回首页</router-link>
    <article class="post card">
      <h1 class="title">{{ post.title }}</h1>
      <div class="meta">
        <span>{{ formatDate(post.date) }}</span>
        <span v-if="post.tags.length" class="tags">
          <span v-for="t in post.tags" :key="t" class="tag">{{ t }}</span>
        </span>
      </div>
      <MarkdownView :source="post.content" />
    </article>
  </section>
  <div v-else-if="loading" class="hint">加载中…</div>
  <div v-else class="hint empty">
    文章不存在或已被删除。<router-link to="/">返回首页</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import MarkdownView from '../components/MarkdownView.vue'
import { getRawFile } from '../lib/github.js'
import { parseFrontmatter } from '../lib/frontmatter.js'

const route = useRoute()
const post = ref(null)
const loading = ref(true)

function formatDate(d) {
  return d ? dayjs(d).format('YYYY-MM-DD') : ''
}

async function load(slug) {
  loading.value = true
  post.value = null
  try {
    const raw = await getRawFile(`content/posts/${slug}.md`)
    const { data, content } = parseFrontmatter(raw)
    post.value = {
      title: data.title || slug,
      date: data.date || '',
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      content
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => load(route.params.slug))
watch(() => route.params.slug, (s) => s && load(s))
</script>

<style scoped>
.back {
  display: inline-block;
  margin-bottom: 12px;
  font-size: 14px;
}
.post {
  padding: 28px 30px;
}
.title {
  margin: 0 0 10px;
  font-size: 26px;
}
.meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  color: var(--text-muted);
  font-size: 13px;
  margin-bottom: 20px;
}
.hint {
  color: var(--text-muted);
  padding: 24px 0;
}
.empty {
  text-align: center;
}
</style>
