// ============================================================
// GitHub 内容读写封装
// 把 GitHub 仓库当作"后台 + 数据库"：文章存为 .md，说说存为 moments.json。
// 所有操作都通过 GitHub REST API 完成，无需自建后端 / MySQL。
// ============================================================
import { CONFIG } from '../config.js'

const API = 'https://api.github.com'
const RAW = 'https://raw.githubusercontent.com'

function authHeaders(token) {
  const h = { Accept: 'application/vnd.github+json' }
  if (token) h.Authorization = `Bearer ${token}`
  return h
}

// 通用 GET（用于读取目录、文件元信息、校验 token 等）
export async function apiGet(path, token) {
  const res = await fetch(`${API}${path}`, { headers: authHeaders(token) })
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`GitHub API ${res.status}: ${t}`)
  }
  return res.json()
}

// 校验 token 是否有效，并返回当前用户信息
export async function verifyToken(token) {
  const user = await apiGet('/user', token)
  return user
}

// 列出文章目录下的所有 .md 文件（返回文件名、sha、下载地址）
export async function listPosts(token) {
  const data = await apiGet(
    `/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${CONFIG.postsPath}?ref=${CONFIG.branch}`,
    token
  )
  if (!Array.isArray(data)) return []
  return data
    .filter((f) => f.name.endsWith('.md'))
    .map((f) => ({
      name: f.name,
      slug: f.name.replace(/\.md$/, ''),
      sha: f.sha,
      path: f.path,
      download_url: f.download_url,
      size: f.size
    }))
}

// 读取站点内容文件（文章 / 说说）。
// 本站部署在 username.github.io 根目录，内容文件与站点同源，
// 直接走相对根路径（如 /content/posts/xxx.md）即可，无需依赖 raw 接口的跨域。
export async function getRawFile(path) {
  const res = await fetch(`/${path}`)
  if (!res.ok) throw new Error(`读取 ${path} 失败 (${res.status})`)
  return res.text()
}

// 读取文件元信息（含 sha，更新文件时必须带上）
export async function getFileMeta(path, token) {
  return apiGet(
    `/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${path}?ref=${CONFIG.branch}`,
    token
  )
}

// 创建或更新仓库内的一个文件
// content 为 UTF-8 文本；sha 存在时为"更新"，不存在时为"新建"
export async function putFile(path, content, sha, message, token) {
  const body = {
    message,
    content: utf8ToBase64(content),
    branch: CONFIG.branch
  }
  if (sha) body.sha = sha
  const res = await fetch(
    `${API}/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        ...authHeaders(token),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  )
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`提交失败 (${res.status}): ${t}`)
  }
  return res.json()
}

// 删除仓库内的一个文件
export async function deleteFile(path, sha, message, token) {
  const res = await fetch(
    `${API}/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${path}`,
    {
      method: 'DELETE',
      headers: {
        ...authHeaders(token),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, sha, branch: CONFIG.branch })
    }
  )
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`删除失败 (${res.status}): ${t}`)
  }
  return res.json()
}

// UTF-8 安全的 base64 编码（GitHub API 要求 content 为 base64）
function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  bytes.forEach((b) => (binary += String.fromCharCode(b)))
  return btoa(binary)
}
