# Next.js SEO Audit Tool

这是一个专门为 Next.js App Router 架构设计的 SEO 审计工具。

## 功能

该工具检查以下 SEO 要素：

1. **Canonical Tags** - 检查规范 URL 配置
2. **Meta Tags** - 检查 title, description, keywords, Open Graph, Twitter Cards
3. **Robots.txt** - 检查 robots.txt 文件
4. **Sitemap** - 检查 sitemap.xml 文件
5. **Localhost References** - 检查代码中的 localhost 引用
6. **Schema.org** - 检查结构化数据标记
7. **OG Image** - 检查 Open Graph 图片配置
8. **Favicon** - 检查 favicon 配置和文件大小
9. **Image Optimization** - 检查是否使用 Next.js Image 组件
10. **Video Optimization** - 检查视频优化配置

## 使用方法

```bash
npm run seo-audit
```

## 当前项目状态

✅ **SEO Score: 100/100**

所有检查项都通过了！

### 已优化的项目

- ✅ 所有图片使用 Next.js Image 组件
- ✅ 视频使用 `preload="metadata"` 优化
- ✅ Favicon 已配置且文件大小合理 (0.8 KB)
- ✅ 完整的 Meta 标签配置
- ✅ Schema.org 结构化数据
- ✅ robots.txt 和 sitemap.xml 已配置

## 修复的问题

1. **VideoBackground.tsx** - 将 `<img>` 标签替换为 Next.js `Image` 组件
2. **视频预加载** - 将 `preload="auto"` 改为 `preload="metadata"` 以优化性能

## 建议

虽然当前得分为 100/100，但可以进一步优化：

1. **图片压缩** - 使用工具压缩源图片文件（见 `public/IMAGE_OPTIMIZATION_GUIDE.md`）
2. **视频压缩** - 优化视频文件大小（见 `public/IMAGE_OPTIMIZATION_GUIDE.md`）
3. **定期审计** - 在每次部署前运行 SEO 审计

## 与原始 SEO Audit 工具的区别

原始工具 (`script/seo-audit/`) 是为多站点架构设计的，使用 `components/sites` 和 `data/sites` 目录结构。

这个适配版本 (`script/seo-audit-nextjs/`) 专门为 Next.js App Router 设计：
- 检查 `app/` 目录中的文件
- 检查 `components/` 目录中的文件
- 适配 Next.js 的 Metadata API
- 检查 Next.js 特定的优化（Image 组件等）

