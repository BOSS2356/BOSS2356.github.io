# 无界音乐页面 - Product Requirement Document

## Overview
- **Summary**: 创建一个独立的新页面，复刻Apple Music桌面端暗黑模式UI，品牌替换为"无界音乐"，所有动态内容用"请输入文本"占位
- **Purpose**: 为用户提供一个音乐应用的UI展示页面
- **Target Users**: 访问博客的用户，点击"关于无界音乐"导航项后跳转

## Goals
1. 创建独立的 wujiemusic.html 页面
2. 实现三栏布局：左侧侧边栏 + 右侧主内容区 + 底部播放控制栏
3. 采用暗黑主题，视觉风格与 Apple Music 一致
4. 所有文字内容使用"请输入文本"占位，不含实际音乐内容
5. 完全响应式设计，适配各种屏幕尺寸
6. 修改博客导航栏"关于无界音乐"的跳转链接，指向新页面

## Non-Goals (Out of Scope)
- 实现音乐播放功能
- 实现真实的音乐内容展示
- 实现后端服务或数据库
- 添加除"请输入文本"以外的实际内容

## Background & Context
用户希望点击博客导航栏的"关于无界音乐"后，跳转到一个独立的音乐应用UI展示页面，而非博客内部页面。这个页面应该是一个纯UI骨架展示。

## Functional Requirements
- **FR-1**: 创建 wujiemusic.html 独立页面
- **FR-2**: 实现左侧固定宽度侧边栏（240px），包含logo、导航菜单、资料库、播放列表
- **FR-3**: 实现右侧可滚动主内容区，包含标题、专属精选推荐、最近播放板块
- **FR-4**: 实现底部固定播放控制栏（高度80px）
- **FR-5**: 修改 index.html 导航栏"关于无界音乐"的跳转逻辑，链接到新页面
- **FR-6**: 所有文字内容用"请输入文本"占位

## Non-Functional Requirements
- **NFR-1**: 使用 Tailwind CSS v3 构建
- **NFR-2**: 完全响应式，适配桌面端、平板和移动端
- **NFR-3**: 全局暗黑主题，主背景色#121212
- **NFR-4**: 交互细节：卡片悬停效果、滚动条样式等

## Constraints
- **Technical**: 纯前端 HTML/CSS/JavaScript
- **Business**: 保持与博客项目风格分离，是一个独立页面
- **Dependencies**: Tailwind CSS CDN

## Assumptions
- 页面可以独立于博客访问
- 页面上有返回博客的链接或导航

## Acceptance Criteria

### AC-1: 页面创建与链接
- **Given**: 用户点击博客导航栏的"关于无界音乐"
- **When**: 点击动作发生
- **Then**: 跳转到 wujiemusic.html 页面
- **Verification**: human-judgment

### AC-2: 侧边栏布局
- **Given**: 用户访问无界音乐页面
- **When**: 页面加载完成
- **Then**: 显示左侧侧边栏（宽度240px），包含logo区、导航菜单、资料库、播放列表
- **Verification**: human-judgment

### AC-3: 主内容区布局
- **Given**: 用户访问无界音乐页面
- **When**: 页面加载完成
- **Then**: 显示右侧主内容区，包含"主页"标题、专属精选推荐板块、最近播放板块
- **Verification**: human-judgment

### AC-4: 底部播放控制栏
- **Given**: 用户访问无界音乐页面
- **When**: 页面加载完成
- **Then**: 显示底部固定播放控制栏（高度80px），包含封面占位、歌曲信息、播放控制按钮
- **Verification**: human-judgment

### AC-5: 文字占位
- **Given**: 用户访问无界音乐页面
- **When**: 查看任何动态内容区域
- **Then**: 所有文字显示为"请输入文本"
- **Verification**: human-judgment

### AC-6: 暗黑主题
- **Given**: 用户访问无界音乐页面
- **When**: 页面加载完成
- **Then**: 显示暗黑主题，背景色#121212，侧边栏#1c1c1e，卡片#2c2c2e
- **Verification**: human-judgment

## Open Questions
- 页面是否需要添加返回博客首页的链接？（假设：需要，在右上角或侧边栏添加）
