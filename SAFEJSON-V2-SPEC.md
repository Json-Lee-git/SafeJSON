# SafeJSON V2 — Product Requirements Document

> 基于 Google March 2026 Core Update、EEAT 专家分析、Semrush 数据、Reddit 真实用户调研和竞品分析。
> 交给 Codex 或其他 AI 编码工具执行。日期：2026-06-09。

---

## 零、Google 2026 算法环境（必读背景）

### March 2026 Core Update（社区称 "Coral"）

3 月 27 日 - 4 月 8 日，Semrush Sensor 峰值 9.5/10（历史最高波动）。

**三大打击目标：**
1. **规模 AI 内容滥用** — 无人工审核的大批量 AI 页面。损失 60-80% 流量
2. **模板化对比/列表页** — "Best X in Y"、"X vs Y" 重排 SERP 内容但不加原创数据。损失 29-49%
3. **虚假作者身份** — 合成头像、虚构名字、无法外部验证的凭证

**SafeJSON 的优势：** 80K 凭证泄露是真实第三方可验证事件。我们的对比页有独特数据源，不会被清洗。强 EEAT 信号网站平均 +36% 流量。

**SafeJSON 的风险：** 缺少 Person Schema（无 sameAs 验证）、内链骨架松散、没有支柱页。

### EEAT 执法核心变化

Google 现在交叉验证作者身份。Person Schema + sameAs 链接（LinkedIn/GitHub）是必需项。About 页面必须有真实姓名、真实照片（非 AI 生成）、可外部验证的凭证。缺失这些 = 直接降权。

### 支柱-集群模型

一个支柱页总结主题，多个集群子页深入细节。每个子页向后链接到支柱页，支柱页向前链接到每个子页。集群页之间横向互链。实施后有机流量 +20-30%。

### 内容发布节奏

Google 算法评估"主动维护"信号。稳定发布 > 一次性爆发。最少每月 2 次有意义的更新。

---

## 一、支柱页 `/compare`（P0 — 最高优先级）

### 为什么需要
16 个页面没有逻辑父节点。Google 看到的是分散的工具，不是"一个产品"。

### 页面设计
一个总览页，包含：
1. **一句话声明：** "SafeJSON is a privacy-first JSON toolkit. Every tool runs entirely in your browser. Prove it: open DevTools, zero network requests."
2. **工具分类表：**
   - Free formatting tools: Formatter, Beautifier, Viewer, Parser
   - Pro tools: Diff, JWT, JSONPath, Schema
   - Each with one-line description + link
3. **竞品对比矩阵**（markdown 表格）：SafeJSON vs jsonformatter.org vs jsonviewer.stack.hu vs Firefox Native vs VS Code
4. **"How to verify" 教程**：DevTools → Network → paste JSON → zero requests
5. **CTA：** → Pricing

### 技术实现
- `/compare` 路由
- 独立 SEO metadata："JSON Formatter Comparison 2026 — SafeJSON vs jsonformatter.org, jsonviewer, Firefox"
- Product Schema + BreadcrumbList Schema
- Footer 同全局结构

---

## 二、EEAT 基础设施（P0）

### 2.1 About 页面升级

**当前状态：** 有 /about 页面，有真实叙事。但缺 Person Schema、sameAs 链接、真实照片。

**改为：**
- Person Schema with sameAs: GitHub + LinkedIn
- Real photo (not AI-generated)
- Real name
- `knowsAbout: ["JSON", "Web Security", "Privacy", "Developer Tools"]`

### 2.2 全局 Person Schema

在根 layout.tsx 或 About 页面注入 Person Schema。sameAs 优先级：GitHub > LinkedIn。

### 2.3 博客文章作者署名

每篇博客文章显示真实作者名 + 一句话简介，非 Organization 署名。

---

## 三、Footer 结构化为支柱页映射（P0）

### 为什么
Footer 是 Google 爬每个页面都会读的站点范围信号。平铺链接 = 无结构信号。分组排列 = 告诉 Google 站点架构。

### 设计

**当前（平铺）：**
```
About | Help | Blog | Privacy | Pricing
```

**改为（分组）：**
```
Free Tools: Formatter | Beautifier | Viewer | Parser
Pro Tools: Diff | JWT | JSONPath | Schema
Compare: vs jsonformatter | vs codebeautify | vs extension
About | Help | Blog | Privacy | Pricing
```

所有页面统一使用这个 footer 结构。

---

## 四、内链审计与双向链接（P1）

### 4.1 规则

1. 每个 Pro 工具页 ←链接回→ 首页和 /compare
2. 每个 VS 页 ←链接回→ /compare
3. 对比页之间互相链接（"See also" 区域）
4. 博客页链向相关工具页
5. 无孤立页面——每个页面至少被 2 个其他页面链接

### 4.2 锚文本要求

不用 "click here" 或 "learn more"。用描述性锚文本：
- "JSON Diff Checker"
- "SafeJSON vs jsonformatter.org"
- "How to verify your JSON tool is safe"

---

## 五、博客内容策略（P1）

### 5.1 当前问题

博客只有一篇 "5 safest JSON formatters"——属于被 3 月 Core Update 重点清洗的 "Best N" 列表格式。

### 5.2 修复方案

将博客从列表式改为教程式：
**新标题：** "How to Verify Your JSON Formatter Is Safe — And What to Use Instead"
**新结构：** 问题 → 验证方法 → 工具对比（作为验证结果，不是作为推荐排名）

### 5.3 内容日历

| 频率 | 内容类型 | 示例 |
|------|---------|------|
| 每月 2 篇 | 一手经验博客 | "I built a JSON tool after a data breach—here's what I learned about client-side processing" |
| 每季度 | 竞品页面刷新 | 更新对比表中的数据 |
| 每次功能更新 | 简短发布说明 | 新功能、架构决策 |

---

## 六、定价页叙事（已有，保持）

当前定价页已包含：
- "Why pay" 区块（80K 凭证泄露 + 扩展被卖 + 服务器端风险）
- "Why developers trust SafeJSON" 三卡片
- Free vs Pro 对比表
- Lemon Squeezy 支付链接

**保持不变。** 但加一个 Product Schema（JSON-LD）。

---

## 七、首页优化（P2）

### 7.1 Hero 文案
当前："The JSON tool that never sees your data"
改为："The JSON tool that never sees your data. Prove it yourself."

副标题加："Open DevTools → Network. Zero requests. That's the whole point."

### 7.2 网络请求指示器
输出面板上方实时显示 "0 network requests" + "How to verify?" 链接。

### 7.3 "Privacy First" 卡片
标题改为 "Verify, don't trust"
描述加入："Open DevTools → Network → paste JSON. Zero requests. Every SafeJSON tool works this way."

---

## 八、持续进化机制

| 频率 | 动作 |
|------|------|
| 每月 | 重新扫描 SEO 专家社区最新分析（Search Engine Journal、Marie Haynes、Lily Ray） |
| 每季度 | 对比 SafeJSON 和竞品的 Search Console 数据 |
| 每次 Google 核心更新 | 48 小时内出影响评估 + 应对方案 |
| 持续 | 每月 2 篇博客，每季度刷新竞品页 |

---

## 九、执行优先级

| 优先级 | 任务 | 预计工时 |
|--------|------|---------|
| **P0** | **建 `/compare` 支柱页** | 1h |
| **P0** | **Footer 结构化分组** | 30min |
| **P0** | **About 页加 Person Schema + sameAs** | 30min |
| **P0** | **博客改作者署名 + 格式从列表改教程** | 30min |
| P1 | 内链双向审计 + 锚文本优化 | 1h |
| P1 | 博客内容日历 + 下一篇博客 | 1h |
| P2 | Hero 文案 + 网络请求指示器 | 1h |

---

*最后更新：2026-06-09。基于 March 2026 Core Update 专家分析。*
