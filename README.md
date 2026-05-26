# 游伴 Agent Demo

这是一个可直接运行、也可以部署到 GitHub Pages 的文旅 AI 演示包。

## 在线部署到 GitHub Pages

1. 仓库地址：`https://github.com/MotWang/youban-agent-demo`
2. 把本文件夹里的所有文件上传到仓库根目录，确保 `index.html` 在仓库根目录。
3. 打开仓库的 `Settings` -> `Pages`。
4. 在 `Build and deployment` 里把 `Source` 选为 `GitHub Actions`。
5. 回到 `Actions`，等待 `Deploy to GitHub Pages` 工作流完成。
6. 完成后访问：

```txt
https://MotWang.github.io/youban-agent-demo/
```

部署完成后，公开访问地址通常是：

```txt
https://MotWang.github.io/youban-agent-demo/
```

这个 Demo 是纯静态页面，不需要 GitHub 服务器运行 Node.js 后端。GitHub Pages 只负责托管文件，页面逻辑会在访问者的浏览器里运行。

## 快速运行

### macOS

双击 `start.command`，浏览器会自动打开入口页。

如果系统提示没有执行权限，可以在当前目录运行：

```sh
chmod +x start.command start.sh
./start.command
```

### Windows

双击 `start.bat`，浏览器会自动打开入口页。

### 命令行通用方式

```sh
npm start
```

启动后访问：

```txt
http://127.0.0.1:5173
```

## 可选入口

```sh
npm run start:classic
```

打开双手机画布版：`游伴 Agent Demo.html`

```sh
npm run start:ota
```

打开单手机 OTA 实用风版本：`游伴 Agent Demo - OTA风.html`

## 目录说明

- `index.html`：演示入口页。
- `游伴 Agent Demo.html`：经典展示风版本。
- `游伴 Agent Demo - OTA风.html`：OTA 实用风版本。
- `data.js`：静态演示数据。
- `app*.jsx`、`screens*.jsx`、`ios-frame.jsx`、`tweaks-panel.jsx`：页面与组件代码。
- `server.js`：零依赖本地静态服务器。

## 注意事项

- 首次运行需要联网加载 React、ReactDOM、Babel 和 Google Fonts CDN。
- 这个 Demo 没有后端接口，所有交互和数据都在本地静态文件中。
- 如果端口 `5173` 被占用，可以运行：

```sh
npm start -- --port=5174
```
