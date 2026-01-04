# GitHub Pages 部署指南

本指南将帮助你将 Next.js 应用部署到 `https://karatebros.github.io`。

## 前置条件

1. 确保你的 GitHub 仓库名称是 `karatebros.github.io`（用于自定义域名）
   - 或者仓库名称是 `karatebros`，然后配置自定义域名

2. 确保你已经推送代码到 GitHub 仓库

## 部署步骤

### 方法 1: 使用 GitHub Actions（推荐）

1. **推送代码到 GitHub:**
   ```bash
   git push origin main
   ```

2. **在 GitHub 上启用 Pages:**
   - 进入仓库：https://github.com/karatebrosgame/karatebros
   - 点击 **Settings**（设置）
   - 在左侧菜单中找到 **Pages**
   - 在 **Source** 部分，选择 **GitHub Actions**
   - 保存设置

3. **触发部署:**
   - 代码推送后，GitHub Actions 会自动运行
   - 或者手动触发：进入 **Actions** 标签页，选择 "Deploy to GitHub Pages" 工作流，点击 **Run workflow**

4. **等待部署完成:**
   - 在 **Actions** 标签页查看部署进度
   - 部署成功后，网站将在几分钟内可用
   - 访问：https://karatebros.github.io

### 方法 2: 手动部署

如果自动部署不工作，可以手动部署：

1. **构建静态文件:**
   ```bash
   npm run build
   ```

2. **部署到 gh-pages 分支:**
   ```bash
   # 安装 gh-pages（如果还没有）
   npm install --save-dev gh-pages
   
   # 添加到 package.json scripts
   # "deploy": "gh-pages -d out"
   
   # 运行部署
   npm run deploy
   ```

## 配置说明

### 仓库名称配置

- **如果仓库名是 `karatebros.github.io`:**
  - `basePath` 在 `next.config.js` 中应设置为空字符串 `''`
  - 网站将直接部署到根域名

- **如果仓库名是其他名称（如 `karatebros`）:**
  - 需要设置 `basePath: '/karatebros'` 在 `next.config.js` 中
  - 或者配置自定义域名

### 自定义域名

如果你想使用自定义域名（如 `karatebros.com`）：

1. 在仓库根目录创建 `CNAME` 文件：
   ```
   karatebros.com
   ```

2. 在 DNS 提供商配置：
   - 类型：`CNAME`
   - 名称：`@` 或 `www`
   - 值：`karatebros.github.io`

## 故障排除

### 问题 1: 404 错误
- 确保 `basePath` 配置正确
- 检查 GitHub Pages 设置中的源分支
- 清除浏览器缓存

### 问题 2: 样式不加载
- 确保 `trailingSlash: true` 在 `next.config.js` 中
- 检查 `.nojekyll` 文件是否存在于 `out/` 目录

### 问题 3: 部署失败
- 检查 GitHub Actions 日志
- 确保 Node.js 版本兼容（使用 Node 20）
- 检查 `package.json` 中的依赖是否正确

## 验证部署

部署成功后，检查以下内容：

1. ✅ 网站可以访问：https://karatebros.github.io
2. ✅ 所有页面正常加载
3. ✅ 样式和图片正常显示
4. ✅ SEO metadata 正确（查看页面源代码）
5. ✅ sitemap.xml 可访问：https://karatebros.github.io/sitemap.xml
6. ✅ robots.txt 可访问：https://karatebros.github.io/robots.txt

## 更新网站

每次更新代码后：

1. 提交更改：
   ```bash
   git add .
   git commit -m "Update content"
   ```

2. 推送到 GitHub：
   ```bash
   git push origin main
   ```

3. GitHub Actions 会自动重新部署网站

## 联系支持

如果遇到问题，请检查：
- GitHub Actions 日志
- Next.js 构建日志
- GitHub Pages 设置

