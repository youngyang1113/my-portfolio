# 留言板部署说明（GitHub Pages + Giscus）

本站联系页（`/contact`）使用 [Giscus](https://giscus.app/zh-CN) 实现**公开留言、按时间排序、提交后自动刷新**，适合纯静态部署，无需自建后端。

> **说明**：Giscus 要求访客使用 **GitHub 账号** 登录后留言，名字显示为 GitHub 昵称。若需要「无需登录、仅填昵称」的匿名留言，请使用文末「自建后端示例」或 Supabase 等 BaaS。

---

## 一、在 GitHub 仓库开启 Discussions

1. 打开你的作品集仓库 → **Settings** → **General**
2. 勾选 **Discussions** → Save

---

## 二、在 giscus.app 生成配置

1. 访问 https://giscus.app/zh-CN  
2. **Repository**：选择 `youngyang1113/my-portfolio-main`（或你的仓库）  
3. 按提示 **安装 giscus GitHub App** 并授权该仓库  
4. **Discussion category**：建议 `Announcements` 或新建「Guestbook」分类  
5. **Page ↔ Discussions mapping**：选 `pathname`（每个页面独立讨论串；联系页固定为 `/contact`）  
6. **Discussion category** → **仅创建特定分类下的讨论**  
7. **主题**：`dark`（与站点一致）  
8. **语言**：`zh-CN`  
9. 复制页面上的 **仓库 ID**、**分类 ID**，以及 `data-repo` 字符串

---

## 三、配置本项目的 React 页面

1. 复制根目录 `.env.example` 为 `.env`：

   ```bash
   cp .env.example .env
   ```

2. 填入 giscus.app 生成的值，例如：

   ```env
   VITE_GISCUS_REPO=youngyang1113/my-portfolio-main
   VITE_GISCUS_REPO_ID=R_kgDOxxxx
   VITE_GISCUS_CATEGORY=Announcements
   VITE_GISCUS_CATEGORY_ID=DIC_kwDOxxxx
   VITE_GISCUS_MAPPING=pathname
   VITE_GISCUS_LANG=zh-CN
   VITE_GISCUS_THEME=dark
   VITE_GISCUS_INPUT_POSITION=top
   ```

3. 本地验证：

   ```bash
   npm install
   npm run dev
   ```

   打开 http://localhost:3000/contact ，应能看到 Giscus 评论框与历史留言。

---

## 四、GitHub Actions 部署（生产环境）

Vite 在**构建时**把 `VITE_*` 写入静态文件，需在仓库配置 Secrets：

1. 仓库 → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**  
2. 添加与 `.env` 相同的变量名（至少）：
   - `VITE_GISCUS_REPO`
   - `VITE_GISCUS_REPO_ID`
   - `VITE_GISCUS_CATEGORY`
   - `VITE_GISCUS_CATEGORY_ID`

3. 工作流 `.github/workflows/deploy-github-pages.yml` 已在 `build` 步骤注入这些环境变量；推送 `main` 后自动部署。

4. 站点 → **Settings** → **Pages** → Source 选 **GitHub Actions**

部署后访问：`https://<用户名>.github.io/<仓库名>/contact`

---

## 五、纯 HTML 版本（不经过 React）

文件：`public/guestbook.html`

- 构建后会出现在 `dist/guestbook.html`  
- 访问：`https://<用户名>.github.io/<仓库名>/guestbook.html`  
- 按文件内注释替换 `REPLACE_*` 后可直接用于任意静态托管

---

## 六、Utterances 备选方案

若更习惯用 **GitHub Issues** 存评论：

```html
<script src="https://utteranc.es/client.js"
  repo="OWNER/REPO"
  issue-term="pathname"
  theme="github-dark"
  crossorigin="anonymous"
  async>
</script>
```

将脚本放在 `#giscus-root` 同级容器即可。详见 `public/guestbook.html` 底部注释。

---

## 七、自建 Node.js 后端（可选）

若需要「昵称 + 内容」、无需 GitHub 登录，见：

```
examples/guestbook-server/
```

需单独部署到 Render / Railway / VPS 等（**不能**只放在 GitHub Pages）。前端通过 `fetch` 调用 API，JSON 文件或数据库持久化。

---

## 功能对照

| 需求 | Giscus（推荐） |
|------|----------------|
| 静态站 / GitHub Pages | ✅ |
| 公开显示留言 | ✅ |
| 最新在上 | ✅（讨论默认排序） |
| 提交后即时刷新 | ✅（无需手动 F5） |
| 仅填昵称、免登录 | ❌（需 GitHub 登录） |

---

## 路由说明

- 联系页留言板：`/contact`  
- 旧路径 `/message` 会自动跳转到 `/contact`
