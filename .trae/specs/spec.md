# 个人博客功能增强 - Product Requirement Document

## Overview
- **Summary**: 对现有个人博客进行功能增强，包括添加文章分类系统、优化首页动画、将文章分离到独立文件中
- **Purpose**: 提升博客的可维护性和用户体验，实现文章分类浏览功能
- **Target Users**: 博客访问者

## Goals
1. 添加导航栏"分类"页面，实现分类浏览功能
2. 将每篇文章分离到独立的 HTML 文件中
3. 在文章标题旁显示分类标签
4. 优化首页动画，仅在首次加载时显示
5. 保持现有博客的视觉风格和响应式设计

## Non-Goals (Out of Scope)
- 不添加后端服务器
- 不添加用户登录/注册功能
- 不添加评论功能

## Background & Context
现有博客是一个单页应用，所有文章内容都存储在 index.html 的 JavaScript 数组中。需要重构为更易维护的结构。

## Functional Requirements
- **FR-1**: 导航栏添加"分类"项，位于"文章"和"关于无界音乐"之间
- **FR-2**: 分类页面展示分类列表（技术、日常、随谈），点击分类后显示该分类下的文章
- **FR-3**: 每篇文章有独立的 HTML 文件，命名格式为 YYYY-MM-DD.html（同一天多篇文章时加 -1, -2 后缀）
- **FR-4**: 文章卡片和文章详情页的标题旁显示分类标签
- **FR-5**: 首页 fadeIn 动画仅在首次加载时显示
- **FR-6**: 给现有文章分类：
  - "欢迎使用 MarkdownPro" → 技术
  - "Web开发入门指南" → 技术
  - "编程学习心得" → 随谈
  - "Linux基础命令" → 技术

## Non-Functional Requirements
- **NFR-1**: 保持现有的响应式设计，适配不同设备
- **NFR-2**: 页面切换流畅，无明显卡顿
- **NFR-3**: 代码结构清晰，便于后续维护

## Constraints
- **Technical**: 纯前端实现，使用 HTML/CSS/JavaScript
- **Business**: 使用 GitHub Pages 部署
- **Dependencies**: 依赖 Tailwind CSS CDN 和 marked.js CDN

## Assumptions
- 现有文章的日期保持不变
- 分类标签的样式使用不同颜色区分
- 使用 localStorage 记录是否已显示过首页动画

## Acceptance Criteria

### AC-1: 导航栏更新
- **Given**: 用户访问博客
- **When**: 查看导航栏
- **Then**: 导航栏顺序应为"首页、文章、分类、关于无界音乐、关于我"
- **Verification**: human-judgment

### AC-2: 分类页面功能
- **Given**: 用户点击导航栏的"分类"
- **When**: 页面加载
- **Then**: 先显示分类列表（技术、日常、随谈），点击某个分类后显示该分类下的文章
- **Verification**: human-judgment

### AC-3: 文章文件分离
- **Given**: 项目目录
- **When**: 查看 articles/ 目录
- **Then**: 存在 2026-06-04.html、2026-06-03.html、2026-06-02.html、2026-06-01.html 四个文件
- **Verification**: programmatic

### AC-4: 分类标签显示
- **Given**: 用户查看文章列表或文章详情
- **When**: 浏览页面
- **Then**: 文章标题旁显示彩色分类标签
- **Verification**: human-judgment

### AC-5: 首页动画控制
- **Given**: 用户首次访问博客
- **When**: 页面加载
- **Then**: 首页显示 fadeIn 动画
- **Verification**: human-judgment

- **Given**: 用户刷新页面或从其他页面返回首页
- **When**: 页面加载
- **Then**: 首页不显示 fadeIn 动画
- **Verification**: human-judgment

## Open Questions
- 暂无
