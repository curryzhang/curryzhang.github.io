<template>
  <section>
    <div class="hero">
      <h1>{{ CONFIG.siteTitle }}</h1>
      <p>{{ CONFIG.siteSubtitle }}</p>
    </div>

    <div class="layout">
      <div class="posts">
        <h2 class="section-title">最新文章</h2>
        <div v-if="loading" class="hint">加载中…</div>
        <div v-else-if="!posts.length" class="hint empty">
          还没有文章。去 <router-link to="/admin">管理页</router-link> 发布第一篇吧～
        </div>
        <PostCard v-for="p in posts" :key="p.slug" :post="p" />
      </div>

      <aside class="side">
        <h2 class="section-title">
          最近说说
          <router-link to="/moments" class="more">更多 ›</router-link>
        </h2>
        <div v-if="momentsLoading" class="hint">加载中…</div>
        <div v-else-if="!recentMoments.length" class="hint">暂无说说</div>
        <div v-else class="side-moments">
          <div v-for="m in recentMoments" :key="m.id" class="side-moment">
            <p class="side-moment-text">{{ plain(m.content) }}</p>
            <span class="side-moment-date">{{ shortDate(m.date) }}</span>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import PostCard from '../components/PostCard.vue'
import { CONFIG } from '../config.js'
import { listPosts, getRawFile } from '../lib/github.js'
import { parseFrontmatter } from '../lib/frontmatter.js'
import { getToken } from '../lib/store.js'

const posts = ref([])
const loading = ref(true)
const recentMoments = ref([])
const momentsLoading = ref(true)

function plain(md) {
  return (md || '').replace(/[#>*`_-]/g, '').slice(0, 60)
}
function shortDate(d) {
  return d ? dayjs(d).format('MM-DD') : ''
}

async function loadPosts() {
  try {
    const files = await listPosts(getToken() || null)
    const list = []
    for (const f of files) {
      try {
        const raw = await getRawFile(f.path)
        const { data } = parseFrontmatter(raw)
        list.push({
          slug: f.slug,
          title: data.title || f.slug,
          date: data.date || '',
          tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
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

async function loadMoments() {
  try {
    const raw = await getRawFile(CONFIG.momentsPath)
    const arr = JSON.parse(raw)
    if (Array.isArray(arr)) {
      arr.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      recentMoments.value = arr.slice(0, 5)
    }
  } catch (e) {
    // moments.json 可能还不存在
  } finally {
    momentsLoading.value = false
  }
}

onMounted(() => {
  loadPosts()
  loadMoments()
})
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 32px 0 24px;
}
.hero h1 {
  margin: 0;
  font-size: 30px;
}
.hero p {
  margin: 8px 0 0;
  color: var(--text-muted);
}
.layout {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 24px;
  align-items: start;
}
.section-title {
  font-size: 16px;
  margin: 0 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.more {
  font-size: 13px;
  font-weight: 400;
}
.side {
  position: sticky;
  top: 72px;
}
.side-moments {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.side-moment {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 12px;
}
.side-moment-text {
  margin: 0;
  font-size: 13px;
  color: var(--text);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.side-moment-date {
  font-size: 11px;
  color: var(--text-muted);
}
.hint {
  color: var(--text-muted);
  font-size: 14px;
  padding: 12px 0;
}
.empty {
  background: var(--surface);
  border: 1px dashed var(--border);
  border-radius: 10px;
  padding: 24px;
  text-align: center;
}
@media (max-width: 720px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .side {
    position: static;
  }
}
</style>
