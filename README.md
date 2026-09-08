# Curry 的博客 🌿

一个**纯前端**的个人博客：Vue 3 + Vite + GitHub Pages。
文章与"说说"都以文件形式存在 GitHub 仓库里，后台通过 GitHub API 直接读写，**没有后端、没有数据库**。

## ✨ 功能

- 📝 **博客文章**：Markdown 写作，支持代码高亮、标签、摘要
- 🗨️ **说说（朋友圈）**：随手记录每日想法，时间线展示
- 🔐 **管理后台**：GitHub Token 登录，网页上直接发布 / 编辑 / 删除文章与说说
- 🚀 **一键部署**：推到 GitHub 即自动发布到 `xxx.github.io`
- 📱 响应式，手机也能看

## 🧠 它是怎么"没有后端"的？

| 通常的做法 | 本项目的做法 |
| --- | --- |
| 后端服务器 + 数据库 | 把 **GitHub 仓库** 当后台和数据库 |
| 写入数据库 | 调用 GitHub API 把 `.md` / `.json` 提交到仓库 |
| 服务器渲染 / 接口读取 | 页面用 `fetch` 直接读取仓库里的文件 |

- 文章 → `content/posts/<slug>.md`
- 说说 → `content/moments.json`
- 管理页"发布" = `git commit` 到仓库
- 站点本身只读这些文件，所以**内容更新无需重新构建**

## 📁 目录结构

```
blog/
├── src/
│   ├── components/      # NavBar / PostCard / MomentCard / MarkdownView
│   ├── views/           # Home / PostDetail / Moments / Admin
│   ├── lib/             # github.js(API封装) / frontmatter.js / markdown.js / store.js
│   ├── config.js        # 站点 & 仓库配置（改这里！）
│   ├── router.js
│   ├── main.js
│   └── style.css
├── content/
│   ├── posts/           # 文章（.md）
│   └── moments.json     # 说说
├── index.html
├── vite.config.js
└── .github/workflows/deploy.yml   # 自动部署
```

## 🛠 本地开发

```bash
npm install
npm run dev        # 打开 http://localhost:5173
npm run build      # 产物在 dist/
```

> 本地预览时，文章/说说会从你 `config.js` 里配置的**线上仓库**读取，
> 所以本地 `npm run dev` 也能直接看到已发布的线上内容。

## 🚀 部署到 GitHub Pages

### 方式一：自动部署（推荐）

1. 把整个 `blog/` 目录推到你想要作为博客的仓库。
   - 若要部署到 `https://curryzhang.github.io/`，仓库名必须是 `curryzhang.github.io`。
2. 在仓库 **Settings → Pages** 中，把 `Build and deployment` 的 Source 设为 **GitHub Actions**。
3. 之后每次 `git push` 到 `main`，GitHub Actions 会自动构建并发布。

### 方式二：手动部署

```bash
npm run build
# 把 dist/ 里的文件复制到仓库根目录并提交推送（Pages 选 "Deploy from a branch"）
```

## 🔑 配置管理后台 Token

1. GitHub → **Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. **Generate new token**，勾选 `repo` 权限（或新建 Fine-grained token，仅授权本仓库）
3. 打开博客的「管理」页，粘贴 token 登录即可

> ⚠️ **安全提示**
> - Token 仅保存在你当前浏览器的 `localStorage`，不会上传任何服务器。
> - 拥有 token 就等于拥有该仓库的写权限，请勿在公共电脑登录。
> - 想要更安全可改用 GitHub OAuth（需自建一小段回调，本模板暂用 Token 方案）。

## 🎨 自定义

改 `src/config.js`：

```js
export const CONFIG = {
  owner: 'curryzhang',       // 你的 GitHub 用户名
  repo: 'curryzhang.github.io', // 内容所在仓库
  branch: 'main',
  siteTitle: 'Curry 的博客',
  siteSubtitle: '记录技术、生活与每日碎碎念',
  author: 'Curry'
}
```

样式在 `src/style.css` 顶部的 CSS 变量里，改主题色只要动 `--primary` 等几个变量。

---

技术栈：Vue 3 · Vite · vue-router · marked · highlight.js · GitHub REST API
