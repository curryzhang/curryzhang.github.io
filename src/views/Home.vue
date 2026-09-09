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
          还没有文章，敬请期待～
        </div>
        <PostCard v-for="p in posts" :key="p.slug" :post="p" />
      </div>

      <aside class="side">
        <h2 class="section-title">关于我</h2>
        <div class="profile card">
          <div class="profile-avatar">
            <img v-if="CONFIG.profile.avatar" :src="CONFIG.profile.avatar" :alt="CONFIG.profile.name || CONFIG.siteTitle" />
            <span v-else>{{ (CONFIG.profile.name || '?').charAt(0) }}</span>
          </div>
          <p class="profile-slogan">{{ CONFIG.profile.slogan }}</p>
          <div class="profile-links">
            <a
              v-for="l in CONFIG.profile.links"
              :key="l.url"
              :href="l.url"
              target="_blank"
              rel="noopener"
              class="profile-link"
            >{{ l.label }}</a>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PostCard from '../components/PostCard.vue'
import { CONFIG } from '../config.js'
import { listPosts, getRawFile } from '../lib/github.js'
import { parseFrontmatter } from '../lib/frontmatter.js'
import { getToken } from '../lib/store.js'

const posts = ref([])
const loading = ref(true)

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
          category: data.category || '',
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

onMounted(() => {
  loadPosts()
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
.side {
  position: sticky;
  top: 72px;
}
.profile {
  padding: 22px 18px;
  text-align: center;
}
.profile-avatar {
  width: 76px;
  height: 76px;
  margin: 0 auto 12px;
  border-radius: 50%;
  overflow: hidden;
  background: transparent;
  border: none;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
}
.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.profile-name {
  margin: 0 0 6px;
  font-size: 18px;
}
.profile-slogan {
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
}
.profile-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.profile-link {
  display: block;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 13px;
  color: var(--text);
}
.profile-link:hover {
  border-color: var(--primary);
  color: var(--primary);
  text-decoration: none;
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
