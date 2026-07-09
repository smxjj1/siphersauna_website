# Sipher Sauna 独立站 SEO 可执行方案

| 项 | 内容 |
|---|---|
| 站点 | https://siphersauna.com |
| 品牌 | Sipher Sauna（中国桑拿房工厂，全球 B2B + B2C） |
| 代码仓库 | `sipher_sauna_website`；CMS：`analytics-platform` |
| 技术栈（实际） | Nuxt 4 + `@nuxtjs/seo` + `nuxt-llms`；产品/新闻/博客走 analytics CMS（博客 API 失败才回退本地） |
| 多语言 | en（默认）/ zh-CN / zh-TW |
| 依据文档 | 《SipherSauna_SEO实操指南》v1.0（2026-07-10） |
| 本方案版本 | **v1.3 · 2026-07-09** |
| 编制原则 | 只写可派工任务；与线上不符的原文已改写；SV/KD 未工具复核 |
| 决策状态 | **D1–D6 已确认** |

---

## 0. 对原指南的合理性结论

### 0.1 应保留

| 原指南内容 | 为何保留 |
|---|---|
| 先技术解锁索引，再铺内容 | 当前 CMS 文章「能看不能搜」，T1 最急 |
| Hub & Spoke 内容集群 + 内链规则 | 与 B2B+B2C 定位匹配 |
| B2B 差异化（OEM、认证、工厂透明） | 符合工厂站 |
| GEO：FAQ、可引用事实、llms 维护 | 与已部署 `nuxt-llms` 一致 |
| 竞品 Content Gap 作选题库 | 可用，不作流量承诺 |
| 文章 SEO Checklist（去字数硬指标） | Title/H1/Meta/内链/Schema |

### 0.2 应否决 / 改写

| 原指南假设 | 实际情况 | 正确做法 |
|---|---|---|
| Nuxt 3 + Nuxt Content | Nuxt 4；博客 CMS + `useBlog` | Sitemap 从 CMS API 拉 slug |
| 10 个产品分类 URL | 主类仅 outdoor / indoor | **D4**：首批只做 2 个分类页 |
| Product Schema 含价格/评分 | 仅询盘 | **D5**：禁止 offers.price / 假 AggregateRating |
| `/blog/sauna-health-benefits` | 软 404；正确为 `health-benefits-of-sauna` | 301 或真 404 |
| Day 21 部署 llms.txt | 已部署 | 只更新链接（含 blog） |
| `/custom-sauna` 可当 B2B 支柱 | 现为软 404 | 先建真页再当支柱 |
| 30 天 20+ 篇 + 6 分类 | 产能与 D4 冲突 | 按下方裁剪排期 |
| robots Disallow `/_nuxt/` | 影响资源抓取 | **不要** Disallow `/_nuxt/` |

---

## 1. 现状基线（2026-07-09 复核 + CMS 进展）

### 1.1 已完成

- [x] 博客 CMS（analytics-platform）+ 公开 API
- [x] 前台 `useBlog` 接 CMS（成功响应含空列表以 CMS 为准）
- [x] 导航 Blog + News 并存
- [x] Seed 文章已迁到 `siphersauna.com` 站点（曾误挂 oya）
- [x] `llms.txt` 基础部署
- [x] 产品 CMS 目录

### 1.2 仍阻塞 SEO

| 问题 | 严重度 | 证据 | 任务 |
|---|---|---|---|
| Sitemap 无 `/blog`、无文章 | P0 | `STATIC_SITEMAP_PATHS` 无 blog | T1 |
| 软 404（`/home`、Support、错误 blog slug） | P0 | 200 + 首页壳 / Article not found | T7、T5 |
| 无产品分类页 | P0 | `/products/outdoor-sauna` 404 | T2 |
| 单品无独立 URL | P0 | 详情弹窗 | T3 |
| AI 爬虫被 Cloudflare 挡 | P1 | robots/面板 | T4 |
| Sitemap 无 lastmod | P1 | urls handler | 随 T1 |
| 博客详情无 Article Schema | P1 | `blog/[slug].vue` | T8 |
| 首页 LCP 偏慢 | P1 | 实验室约 4.3s | T6 |

### 1.3 数据源（执行必分清）

| 模块 | 主数据源 | Fallback |
|---|---|---|
| 博客 | CMS `GET /api/public/blog?site_key=siphersauna.com&locale=` | 本地 `app/data/blog`（仅 API 失败） |
| 新闻 | CMS `useNews` | 无 |
| 产品 | CMS `useProductCatalog` | `sauna-products.json` |
| 品类定义 | `sauna-categories.ts`（outdoor / indoor） | 勿用旧 `product-categories.ts` |

---

## 2. 决策项（已锁定）

| ID | 决策 | 选择 | 执行含义 |
|---|---|---|---|
| D1 | AI 爬虫 | **开放** | T4：Cloudflare + robots 放行 GPTBot 等 |
| D2 | `/blog` 与 `/news` | **并存** | blog=教育；news=公司动态 |
| D3 | 主攻市场 | 待定 | 暂按英文全球站 |
| D4 | 第一批分类 | **outdoor + indoor** | 不做 heaters/hot-tubs 首批 |
| D5 | 价格 | **仅询盘** | Schema 不写价格/假评分 |
| D6 | Support 四页 | **做真页** | `/installation` `/warranty` `/faq` `/shipping` |

---

## 3. 技术任务（按顺序）

### T0 · 账号与基线（Day 1）

- [ ] GSC 域名属性 `siphersauna.com`
- [ ] GA4（`G-TLD63MYJC7`）询盘事件；无则加 `generate_lead`
- [ ] PSI 存档：`/` `/products` `/blog` `/contact`（移动端）
- [ ] 列出全站软 404 清单

**验收**：GSC 可提交 sitemap；有基线截图包。

---

### T1 · Sitemap 纳入博客 + lastmod（P0，约 4h）★ 最优先

**数据源**：CMS 公开 API（与 `useBlog` 一致）；失败再 fallback 本地 slug。

**改文件**
- `shared/seo/rendering.ts`：`STATIC_SITEMAP_PATHS` 增加 `/blog`
- `server/api/__sitemap__/urls.ts`：按 locale 拉 CMS blog → `/blog/{slug}` + `lastmod` + hreflang

**必须出现的 en URL**
- `/blog`
- `/blog/home-sauna-selection-guide`
- `/blog/health-benefits-of-sauna`
- 后台新发文章自动进入（禁止长期手写死列表）

**验收**
- [ ] `sitemap.xml` 含上述 URL
- [ ] 文章有 `lastmod`（来自 `publishDate`）
- [ ] GSC 提交无「无法获取」

---

### T7 · 软 404 治理（P0，与 T1 同批）

- [ ] `/home` → 301 `/`
- [ ] `/blog/sauna-health-benefits` → 301 到 `health-benefits-of-sauna`（或真 404）
- [ ] 博客文章不存在时 `setResponseStatus(404)`（勿 200 + Article not found）
- [ ] 未匹配路由勿回落首页壳

**验收**：上述路径不再返回首页壳；错误 slug 非 200 空文。

---

### T5 · Support / B2B 真页（P0，D6）

- [ ] `/installation` `/warranty` `/faq` `/shipping` 真实内容
- [ ] Privacy / Terms 真页或暂时隐藏页脚 `#`
- [ ] `/custom-sauna`、`/commercial` 新建真页（再当 B2B 支柱）

**验收**：页脚链接 200 且有独立 H1/正文。

---

### T2 · 产品分类页（P0，D4）

| URL | 主词方向（待工具复核） |
|---|---|
| `/products/outdoor-sauna` | outdoor sauna |
| `/products/indoor-sauna` | indoor sauna |
| `/products` | 补分类入口 |

- [ ] 复用/挂载 `CategoryPage`；可抓取产品列表（勿仅弹窗）
- [ ] Title / Description / H1 / Breadcrumb / CTA → `/contact`
- [ ] 进 sitemap + hreflang
- [ ] 不展示售价（D5）

**验收**：两分类 URL 200；contact 分类链可点通。

---

### T4 · 开放 AI 爬虫（P1，D1）

- [ ] Cloudflare AI Bot 放行
- [ ] robots 允许 GPTBot / ClaudeBot / Google-Extended / PerplexityBot 等
- [ ] **不要** Disallow `/_nuxt/`

**验收**：robots 与面板一致；抽测 AI 可访问公开页。

---

### T3 · 单品独立 URL（P0–P1）

```text
/products/{categorySlug}/{productSlug}
```

- [ ] Outdoor 首批 5–10 个可索引详情
- [ ] Product Schema **无价格、无假评分**（D5）
- [ ] Sitemap 扩展单品
- [ ] 分类页链到详情 URL

**验收**：单品 URL 有正文；GSC 无大量软 404。

---

### T8 · Schema 补强（P1）

- [ ] 博客 Article + Breadcrumb
- [ ] 分类/单品 Product（询盘，无 price）
- [ ] FAQ 页 FAQPage（T5 后）

---

### T9 · 更新 llms（P2）

- [ ] `/llms.txt` 纳入 `/blog` 与已上线真页
- [ ] 勿链软 404 / 未上线 URL

---

### T6 · 性能（P1，可并行）

- [ ] 首页 LCP 优化（移动端）
- [ ] 复测 PSI 对比 T0 基线

---

## 4. 内容排期（裁剪版 · 英文优先）

| 周 | 技术 | 内容 |
|---|---|---|
| W1 | T0+T1+T7+T5(Support)+T4 | 优化 2 篇旧文；发 sauna-vs-steam-room |
| W2 | T2+T5(B2B)+T8 | 发 source-saunas-from-china；Buying Pillar |
| W3 | T3 首批 + T9 | Installation Pillar + 2–3 集群文 |
| W4 | T6 + 全站审计 | P2 长尾 + GSC 回顾 |

**门槛**：至少 **T1 + T7 完成** 后再大规模发新文。

**CMS 操作注意**
- [ ] 后台站点必须选 **桑拿房 / siphersauna.com**（勿选 oya）
- [ ] 封面用「上传到服务器」
- [ ] 分类用 Sipher 选项（saunaSelection / healthWellness 等）

---

## 5. Checklist 总表（打印用）

### P0 本周

- [ ] T0 基线
- [ ] T1 Sitemap 含 blog + CMS 文章 + lastmod
- [ ] T7 `/home` 301、错误 slug、真 404
- [ ] T5 Support 四页启动
- [ ] GSC 提交 sitemap

### P0 第 1–2 周

- [ ] T2 outdoor + indoor 分类页
- [ ] T5 B2B 真页（custom-sauna / commercial）
- [ ] T4 AI 爬虫开放

### P0–P1 第 2–3 周

- [ ] T3 单品 URL 首批
- [ ] T8 Schema
- [ ] T9 llms 更新
- [ ] T6 LCP

### 内容

- [ ] 2 篇旧文 SEO 优化
- [ ] vs-steam-room / source-from-china
- [ ] Buying + Installation Pillar
- [ ] 每篇：内链规则 + Contact CTA + 媒体封面

### 禁止事项

- [ ] 不照搬 Nuxt Content / 10 分类首批
- [ ] 不写价格与假评分 Schema
- [ ] 不把软 404 当落地页发内容
- [ ] 不在 oya 站点下发 Sipher 博客
- [ ] 不用 SV/KD 估算当 KPI

---

## 6. 90 天 KPI

| 指标 | 基线（约） | 90 天目标 | 来源 |
|---|---|---|---|
| Sitemap 有效 en URL | 5 静态 | +blog 全量 +2 分类 +单品首批 | sitemap |
| 软 404 | 多条 | 清零 §1 所列路径 | 抓取/GSC |
| GSC 已编入索引 | 未知 | 上升 | GSC |
| Organic 询盘可追踪 | 未知 | GA4 可区分 | GA4 |

---

## 7. 修订历史

| 版本 | 日期 | 说明 |
|---|---|---|
| v1.0–v1.2 | 2026-07-09 | 对照原指南纠错；锁定 D1–D6 |
| v1.3 | 2026-07-09 | 博客 CMS 已接入；T1 改为拉 CMS API；补充站点错挂修复与封面规范；Checklist 重排 |
