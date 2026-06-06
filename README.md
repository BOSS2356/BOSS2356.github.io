# 个人博客 - 专辑墙功能

## 🎵 功能说明

这个博客现在有一个精美的专辑墙功能，可以显示你的Spotify歌单中的专辑！

## 🚀 运行步骤

### 1. 安装Node.js依赖

在博客目录下打开命令行（PowerShell或CMD），运行：

```bash
npm install
```

如果PowerShell提示执行策略问题，可以尝试：

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm install
```

### 2. 启动后端服务器

```bash
node server.js
```

服务器会在 `http://localhost:3000` 启动

### 3. 打开博客

在浏览器中访问：`http://localhost:3000/index.html`

点击导航栏的"音乐墙"，就能看到你的Spotify歌单专辑了！

## 📁 文件说明

- `index.html` - 博客主页面
- `server.js` - Node.js后端服务器（负责调用Spotify API）
- `package.json` - 项目依赖配置
- `README.md` - 说明文档

## 🎨 专辑墙特点

- 精美的3D翻转动画
- 黑胶唱片背景效果
- 响应式网格布局
- 真实的Spotify专辑封面
- 点击卡片查看专辑详情

## 🔧 修改歌单

在 `index.html` 中找到 `playlistId` 变量，修改为你的Spotify歌单ID即可！

```javascript
const playlistId = '你的歌单ID';
```

## 📦 依赖包

- `express` - Web服务器框架
- `cors` - 跨域资源共享
- `node-fetch` - HTTP请求库

## 💡 备用方案

如果后端无法运行，专辑墙会自动显示备用的热门专辑数据，所以不用担心！

祝你使用愉快！🎶
