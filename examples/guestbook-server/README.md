# 留言 API（Render + GitHub 持久化）

**用户提交留言 → Render 接口 → GitHub Contents API → 追加写入仓库 `data/messages.json`**

## Render 环境变量

Dashboard → Web Service → **Environment**：

| 变量 | 值 |
|------|-----|
| `GITHUB_TOKEN` | PAT (classic)，勾选 **repo** |
| `GITHUB_REPO` | `youngyang1113/my-portfolio` |
| `GITHUB_BRANCH` | `master` |
| `GITHUB_MESSAGES_PATH` | `data/messages.json` |

Token：**GitHub → Settings → Developer settings → Personal access tokens → Generate (classic)**。

部署后访问 `https://你的服务.onrender.com/api/health`，应返回 `"storage": "github"`。

## 本地

```bash
cd examples/guestbook-server
cp .env.example .env
npm install
npm run dev
```

未配置 `GITHUB_TOKEN` 时使用本地 `data/comments.json`（仅测试）。

## API

- `GET /api/comments` — 留言列表
- `POST /api/comments` — `{ "name", "message" }`
- `GET /api/health` — 健康检查
