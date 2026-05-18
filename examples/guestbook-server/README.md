# 留言 API（Render + GitHub 持久化）

流程：**用户提交留言 → Render 接口 → GitHub Contents API → 追加写入仓库 `data/messages.json`**

## Render 环境变量

在 [Render Dashboard](https://dashboard.render.com) → 你的 Web Service → **Environment** 添加：

| 变量 | 说明 |
|------|------|
| `GITHUB_TOKEN` | GitHub PAT（classic），勾选 **repo** |
| `GITHUB_REPO` | `youngyang1113/my-portfolio` |
| `GITHUB_BRANCH` | `master` |
| `GITHUB_MESSAGES_PATH` | `data/messages.json` |

创建 Token：**GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token**，勾选 `repo`。

部署后访问 `https://你的服务.onrender.com/api/health`，应返回 `"storage": "github"`。

## 本地开发

```bash
cd examples/guestbook-server
cp .env.example .env
# 编辑 .env 填入 GITHUB_TOKEN
npm install
npm run dev
```

未设置 `GITHUB_TOKEN` 时自动使用 `data/comments.json` 本地文件（仅测试用）。

## API

- `GET /api/comments` — 留言列表（最新在前）
- `POST /api/comments` — body: `{ "name": "昵称", "message": "内容" }`
- `GET /api/health` — 健康检查
