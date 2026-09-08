// 极简 frontmatter 解析 / 生成（文章 .md 头部的 --- 元信息块）
// 支持：普通字段 与 数组字段（tags: [a, b]）

export function parseFrontmatter(raw) {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
  if (!m) return { data: {}, content: raw }
  const data = {}
  m[1].split('\n').forEach((line) => {
    const idx = line.indexOf(':')
    if (idx === -1) return
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else {
      val = val.replace(/^["']|["']$/g, '')
    }
    if (key) data[key] = val
  })
  return { data, content: m[2] }
}

export function stringifyFrontmatter(data, content) {
  const lines = ['---']
  for (const [k, v] of Object.entries(data)) {
    if (Array.isArray(v)) {
      lines.push(`${k}: [${v.map((x) => `"${x}"`).join(', ')}]`)
    } else {
      lines.push(`${k}: ${v}`)
    }
  }
  lines.push('---', '', content)
  return lines.join('\n')
}

// 由标题生成文件 slug（用于 .md 文件名）
export function slugify(title) {
  const base = title
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return base || `post-${Date.now()}`
}
