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
  homeUrl: 'https://curryzhang.github.io/',

  // 文章类别（写文章时下拉选择，导航栏"代码笔记"下拉展示）
  categories: ['前端', 'C#', 'MySQL'],

  // 管理员密码（进入管理页的第一道门，与 GitHub Token 登录独立）
  adminPassword: 'Curry6663',

  // 首页侧栏「个人信息」卡片
  profile: {
    name: '张小东',
    slogan: '欲买桂花同载酒，终不似，少年游',
    // 头像留空则使用姓名首字生成；也可填图片 URL
    avatar: '',
    links: [
      { label: '博客', url: 'http://curryzhang.top' },
      { label: '简书', url: 'https://www.jianshu.com/u/0469adf1cb7b' },
      { label: 'GitHub', url: 'https://github.com/curryzhang' }
    ]
  }
}
