# SafeJSON — 战略纪要

## 核心定位
SafeJSON = 可验证的隐私 JSON 工具箱。不是"trust us"，是"prove it yourself via DevTools Network tab"。竞品无法复制因为广告模式锁死了他们的服务器架构。

## 产品现状
- 16 个页面全部上线 (safejson.dev)
- Chrome/Edge 扩展已完成
- Lemon Squeezy 支付已接入 ($5/月, $39/年)
- GitHub: github.com/s01071233604-tech/safejson
- npm: @safjson/safejson-formatter
- GA: G-QTRHE1MP9Y
- Google Search Console: 已验证

## 获客渠道状态
- SEO: 16 页 + sitemap + robots.txt + 每页独立 meta，等 Google 收录 (2-4周沙盒期)
- GEO: llms.txt + FAQ/SoftwareApp/Organization Schema + 3 对比页 + 博客 + dev.to 文章
- Reddit: 账号被 r/webdev 永久封禁。教训：评论必须短(≤4句)、口语化、带瑕疵、不结构化。两周后重新在 r/SideProject 开始
- Product Hunt: 草稿就绪，待发布
- Edge Add-ons: 已提交，审核中

## 竞品格局
- 最大竞品不是其他网页工具，是 VS Code 内置和 Firefox 原生 JSON viewer
- Reddit 评论区验证的真需求：大文件处理(VS Code 卡 10MB+)
- jsonformatter.org: 340万月访问，广告模式，泄露8万凭证，无法转客户端
- jsonviewer.stack.hu: Reddit 推荐度高，极简，无隐私保护

## 定价叙事
不是"我们便宜"，是"免费工具泄露了8万凭证。你的数据不该离开你的电脑。你自己验证。"

## 当前阻塞
1. Reddit 运营暂停——需等账号恢复/重新养号
2. Google 收录太新——沙盒期正常，1-2周后看
3. Vercel 子域名中国无法访问——需买自定义域名解决
4. Chrome Web Store 上架需要 $5 注册费

## Codex 工作流
- Codex 负责代码实现，我负责策略和审核
- Codex 改完必须 `npm run build` 通过 + `npx vercel --prod --yes` 部署
- 最新需求文档: SAFEJSON-V2-SPEC.md

## 当前进度 (2026-06-09)
### 已完成
- 域名迁移 safejson.vercel.app → safejson.dev
- March 2026 Core Update 深度研究 (Google 3月核心更新 = 社区称 Coral)
- SPEC V2 重写: 支柱-集群架构, EEAT Person Schema, Footer 结构化
- Footer 结构化分组 (Free Tools / Pro Tools / Compare / Pages)
- /compare 支柱页 (FAQPage+HowTo+Breadcrumb Schema)
- Codex 并行执行: NetworkRequestIndicator, LocalProcessingNote, Web Workers, 子页面Footer, BingSiteAuth, 多处 Schema

### 关键发现
- "Coral Update" 是社区外号，正式名为 March 2026 Core Update (3/27-4/8)
- 真正打击的是: 规模AI内容(60-80%流量损失), 无差异化对比页(29-49%), 虚假作者身份
- SafeJSON 优势: 80K凭证泄露=真实第三方可验证事件, 对比页不会被清洗
- 强 EEAT 信号网站 平均+36%流量
- Footer 是站点范围SEO信号, 需要结构化分组(不是平铺)
- Google 交叉验证作者身份: Person Schema + sameAs (LinkedIn/GitHub) 必需
- About 页面必须有真实姓名+照片(非AI生成)+可外部验证凭证

### 下一个会话继续 (2026-06-10 session ended)
- ✅ 博客 2 篇：safest-json-formatter + is-it-safe-to-paste-json-online
- ✅ www 重定向消除
- ✅ GA 追踪恢复
- ✅ SoftwareApp Schema 错误消除
- ✅ 隐私关键词注入 /diff, /jwt, /json-validator
- ✅ 新建 /vs/jsonlint, /vs/jwt-io
- 待做：发 dev.to 文章 2 篇, Product Hunt 发帖, 提交 AlternativeTo/SaaSHub 外链
