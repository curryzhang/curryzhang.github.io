// Markdown 渲染封装（marked）
import { marked } from 'marked'

marked.setOptions({
  gfm: true,
  breaks: true // 单换行也换行，写说说/随笔更自然
})

export function renderMarkdown(text) {
  return marked.parse(text || '')
}
