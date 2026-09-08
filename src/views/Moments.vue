<template>
  <section>
    <div class="head">
      <h1>说说</h1>
      <p class="sub">像朋友圈一样，记录每天的零星想法 ✦</p>
    </div>

    <div v-if="loading" class="hint">加载中…</div>
    <div v-else-if="!moments.length" class="hint empty">
      还没有说说。去 <router-link to="/admin">管理页</router-link> 发一条吧～
    </div>
    <MomentCard
      v-for="m in moments"
      :key="m.id"
      :content="m.content"
      :date="m.date"
      :images="m.images"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MomentCard from '../components/MomentCard.vue'
import { CONFIG } from '../config.js'
import { getRawFile } from '../lib/github.js'

const moments = ref([])
const loading = ref(true)

async function load() {
  try {
    const raw = await getRawFile(CONFIG.momentsPath)
    const arr = JSON.parse(raw)
    if (Array.isArray(arr)) {
      arr.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      moments.value = arr
    }
  } catch (e) {
    // 文件不存在时显示空
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<style scoped>
.head {
  text-align: center;
  padding: 16px 0 20px;
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
