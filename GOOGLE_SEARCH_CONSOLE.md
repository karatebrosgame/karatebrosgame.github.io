# Google Search Console 配置指南

本指南将帮助你在 GitHub Pages 部署的网站上配置 Google Search Console (GSC)。

## 前提条件

- 网站已部署到 GitHub Pages：`https://karatebrosgame.github.io`
- 拥有 Google 账号

## 配置步骤

### 1. 添加网站到 Google Search Console

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 点击"添加资源"（Add Property）
3. 选择"网址前缀"（URL prefix）
4. 输入你的网站 URL：`https://karatebrosgame.github.io`
5. 点击"继续"

### 2. 选择验证方法

Google Search Console 提供多种验证方法，对于 GitHub Pages，推荐使用 **Google Analytics** 方法（如果你需要添加 GA 分析）：

#### 方法 1：Google Analytics（推荐，如果你需要 GA）

如果你需要 Google Analytics 来分析网站流量，可以使用此方法同时完成验证：

1. **创建 Google Analytics 账号**（如果还没有）：
   - 访问 [Google Analytics](https://analytics.google.com/)
   - 创建账号和媒体资源
   - 获取测量 ID（格式：`G-XXXXXXXXXX`）

2. **配置 Google Analytics**：
   - 在项目根目录创建 `.env.local` 文件（如果不存在）
   - 添加以下内容：
     ```env
     NEXT_PUBLIC_GA_ID=G-ZX2YGFMKBK
     ```
     将 `G-ZX2YGFMKBK` 替换为你的 Google Analytics 测量 ID

3. **在 GitHub Secrets 中添加**（用于生产部署）：
   - 进入 GitHub 仓库 → Settings → Secrets and variables → Actions
   - 点击 "New repository secret"
   - Name: `NEXT_PUBLIC_GA_ID`
   - Value: 你的 GA 测量 ID（例如：`G-XXXXXXXXXX`）
   - 点击 "Add secret"

4. **提交并推送代码**：
   ```bash
   git add .
   git commit -m "Add Google Analytics"
   git push origin main
   ```

5. **等待部署完成**（通常需要几分钟）

6. **在 Google Search Console 中验证**：
   - 返回 Google Search Console 验证页面
   - 选择 "Google Analytics" 方法
   - 确保你的首页包含 `analytics.js` 或 `gtag.js` 代码段（已自动添加）
   - 确保跟踪代码位于 `<head>` 部分（已自动配置）
   - 确保你拥有 Google Analytics 媒体资源的"修改"权限
   - 点击"验证"按钮

**注意**：Google Analytics 跟踪代码仅用于验证网站所有权，不会访问任何 Google Analytics 数据。

#### 方法 2：HTML 标记

1. 在验证页面，选择"HTML 标记"（HTML tag）
2. 复制显示的 `content` 值（例如：`g1627dm1ru5l02m4ash3owu-Fp`）
3. 在项目根目录创建 `.env.local` 文件（如果不存在）
4. 添加以下内容：
   ```env
   GOOGLE_SITE_VERIFICATION=g1627dm1ru5l02m4ash3owu-Fp
   ```
   将 `g1627dm1ru5l02m4ash3owu-Fp` 替换为你从 Google Search Console 复制的验证码

5. 提交并推送代码：
   ```bash
   git add .env.local
   git commit -m "Add Google Search Console verification"
   git push origin main
   ```

6. 等待 GitHub Actions 部署完成（通常需要几分钟）

7. 返回 Google Search Console，点击"验证"按钮

#### 方法 2：DNS TXT 记录（如果使用自定义域名）

如果你使用自定义域名（如 `karatebros.com`），可以使用 DNS 验证：

1. 在验证页面，选择"域名提供商"（Domain name provider）
2. 复制显示的 TXT 记录值
3. 在你的域名 DNS 提供商（如 GoDaddy、Namecheap）添加 TXT 记录：
   - 记录类型：`TXT`
   - 名称：`@` 或 `karatebrosgame.github.io`
   - 值：从 Google Search Console 复制的值
4. 等待 DNS 传播（可能需要几小时到 24 小时）
5. 返回 Google Search Console，点击"验证"按钮

### 3. 验证成功

验证成功后，你将能够：
- 查看网站的搜索性能数据
- 提交 sitemap
- 监控索引状态
- 查看核心网页指标

## 提交 Sitemap

验证成功后，建议提交 sitemap：

1. 在 Google Search Console 中，进入"站点地图"（Sitemaps）
2. 输入：`https://karatebrosgame.github.io/sitemap.xml`
3. 点击"提交"

## 环境变量配置

### 本地开发

在项目根目录创建 `.env.local` 文件：
```env
GOOGLE_SITE_VERIFICATION=your-verification-code-here
```

### GitHub Actions 部署

由于 `.env.local` 不会被提交到 Git，你需要在 GitHub 仓库设置中添加环境变量：

1. 进入 GitHub 仓库
2. 点击 "Settings" → "Secrets and variables" → "Actions"
3. 点击 "New repository secret"
4. 添加：
   - Name: `GOOGLE_SITE_VERIFICATION`
   - Value: 你的验证码
5. 更新 `.github/workflows/deploy.yml`，在构建步骤中添加环境变量

或者，直接在代码中硬编码（不推荐，但简单）：
```typescript
google: 'g1627dm1ru5l02m4ash3owu-Fp', // 替换为你的验证码
```

## 故障排除

### 验证失败

1. **检查 meta tag 是否正确添加**
   - 访问 `https://karatebrosgame.github.io`
   - 查看页面源代码（右键 → 查看源代码）
   - 搜索 `google-site-verification`
   - 确认 meta tag 存在且内容正确

2. **等待部署完成**
   - GitHub Actions 部署可能需要几分钟
   - 检查 Actions 标签页确认部署成功

3. **清除缓存**
   - 在 Google Search Console 中，等待几分钟后重试验证
   - 或使用无痕模式访问网站

4. **检查 URL**
   - 确保网站 URL 与 Google Search Console 中的 URL 完全匹配
   - 包括 `https://` 协议

## 相关文件

- `app/layout.tsx` - 包含验证 meta tag 配置
- `.env.local` - 本地环境变量（不提交到 Git）
- `.github/workflows/deploy.yml` - GitHub Actions 部署配置

## 更多信息

- [Google Search Console 帮助](https://support.google.com/webmasters)
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

