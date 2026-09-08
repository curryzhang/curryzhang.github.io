---
title: 用 Vue3 做一个零后端的博客
date: 2026-09-07
tags: [Vue, 前端, 架构]
category: 前端
description: 把 GitHub 仓库当成后台和数据库，纯静态站点也能拥有完整的发布能力。
---

## 思路

很多个人博客并不需要复杂的后端。把 **GitHub 仓库** 当作：

- **数据库**：文章 = `content/posts/*.md`，说说 = `content/moments.json`
- **后台**：GitHub REST API 的 `PUT /repos/.../contents/...` 接口负责增删改
- **托管**：GitHub Pages 直接把静态文件托管出去

前端只需要 `fetch` 这些文件就能渲染，管理员点「发布」就等于 `git commit`。

## 优点

- 部署免费、稳定，无需服务器
- 内容天然版本化（每一次修改都有 Git 记录）
- 没有数据库要运维

> 适合个人博客、笔记站、作品集这类场景。
