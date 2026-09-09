<template>
  <section class="admin">
    <!-- 第一道门：管理员密码 -->
    <div v-if="!unlocked" class="login card">
      <h1>管理员验证</h1>
      <p class="desc">请输入管理员密码以进入后台。</p>
      <label class="field">
        <span>管理员密码</span>
        <input
          class="input"
          type="password"
          v-model="pwdInput"
          placeholder="请输入密码"
          @keyup.enter="checkPwd"
        />
      </label>
      <button class="btn btn-primary" :disabled="busy || !pwdInput" @click="checkPwd">
        进入后台
      </button>
      <p v-if="pwdError" class="error">{{ pwdError }}</p>
    </div>

    <template v-else>
    <!-- 未登录：登录 -->
    <div v-if="!loggedIn" class="login card">
      <h1>管理员登录</h1>
      <p class="desc">
        使用 GitHub <b>Personal Access Token</b> 登录，登录后即可把文章/说说直接提交到仓库。
      </p>
      <label class="field">
        <span>GitHub Token</span>
        <input
          class="input"
          type="password"
          v-model="tokenInput"
          placeholder="ghp_xxx 或 github_pat_xxx"
          @keyup.enter="login"
        />
      </label>
      <button class="btn btn-primary" :disabled="busy || !tokenInput" @click="login">
        {{ busy ? '校验中…' : '登录' }}
      </button>
      <div class="token-help">
        <p>如何获取 Token：</p>
        <ol>
          <li>打开 GitHub → <b>Settings → Developer settings → Personal access tokens → Tokens (classic)</b></li>
          <li>点 <b>Generate new token</b>，勾选 <code>repo</code> 权限</li>
          <li>复制生成的 token 粘贴到上方（建议仅授权本博客仓库的 Fine-grained token）</li>
        </ol>
        <p class="warn">⚠️ Token 仅保存在你当前浏览器的 localStorage，不会上传到任何服务器。但任何能打开此浏览器的人都能用它发内容，请勿在公共电脑登录。</p>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <!-- 已登录：管理面板 -->
    <div v-else>
      <div class="admin-bar">
        <div class="who">
          <span class="avatar">{{ userInitial }}</span>
          <span>{{ userName }}</span>
          <span class="repo">· {{ CONFIG.owner }}/{{ CONFIG.repo }}</span>
        </div>
        <button class="btn" @click="logout">退出登录</button>
      </div>

      <div class="tabs">
        <button :class="['tab', { active: tab === 'write' }]" @click="tab = 'write'">
          {{ editing ? '编辑文章' : '写文章' }}
        </button>
        <button :class="['tab', { active: tab === 'posts' }]" @click="tab = 'posts'">
          文章管理
        </button>
        <button :class="['tab', { active: tab === 'moments' }]" @click="tab = 'moments'">
          说说管理
        </button>
      </div>

      <!-- 写文章 -->
      <div v-if="tab === 'write'" class="card panel">
        <div class="form-grid">
          <label class="field">
            <span>标题 *</span>
            <input class="input" v-model="form.title" placeholder="文章标题" @input="onTitleInput" />
          </label>
          <label class="field">
            <span>日期</span>
            <input class="input" type="date" v-model="form.date" />
          </label>
          <label class="field">
            <span>文件名(slug)</span>
            <input class="input" v-model="form.slug" placeholder="留空则自动生成" />
          </label>
          <label class="field">
            <span>类别</span>
            <input
              class="input"
              list="category-list"
              v-model="form.category"
              placeholder="选择或输入自定义类别"
            />
            <datalist id="category-list">
              <option v-for="c in CONFIG.categories" :key="c" :value="c"></option>
            </datalist>
          </label>
          <label class="field">
            <span>标签(逗号分隔)</span>
            <input class="input" v-model="form.tags" placeholder="Vue, 前端, 随笔" />
          </label>
          <label class="field field-full">
            <span>摘要</span>
            <input class="input" v-model="form.description" placeholder="列表页显示的简介（可选）" />
          </label>
        </div>
        <label class="field">
          <span>正文（Markdown）</span>
          <textarea class="textarea" v-model="form.content" style="min-height: 220px"></textarea>
        </label>
        <details class="preview">
          <summary>预览</summary>
          <div class="preview-box card">
            <MarkdownView :source="form.content" />
          </div>
        </details>
        <div class="actions">
          <button class="btn" @click="resetForm" v-if="editing">取消编辑</button>
          <button class="btn btn-primary" :disabled="busy || !form.title || !form.content" @click="publishPost">
            {{ busy ? '提交中…' : editing ? '保存修改' : '发布文章' }}
          </button>
        </div>
      </div>

      <!-- 文章管理 -->
      <div v-else-if="tab === 'posts'" class="card panel">
        <div v-if="postsLoading" class="hint">加载中…</div>
        <div v-else-if="!posts.length" class="hint">还没有文章</div>
        <div v-else class="list">
          <div v-for="p in posts" :key="p.slug" class="list-item">
            <div class="list-info">
              <span class="list-title">{{ p.title }}</span>
              <span class="list-sub">{{ p.date }} · {{ p.slug }}.md</span>
            </div>
            <div class="list-actions">
              <button class="btn" @click="editPost(p)">编辑</button>
              <button class="btn btn-danger" @click="removePost(p)">删除</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 说说管理 -->
      <div v-else class="card panel">
        <label class="field">
          <span>新说说</span>
          <textarea class="textarea" v-model="momentInput" placeholder="今天有什么想法？支持 Markdown～"></textarea>
        </label>
        <div class="actions">
          <button class="btn btn-primary" :disabled="busy || !momentInput.trim()" @click="publishMoment">
            {{ busy ? '提交中…' : '发布说说' }}
          </button>
        </div>
        <div v-if="momentsLoading" class="hint">加载中…</div>
        <div v-else-if="!moments.length" class="hint">还没有说说</div>
        <div v-else class="list">
          <div v-for="m in moments" :key="m.id" class="list-item">
            <div class="list-info">
              <span class="list-title">{{ plain(m.content) }}</span>
              <span class="list-sub">{{ formatDate(m.date) }}</span>
            </div>
            <div class="list-actions">
              <button class="btn btn-danger" @click="removeMoment(m)">删除</button>
            </div>
          </div>
        </div>
      </div>

      <p v-if="msg" :class="['msg', msgType]">{{ msg }}</p>
    </div>
    </template>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import MarkdownView from '../components/MarkdownView.vue'
import { CONFIG } from '../config.js'
import { getToken, isLoggedIn, setToken, authState } from '../lib/store.js'
import {
  verifyToken,
  listPosts,
  getRawFile,
  getFileMeta,
  putFile,
  deleteFile
} from '../lib/github.js'
import {
  parseFrontmatter,
  stringifyFrontmatter,
  slugify
} from '../lib/frontmatter.js'

const loggedIn = computed(() => isLoggedIn())
const tokenInput = ref('')
const busy = ref(false)
const error = ref('')
const tab = ref('write')
const editing = ref(false)

// ---------- 管理员密码门 ----------
const unlocked = ref(sessionStorage.getItem('admin_unlocked') === '1')
const pwdInput = ref('')
const pwdError = ref('')
function checkPwd() {
  busy.value = true
  pwdError.value = ''
  // 极短延时，避免误触；密码为前端静态校验（仅用于隐藏入口，非真正安全）
  setTimeout(() => {
    if (pwdInput.value === CONFIG.adminPassword) {
      unlocked.value = true
      sessionStorage.setItem('admin_unlocked', '1')
    } else {
      pwdError.value = '密码错误，请重试'
    }
    busy.value = false
  }, 150)
}

const userName = computed(() => authState.user?.login || 'me')
const userInitial = computed(() => (userName.value || 'M').slice(0, 1).toUpperCase())

const msg = ref('')
const msgType = ref('ok')
function showMsg(text, type = 'ok') {
  msg.value = text
  msgType.value = type
  setTimeout(() => (msg.value = ''), 4000)
}

// ---------- 登录 ----------
async function login() {
  busy.value = true
  error.value = ''
  try {
    const user = await verifyToken(tokenInput.value.trim())
    setToken(tokenInput.value.trim(), user)
    showMsg(`欢迎，${user.login}！`)
  } catch (e) {
    error.value = 'Token 校验失败：' + e.message
  } finally {
    busy.value = false
  }
}

function logout() {
  setToken('')
  tokenInput.value = ''
  editing.value = false
  showMsg('已退出登录')
}

// ---------- 文章表单 ----------
const form = reactive({
  title: '',
  date: dayjs().format('YYYY-MM-DD'),
  slug: '',
  category: '',
  tags: '',
  description: '',
  content: ''
})
let editSha = null

function onTitleInput() {
  if (!editing.value) form.slug = slugify(form.title)
}
function resetForm() {
  form.title = ''
  form.date = dayjs().format('YYYY-MM-DD')
  form.slug = ''
  form.category = ''
  form.tags = ''
  form.description = ''
  form.content = ''
  editing.value = false
  editSha = null
  // 取消编辑 / 保存后回到「文章管理」列表页
  tab.value = 'posts'
}

async function publishPost() {
  busy.value = true
  try {
    const slug = (form.slug || slugify(form.title)).toLowerCase()
    const data = {
      title: form.title,
      date: form.date,
      category: form.category || '',
      tags: form.tags
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      description: form.description
    }
    const content = stringifyFrontmatter(data, form.content)
    const path = `${CONFIG.postsPath}/${slug}.md`
    await putFile(path, content, editSha, `${editing.value ? '更新' : '新增'}文章: ${slug}`, getToken())
    showMsg(editing.value ? '文章已更新 ✅' : '文章已发布 ✅')
    resetForm()
    loadPosts()
  } catch (e) {
    showMsg('发布失败：' + e.message, 'err')
  } finally {
    busy.value = false
  }
}

// ---------- 文章列表 / 编辑 / 删除 ----------
const posts = ref([])
const postsLoading = ref(false)

async function loadPosts() {
  postsLoading.value = true
  try {
    const files = await listPosts(getToken())
    const list = []
    for (const f of files) {
      try {
        const raw = await getRawFile(f.path)
        const { data } = parseFrontmatter(raw)
        list.push({
          slug: f.slug,
          title: data.title || f.slug,
          date: data.date || '',
          tags: data.tags || [],
          description: data.description || '',
          sha: f.sha,
          path: f.path
        })
      } catch (e) {}
    }
    list.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    posts.value = list
  } catch (e) {
    showMsg('读取文章失败：' + e.message, 'err')
  } finally {
    postsLoading.value = false
  }
}

async function editPost(p) {
  try {
    const raw = await getRawFile(p.path)
    const { data, content } = parseFrontmatter(raw)
    form.title = data.title || p.slug
    form.date = data.date || dayjs().format('YYYY-MM-DD')
    form.slug = p.slug
    form.category = data.category || ''
    form.tags = Array.isArray(data.tags) ? data.tags.join(', ') : data.tags || ''
    form.description = data.description || ''
    form.content = content
    editing.value = true
    editSha = p.sha
    tab.value = 'write'
  } catch (e) {
    showMsg('加载文章失败：' + e.message, 'err')
  }
}

async function removePost(p) {
  if (!confirm(`确定删除《${p.title}》？此操作不可恢复。`)) return
  busy.value = true
  try {
    const meta = await getFileMeta(p.path, getToken())
    await deleteFile(p.path, meta.sha, `删除文章: ${p.slug}`, getToken())
    showMsg('已删除 ✅')
    loadPosts()
  } catch (e) {
    showMsg('删除失败：' + e.message, 'err')
  } finally {
    busy.value = false
  }
}

// ---------- 说说 ----------
const momentInput = ref('')
const moments = ref([])
const momentsLoading = ref(false)

function plain(md) {
  return (md || '').replace(/[#>*`_-]/g, '').slice(0, 50)
}
function formatDate(d) {
  return d ? dayjs(d).format('YYYY-MM-DD HH:mm') : ''
}

async function readMoments() {
  try {
    const meta = await getFileMeta(CONFIG.momentsPath, getToken())
    const text = decodeBase64(meta.content)
    const arr = JSON.parse(text)
    return { data: Array.isArray(arr) ? arr : [], sha: meta.sha }
  } catch (e) {
    // 404 = 文件不存在，视为空
    return { data: [], sha: null }
  }
}

async function publishMoment() {
  busy.value = true
  try {
    const { data, sha } = await readMoments()
    data.push({
      id: 'm_' + Date.now(),
      content: momentInput.value.trim(),
      date: new Date().toISOString()
    })
    await putFile(
      CONFIG.momentsPath,
      JSON.stringify(data, null, 2),
      sha,
      '新增说说',
      getToken()
    )
    momentInput.value = ''
    showMsg('说说已发布 ✅')
    loadMoments()
  } catch (e) {
    showMsg('发布失败：' + e.message, 'err')
  } finally {
    busy.value = false
  }
}

async function removeMoment(m) {
  if (!confirm('确定删除这条说说？')) return
  busy.value = true
  try {
    const { data, sha } = await readMoments()
    if (!sha) return
    const next = data.filter((x) => x.id !== m.id)
    await putFile(
      CONFIG.momentsPath,
      JSON.stringify(next, null, 2),
      sha,
      '删除说说',
      getToken()
    )
    showMsg('已删除 ✅')
    loadMoments()
  } catch (e) {
    showMsg('删除失败：' + e.message, 'err')
  } finally {
    busy.value = false
  }
}

async function loadMoments() {
  momentsLoading.value = true
  try {
    const { data } = await readMoments()
    data.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    moments.value = data
  } catch (e) {}
  finally {
    momentsLoading.value = false
  }
}

function decodeBase64(b64) {
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new TextDecoder().decode(bytes)
}

onMounted(() => {
  if (loggedIn.value) {
    loadPosts()
    loadMoments()
  }
})
</script>

<style scoped>
.login {
  max-width: 520px;
  margin: 24px auto;
  padding: 28px;
}
.login h1 {
  margin: 0 0 8px;
  font-size: 22px;
}
.desc {
  color: var(--text-muted);
  font-size: 14px;
  margin: 0 0 18px;
}
.field {
  display: block;
  margin-bottom: 14px;
}
.field > span {
  display: block;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 6px;
}
.token-help {
  margin-top: 18px;
  font-size: 13px;
  color: var(--text-muted);
  background: var(--bg);
  border-radius: 10px;
  padding: 14px 16px;
}
.token-help ol {
  padding-left: 18px;
  margin: 8px 0;
}
.token-help code {
  background: #f1f1f4;
  padding: 1px 5px;
  border-radius: 4px;
}
.warn {
  color: #b45309;
}
.error {
  color: var(--danger);
  font-size: 13px;
  margin-top: 12px;
}
.admin-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.who {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
}
.repo {
  color: var(--text-muted);
  font-size: 13px;
}
.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.tab {
  padding: 8px 16px;
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}
.tab.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}
.panel {
  padding: 22px;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 16px;
}
.field-full {
  grid-column: 1 / -1;
}
.preview {
  margin: 14px 0;
  font-size: 14px;
}
.preview summary {
  cursor: pointer;
  color: var(--primary);
}
.preview-box {
  margin-top: 10px;
  padding: 16px;
}
.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 14px;
}
.hint {
  color: var(--text-muted);
  font-size: 14px;
  padding: 12px 0;
}
.list {
  display: flex;
  flex-direction: column;
}
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 4px;
  border-bottom: 1px solid var(--border);
}
.list-item:last-child {
  border-bottom: none;
}
.list-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.list-title {
  font-weight: 500;
}
.list-sub {
  font-size: 12px;
  color: var(--text-muted);
}
.list-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}
.msg {
  margin-top: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
}
.msg.ok {
  background: #ecfdf5;
  color: #047857;
}
.msg.err {
  background: #fef2f2;
  color: #b91c1c;
}
@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
