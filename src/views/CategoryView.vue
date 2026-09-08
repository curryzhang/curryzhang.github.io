<template>
  <section>
    <div class="head">
      <router-link to="/" class="back">‹ 返回首页</router-link>
      <h1>代码笔记 · {{ category }}</h1>
      <p class="sub">共 {{ posts.length }} 篇属于「{{ category }}」的文章</p>
    </div>

    <div v-if="loading" class="hint">加载中…</div>
    <div v-else-if="!posts.length" class="hint empty">
      该类别下还没有文章。
    </div>
    <PostCard v-for="p in posts" :key="p.slug" :post="p" />
  </section>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import PostCard from '../components/PostCard.vue'
import { getRawFile } from '../lib/github.js'
import { parseFrontmatter } from '../lib/frontmatter.js'
import { listPosts } from '../lib/github.js'

const route = useRoute()
const posts = ref([])
const loading = ref(true)

const category = computed(() => decodeURIComponent(route.params.name || ''))

async function load() {
  loading.value = true
  posts.value = []
  try {
    const files = await listPosts(null)
    const list = []
    for (const f of files) {
      try {
        const raw = await getRawFile(f.path)
        const { data } = parseFrontmatter(raw)
        const cat = data.category || ''
        if (cat !== category.value) continue
        list.push({
          slug: f.slug,
          title: data.title || f.slug,
          date: data.date || '',
          tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
          category: cat,
          description: data.description || ''
        })
      } catch (e) {
        // 单篇读取失败不影响其它
      }
    }
    list.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    posts.value = list
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(() => route.params.name, load)
</script>

<style scoped>
.head {
  text-align: center;
  padding: 16px 0 20px;
}
.back {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 14px;
}
.head h1 {
  margin: 0;
  font-size: 26px;
}
.sub {
  margin: 6px 0 0;
  color: var(--text-muted);
  font-size: 14px;
}
.hint {
  color: var(--text-muted);
  padding: 24px 0;
}
.empty {
  text-align: center;
  background: var(--surface);
  border: 1px dashed var(--border);
  border-radius: 10px;
  padding: 28px;
}
</style>
