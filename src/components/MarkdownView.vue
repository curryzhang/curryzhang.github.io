<template>
  <div class="markdown-body" v-html="html" ref="el"></div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import hljs from 'highlight.js/lib/common'
import { renderMarkdown } from '../lib/markdown.js'

const props = defineProps({ source: { type: String, default: '' } })
const html = ref('')
const el = ref(null)

function update() {
  html.value = renderMarkdown(props.source)
}
function highlight() {
  if (!el.value) return
  el.value.querySelectorAll('pre code').forEach((b) => {
    if (!b.dataset.hl) {
      hljs.highlightElement(b)
      b.dataset.hl = '1'
    }
  })
}

onMounted(() => {
  update()
  nextTick(highlight)
})
watch(
  () => props.source,
  () => {
    update()
    nextTick(highlight)
  }
)
</script>

<style scoped>
.markdown-body {
  font-size: 16px;
  color: var(--text);
}
.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3) {
  margin: 1.4em 0 0.6em;
  line-height: 1.3;
}
.markdown-body :deep(h1) { font-size: 1.7em; }
.markdown-body :deep(h2) {
  font-size: 1.35em;
  border-bottom: 1px solid var(--border);
  padding-bottom: 6px;
}
.markdown-body :deep(h3) { font-size: 1.15em; }
.markdown-body :deep(p) { margin: 0.8em 0; }
.markdown-body :deep(a) { color: var(--primary); }
.markdown-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
}
.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 1.4em;
}
.markdown-body :deep(li) { margin: 0.3em 0; }
.markdown-body :deep(blockquote) {
  margin: 1em 0;
  padding: 8px 16px;
  border-left: 4px solid var(--primary);
  background: var(--primary-soft);
  border-radius: 0 8px 8px 0;
  color: var(--text-muted);
}
.markdown-body :deep(code) {
  background: #f1f1f4;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}
.markdown-body :deep(pre) {
  background: #1e1e2e;
  color: #e4e4e7;
  padding: 14px 16px;
  border-radius: 10px;
  overflow-x: auto;
}
.markdown-body :deep(pre code) {
  background: transparent;
  padding: 0;
  color: inherit;
}
.markdown-body :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}
.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid var(--border);
  padding: 8px 12px;
}
</style>
