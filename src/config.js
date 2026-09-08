// ============================================================
// 站点 & GitHub 仓库配置
// 内容（文章 / 说说）以文件形式存放在下面这个 GitHub 仓库里，
// 管理员页通过 GitHub API 直接读写这些文件，无需任何后端/数据库。
// ============================================================
export const CONFIG = {
  // 你的 GitHub 用户名
  owner: 'curryzhang',
  // 仓库名。部署到 github.io 时，用户页仓库固定为  username.github.io
  repo: 'curryzhang.github.io',
  // 内容所在分支
  branch: 'main',

  // 文章存放目录（仓库内路径）
  postsPath: 'content/posts',
  // 说说存放文件（JSON 数组）
  momentsPath: 'content/moments.json',

  // 站点展示信息
  siteTitle: 'Curry 的博客',
  siteSubtitle: '记录技术、生活与每日碎碎念',

  // 可选：给自己博客换个头像/主页链接
  author: 'Curry',
  homeUrl: 'https://curryzhang.github.io/'
}
