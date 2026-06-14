# JSON Crack 深度拆解

**日期:** 2026-06-14
**方法:** WebSearch × 8 轮，覆盖 GitHub、HN、G2、VS Code Marketplace、SaasHub、技术博客

---

## 1. 基本信息

| 维度 | 数据 |
|------|------|
| 创始人 | Aykut Sarac（土耳其） |
| 公司实体 | ToDiagram（2022 年成立） |
| GitHub Stars | ~44,100 |
| Forks | ~3,600 |
| VS Code 安装量 | 728,000+ |
| 创立时间 | 2022 年 |
| 许可证 | GPL v3 / Apache 2.0 双许可 |
| 最新版本 | v5.0.0（2026 年 3 月） |

---

## 2. 技术架构

| 层 | 技术 |
|------|------|
| 框架 | Next.js 14+, React |
| 图形渲染 | Reaflow（自研 React 图布局库） |
| 代码编辑器 | Monaco Editor（VS Code 内核） |
| 状态管理 | Zustand |
| UI 组件 | Mantine |
| 语言 | TypeScript |
| 解析器 | jsonc-parser, js-yaml, fast-xml-parser, PapaParse |
| 包管理 | pnpm |
| 部署 | Vercel（推测） |

**核心架构特点：** 所有解析、可视化、转换均在浏览器中完成。`src/features/editor/views/GraphView/lib/jsonParser.ts` 遍历 AST 生成节点和边。有 `NEXT_PUBLIC_NODE_LIMIT` 环境变量限制节点数以防浏览器崩溃。

---

## 3. 商业模式（不是全免费）

### 免费层
- jsoncrack.com 核心可视化免费
- VS Code 扩展免费
- npm 包免费
- 开源仓库免费

### 付费层
- **ToDiagram** — 商业产品（G2 显示 $9/月）
- **API 访问** — 程序化 JSON 可视化接口
- **商业许可** — 嵌入式可视化去品牌费
- **Premium features** — 原在 JSON Crack 中，后迁移至 ToDiagram

### 收入模式
```
免费开源工具（JSON Crack）
    ↓ 用户量和信任
ToDiagram（商业产品，$9/月）
    ↓
API + 商业许可 + 去品牌
```

**核心洞察：** 他们用了和 SafeJSON 一模一样的商业模式——免费入口 + 高级付费。44K stars 和 728K VS Code 安装量是他们的获客漏斗顶部，ToDiagram 才是收钱的地方。

---

## 4. 增长路径解构

### 第一阶段：Show HN 引爆（2022）
- 在 Hacker News 上获得 576 points、96 comments
- 节点图可视化截图天然适合传播

### 第二阶段：GitHub 飞轮（2022-2024）
- "star 一下以后可能用"的心态
- 开源降低信任门槛
- 每次 HN/Reddit/DEV.to 提及都会带来新 stars

### 第三阶段：多平台分发（2023-2025）
- VS Code 扩展 — 728K 安装量，最大的分发渠道
- npm 包 — 可被其他工具集成
- Chrome 扩展 — 覆盖浏览器用户
- 每次 VS Code 版本更新自动推送，持续曝光

### 第四阶段：商业化承接（2025-2026）
- premium features 迁移至 ToDiagram
- API 产品化
- v5.0.0 发布

---

## 5. 关键弱点（SafeJSON 可直接攻击的空位）

### 5.1 文件大小限制
**最致命的弱点。**
> JSON Crack FAQ 明确写：免费版约支持 300KB，取决于复杂度和硬件。

SafeJSON 的 50MB+ 大文件处理是直接的反向定位。

### 5.2 大整数精度丢失
GitHub Issue #462 — int64 数据会被 JavaScript 静默截断。对于处理生产数据的开发者来说这是不可接受的。

### 5.3 "本地处理"声明有争议
虽然官网说数据在浏览器处理，但 SaasHub 用户评论提到 **"隐私担忧 — 数据在线上处理，没有提及加密"** 。这说明没有像 SafeJSON 那样做 CSP + security.txt + DevTools 可验证的组合。

### 5.4 产品定位分裂
免费工具（JSON Crack）和收费产品（ToDiagram）是两个品牌。用户看到 JSON Crack 不会想到 ToDiagram。SafeJSON 的单品牌 + 直接升级路径更清晰。

### 5.5 不是专业工具
它没有 JSON Diff、JWT 解码、JSONPath 查询、Schema 校验。它是可视化工具，不是开发者工具箱。

### 5.6 没有浏览器扩展的自动格式化
JSON Crack 的 Chrome 扩展主打可视化，不会像 SafeJSON 那样自动检测并格式化页面上的 JSON 响应。

---

## 6. SafeJSON 的真正差异化（不是 "privacy-first"）

| 维度 | JSON Crack | SafeJSON |
|------|-----------|----------|
| 核心卖点 | 图形可视化 | 隐私可验证的开发工作流 |
| 文件上限 | ~300KB | 50MB+ |
| JWT 解码 | 无 | 有（不上传） |
| JSON Diff | 无 | 有（不上传） |
| JSONPath | 无 | 有（不上传） |
| Schema 校验 | 无 | 有（不上传） |
| 浏览器扩展 | 手动可视化 | **自动检测 JSON + 一键格式化** |
| VS Code 扩展 | **728K 安装** | 无 |
| 可验证信任 | 声称本地但不给方法 | **CSP + security.txt + DevTools Network 自证** |
| 品牌一致 | JSON Crack ≠ ToDiagram | SafeJSON = SafeJSON |
| 付费路径 | 跳到 ToDiagram | 直接 Pro $5/月 |

---

## 7. 可复制的策略

### 7.1 README 作为传播资产
JSON Crack 的 README 有动画 GIF + 截图 + 清晰的 "what is this" 一句话。SafeJSON 应该补齐：DevTools Network 验证动图、大文件不卡对比图。

### 7.2 VS Code 扩展是杠杆
728K 安装量不是靠 SEO 来的——是 VS Code Marketplace 搜索 + 扩展推荐。SafeJSON 做一个 "JSON Formatter + Diff + JWT + no upload" 的 VS Code 扩展，定位和 JSON Crack 完全不同。

### 7.3 视觉传播 = 自然增长
JSON Crack 靠节点图截图就能传播。SafeJSON 的传播资产应该是：DevTools Network 面板截图（证明无上传）+ "80K credentials leaked" 数据图。

### 7.4 Open Source 不做空壳
44K stars 是真的，因为代码质量高、维护活跃、社区贡献多。SafeJSON 也需要保持 MIT 许可 + 活跃 commit + GitHub Discussions 回应。

---

## 8. 不可复制的（不要浪费精力）

- **4 年时间积累** — 你追不了
- **Reaflow 图形渲染库** — 底层技术选型，SafeJSON 不需要
- **Monaco Editor** — 为可视化服务，SafeJSON 的输入框不需要

---

## 9. 战略建议

### 攻击位
1. **/vs/jsoncrack 对比页** — "Best for visualizing JSON structure. SafeJSON: best for large-file formatting, JWT decoding, JSONPath, and privacy-verifiable workflows."
2. **在所有 VS 页和 FAQ 中强调 50MB+** — JSON Crack 的 300KB 限制是最好的反面教材
3. **DevTools 验证 vs 口头声明** — 他们是 "Trust us"，你是 "Verify it"

### 防御位
1. **保持免费核心 + Pro 专业工具** — 不要被 44K stars 吓到降价
2. **保持单品牌** — 不要学他们拆成两个产品
3. **浏览器扩展做到极致** — 这是他们不做的，你已经有 Edge 上线 + Chrome 审核中

### 长期方向
1. **VS Code 扩展** — 当你有精力时，这是最大的分发杠杆
2. **README 动画 GIF** — 短期可做的最大传播改善
3. **JSON Crack 做不到的事情做成内容** — "Why your JSON visualizer can't handle your production logs" 直接对标
