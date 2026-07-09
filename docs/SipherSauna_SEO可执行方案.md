# Sipher Sauna 独立站 SEO 可执行方案（修订版）

| 项 | 内容 |
|---|---|
| 站点 | https://siphersauna.com |
| 品牌 | Sipher Sauna（中国桑拿房工厂，全球 B2B + B2C） |
| 代码仓库 | `sipher_sauna_website` |
| 技术栈（实际） | Nuxt 4 + `@nuxtjs/seo` + `nuxt-llms`；产品/新闻走 CMS；**博客为本地静态数据** |
| 多语言 | en（默认）/ zh-CN / zh-TW |
| 依据文档 | 《SipherSauna_SEO实操指南》v1.0（2026-07-10） |
| 本方案版本 | **v1.2 · 2026-07-09**（决策已锁定） |
| 编制原则 | 只写可派工任务；与线上不符的原文已改写；无依据处明确标注 |
| 复核方式 | 线上 HTTP 探测 + 仓库代码对照（见文末「复核记录」） |
| 决策状态 | **D1–D6 已确认**（见 §3） |

---

## 0. 使用说明

1. **本方案是派工文档**，不是理论科普。每项都有：负责人角色、改哪些文件/页面、验收标准。
2. **先技术后内容**：没有可索引 URL，发再多文章也难被发现。
3. **英文优先**：先做 en，zh-CN / zh-TW 第二阶段翻译上线。
4. **数据未验证项**：原指南中的关键词 SV/KD **未用 Ahrefs/Semrush/GSC 复核**，本方案不采用为承诺数字，仅作选题方向。
5. **禁止照搬原指南中的**：Nuxt Content 配置、编造 AggregateRating、无货源的空壳分类页、字数硬指标当排名规则。

### 角色分工

| 角色 | 职责 |
|---|---|
| 技术 | 路由、sitemap、schema、性能、robots/Cloudflare、软 404 治理 |
| 运营/SEO | 词表、GSC、内链、排期、验收 |
| 文案 | 英文文章与落地页文案 |
| 产品/业务 | 确认品类、MOQ、认证、是否开放 AI 爬虫 |

---

## 1. 现状基线（2026-07-09 复核）

### 1.1 URL 真实状态（勿把「HTTP 200」当成「有效落地页」）

| URL | HTTP | 内容判断 | 方案处理 |
|---|---|---|---|
| `/` `/about-us` `/contact` `/products` `/news` | 200 | ✅ 有效页 | 保留并优化 |
| `/blog` | 200 | ✅ 博客列表 | 进 sitemap（T1） |
| `/blog/home-sauna-selection-guide` | 200 | ✅ 有效文章 | 进 sitemap（T1） |
| `/blog/health-benefits-of-sauna` | 200 | ✅ 有效文章（正确 slug） | 进 sitemap（T1） |
| `/blog/sauna-health-benefits` | 200 | ⚠️ **软 404**（标题 Article not found，无正文） | 改为真 404 或 301 到正确 slug（T7） |
| `/llms.txt` `/llms-full.txt` | 200 | ✅ 已部署 | 随内容更新（T9），不是「待部署」 |
| `/products/outdoor-sauna` 等分类 | **404** | 不存在 | 新建（T2） |
| `/home` | 200 | ⚠️ **软 404**：回落成首页壳，`canonical` 指向自身 | 301 → `/`（T7） |
| `/custom-sauna` `/commercial` | 200 | ⚠️ **软 404**：首页壳，无独立 H1/正文 | **新建真实页**，不是「强化现有页」（T5/B2B） |
| `/installation` `/warranty` `/faq` `/shipping` | 200 | ⚠️ **软 404**：首页壳；页脚仍链过去 | 有文案则做真页，否则删链 + 真 404/noindex（T5） |
| Privacy / Terms | — | 页脚 `href="#"` | 上线真页或暂时隐藏（T5） |

> **SEO 要点**：软 404（200 + 空壳/首页内容）比真 404 更糟，会浪费抓取并稀释质量信号。P0 级治理。

### 1.2 Sitemap 现状

- 地址：`https://siphersauna.com/sitemap.xml`（可访问）
- **15 个 URL** = `STATIC_SITEMAP_PATHS` 5 条（`/` `/about-us` `/contact` `/products` `/news`）× 3 语种
- **未包含**：`/blog`、博客文章、产品分类、单品
- **无 lastmod**
- 生成源：`server/api/__sitemap__/urls.ts` ← `shared/seo/rendering.ts`

### 1.3 内容与数据源（执行时必须分清）

| 模块 | 数据源 | 关键路径 |
|---|---|---|
| 博客 | **本地静态** `app/data/blog/{en,zh-CN,zh-TW}.ts` | `app/pages/blog/index.vue`、`app/pages/blog/[slug].vue` |
| 新闻 | CMS API（`useNews`） | `app/pages/news.vue`（目前主要是列表，未见独立文章路由） |
| 产品 | CMS API（`useProductCatalog`） | `app/pages/products.vue`（详情为 **弹窗**，无独立 URL） |
| 品类定义（参考） | `app/data/sauna-categories.ts` 已有 `outdoor-sauna` / `indoor-sauna` | 与联系页链接一致 |
| 废弃干扰 | `app/data/product-categories.ts` 仍是奶瓶等旧品类 | **不要**当桑拿分类源 |

线上 `/products` 可见：Outdoor Sauna、Indoor Sauna；Far-Infrared / Dry-Wet 等为**子分类文案**。联系页已链向 `/products/outdoor-sauna`、`/products/indoor-sauna`（目前 404）。

### 1.4 问题优先级（复核后）

| # | 问题 | 严重度 | 证据 | 任务 |
|---|---|---|---|---|
| 1 | 博客未进 sitemap | P0 | sitemap 无 blog | T1 |
| 2 | 无产品分类页；单品无独立 URL | P0 | 分类 404；详情弹窗 | T2、T3 |
| 3 | 大量软 404（`/home`、Support、B2B 路径） | P0 | 200 + 首页壳 | T5、T7 |
| 4 | AI 爬虫被 Cloudflare 屏蔽 | P1 | robots 中 GPTBot 等 Disallow | T4（D1=开放，必做） |
| 5 | Sitemap 无 lastmod | P1 | 条目无 lastmod | 随 T1 |
| 6 | 可索引内容少 / 集群未建 | P1 | 仅 2 篇有效博客 | 第 6 节排期 |
| 7 | 错误 blog slug 软 404 | P1 | `sauna-health-benefits` → Article not found | T7 |
| 8 | 首页 LCP 偏慢（实验室） | P1 | Lighthouse 移动端 LCP≈4.3s（2026-07-05） | T6 |
| 9 | `ogImage.enabled: false` | P2 | `nuxt.config.ts` | T8 附带 |

### 1.5 原指南与仓库不一致（勿照抄）

| 原指南假设 | 实际情况 | 正确做法 |
|---|---|---|
| Nuxt 3 + Nuxt Content | Nuxt 4；博客是 `app/data/blog` 静态 TS | T1 从 `getBlogData` / 导出 slug 列表写入 sitemap |
| 新闻=博客 | `/news`（CMS）与 `/blog`（静态）并存 | 决策 D2；sitemap 两套都要管 |
| 分类含 heaters / hot-tubs | 当前主类是 outdoor / indoor；红外多为子类 | 先做有货分类；红外可做筛选落地页 |
| Day 21/26 部署 llms.txt | 已存在 | 只更新链接 |
| `/custom-sauna` 可当 B2B 支柱 | 现为软 404 | 必须新建真实页面后再当支柱 |
| `/blog/sauna-health-benefits` | 软 404；正确为 `health-benefits-of-sauna` | 301 或真 404 |

---

## 2. 目标与 KPI（90 天）

| 指标 | 基线（约） | 90 天目标 | 数据来源 |
|---|---|---|---|
| Sitemap 有效 URL（en） | 5 条静态 | 静态含 `/blog` + 全部博文 + ≥2–3 分类 + 单品首批 | sitemap.xml |
| 软 404 清零 | `/home`、Support、B2B 等多条 | 上述路径不再返回首页壳 | 抓取/GSC |
| GSC「已编入索引」 | 未知（需登录） | 上升且无大量「已发现未编入/软 404」 | Search Console |
| 非品牌词展示 | 未知 | 环比提升（先求展示） | GSC |
| Organic 询盘可追踪 | 未知 | GA4 能区分 organic lead | GA4 |
| 核心页 CWV | 实验室 LCP 差 | 字段数据改善趋势 | GSC / PSI |

> 未登录 GSC/GA4 前，**不承诺具体流量或排名数字**。

---

## 3. 决策项（已锁定 · 2026-07-09）

| ID | 决策 | 最终选择 | 执行含义 |
|---|---|---|---|
| D1 | AI 爬虫 | **开放** | 执行 T4：Cloudflare 放行 + robots 允许 GPTBot / ClaudeBot / Google-Extended / PerplexityBot 等；GEO 可作为监测项 |
| D2 | `/blog` 与 `/news` | **并存** | blog=教育/选购/安装；news=公司动态。sitemap 两套都管；内链勿混用意图 |
| D3 | 主攻市场 | 待定（未拍板） | 暂按英文全球站推进；确定美/欧/澳后再微调用词与案例 |
| D4 | 第一批分类 | **outdoor + indoor** | T2 只做 `/products/outdoor-sauna`、`/products/indoor-sauna`；infrared 暂缓 |
| D5 | 价格 | **仅询盘** | 页面与 Product schema **不写具体价格**；CTA 统一询盘；可写 MOQ/OEM，不编造 `offers.price` |
| D6 | Support 四页 | **做真页** | T5 上线 `/installation` `/warranty` `/faq` `/shipping` 真实内容，消灭软 404 |

---

## 4. 技术执行清单（按顺序）

### T0 · 账号与基线（Day 1）

1. 验证 GSC（域名属性 `siphersauna.com`）。
2. 确认 GA4（配置中为 `G-TLD63MYJC7`）询盘事件；无则加 `generate_lead`。
3. 有数据后导出 GSC 查询 CSV。
4. PSI 测 `/`、`/products`、`/blog`、`/contact`（移动端）存档。
5. 列出全站 200 软 404 清单（至少含 §1.1 表）。

**验收**：GSC 可提交 sitemap；有基线截图包。

---

### T1 · Sitemap 纳入博客 + lastmod（P0，约 4h）

**数据源（已核实）**：`app/data/blog/index.ts` 的 `getBlogData(locale)` / 各语言 `slug` + `publishDate`。  
**不要**接 Nuxt Content；**不要**误接到 `useNews` CMS（那是 `/news`）。

**改文件**
- `shared/seo/rendering.ts`：`STATIC_SITEMAP_PATHS` 增加 `/blog`
- `server/api/__sitemap__/urls.ts`：为每篇文章输出三语（或实际有内容的语言）`loc` + `lastmod` + `hreflang`
- 同步评估：`/news` 若未来有独立文章 URL，再另接 CMS

**必须出现的 en URL**
- `/blog`
- `/blog/home-sauna-selection-guide`
- `/blog/health-benefits-of-sauna`
- 新文章自动加入（读 data 模块，禁止每次手写死列表长期遗忘）

**验收**
- [ ] `sitemap.xml` 含上述 URL
- [ ] 文章 `lastmod` 来自 `publishDate`（或更新字段），不是全站同一时间戳敷衍
- [ ] GSC 提交无「无法获取」

---

### T2 · 产品分类页（P0，2–3 天）

**第一批（已锁定 D4）**

| URL | 依据 | 主词方向（待工具复核） |
|---|---|---|
| `/products/outdoor-sauna` | `sauna-categories.ts` + contact 已链 | outdoor sauna |
| `/products/indoor-sauna` | 同上 | indoor sauna |
| `/products` | 已有，补分类入口与文案 | sauna rooms / wholesale |

**暂缓**：`/products/infrared-sauna`、heaters / hot-tubs / accessories —— 第二批再开。

**价格策略（D5）**：分类页不展示售价；统一「Contact for Inquiry / Get a Quote」。

**每页最低要求**
- Title / Description / 唯一 H1
- 品类说明 + **可抓取的产品链接**（指向 T3 单品 URL；T3 未上线前至少有可索引列表项，禁止只弹窗）
- Breadcrumb、CTA → `/contact`
- 进 sitemap + hreflang

**验收**：两分类 URL 200；view-source 有正文；contact 分类链可点通。

---

### T3 · 单品独立 URL（P0，3–5 天）

```text
/products/{categorySlug}/{productSlug}
# 例：/products/outdoor-sauna/outdoor-sauna-room-square-sip-sq-245
```

1. CMS 增加稳定唯一 `slug`。
2. 动态路由页；弹窗可留，但必须有可分享 URL。
3. 规格、材质、场景、MOQ/OEM、询盘、相关产品。
4. 进 sitemap。
5. Product schema：**无价格字段**（D5 仅询盘）；**无真实评价不加 AggregateRating**。

**验收**：直链可打开；GSC 网址检查可见主内容。

---

### T4 · robots / Cloudflare AI（P1，D1=开放 · 必做）

**目标**：允许主要 AI/搜索扩展爬虫抓取，支撑 GEO 监测。

线上现状：Cloudflare Managed 段对 `GPTBot`、`Google-Extended`、`ClaudeBot`、`Amazonbot`、`Applebot-Extended`、`Bytespider`、`CCBot`、`meta-externalagent` 等为 `Disallow: /`。

**操作步骤**
1. Cloudflare → Security → Bots → AI Bot 管理：将上述爬虫改为 **Allow**（或公司政策允许的 Managed Challenge，但不要 Block）。
2. 核对最终 `https://siphersauna.com/robots.txt`：AI 相关 UA 不再 Disallow。
3. 保留 nuxt-robots 对 `/api/**`、`/example/**` 的 Disallow；**不要** Disallow `/_nuxt/`。
4. 搜索引擎（Googlebot 等）保持 Allow。

**验收**
- [ ] 线上 robots 中 GPTBot / Google-Extended / ClaudeBot 等为 Allow 或不出现 Disallow
- [ ] Cloudflare 与 robots 一致
- [ ] Sitemap 声明仍在

---

### T5 · Support 真页 + 信任页（P0，D6=做真页）

**必须上线真实内容的页面（消灭软 404）**

| URL | 页面目标 | 最低内容 |
|---|---|---|
| `/installation` | 安装指南入口 | 步骤概要、电气/通风注意、链到安装类博客与 `/contact` |
| `/warranty` | 质保说明 | 质保范围、期限、如何申请、联系方式 |
| `/faq` | 常见问题 | ≥5 组真实问答；可加 FAQ schema |
| `/shipping` | 物流与退换 | 出口包装、铅期、港口/贸易条款概要、售后边界 |
| Privacy / Terms | 合规 | 去掉 `href="#"`，上线真页 |
| `/custom-sauna` `/commercial` | B2B/场景 | **新建**真落地页（当前为首页壳，不可当支柱） |

**验收**：上述 URL 有独立 Title/H1/正文；不再回落首页壳；页脚链接可点通。

---

### T6 · 性能（P1）

1. 优化首页 LCP 图（体积/尺寸；保持 preload，勿 lazy LCP）。
2. 非首屏继续懒加载。
3. 以 PSI **字段数据**为准。

**验收**：`/` 移动端 LCP 较基线改善；CLS 保持良好（实验室约 0.015）。

---

### T7 · URL 规范化（P0–P2）

| 项 | 动作 |
|---|---|
| `/home` | **301 → `/`** |
| `/blog/sauna-health-benefits` | **301 → `/blog/health-benefits-of-sauna`**，或文章不存在时返回 **真 404**（勿 200 + Article not found） |
| 未匹配路由 | 统一真 404，避免回落首页 |
| www / http | 统一主域 + HTTPS |

---

### T8 · 结构化数据（P1）

| 页面 | 类型 | 注意 |
|---|---|---|
| 全站 | Organization（已有） | 补真实 sameAs/联系方式 |
| 分类/单品 | Product / ItemList | 勿假评价、假价格 |
| 博客 | Article + BreadcrumbList | |
| 真 FAQ 页 | FAQPage | 与可见内容一致 |
| 安装长文 | HowTo（可选） | |

附带：评估开启 OG 图（当前 `ogImage.enabled: false`）。

**验收**：Rich Results Test 无严重错误。

---

### T9 · 更新 llms.txt（P1）

- 已存在，只更新**已上线 200 且非软 404**的链接。
- 改 `shared/seo/llms.ts`、`shared/seo/llms-full.ts`。
- 未建分类/B2B 真页之前，不要写入规划中的空 URL。

---

## 5. 关键词执行方法

### 5.1 本周流程

1. GSC 导出查询（有数据后）→ 分类：有展示无排名 / 有点击 / 无落地页。  
2. Google 补全 + 相关搜索（目标国无痕）。  
3. 看 SERP 前 10 页面类型，匹配产品页 vs 指南页。  
4. 询盘原话 → 英文落地词。  
5. 维护表：Keyword / Intent / 目标 URL / 优先级 / 证据 / 状态。

### 5.2 种子方向（非搜索量承诺）

- B2B：sauna manufacturer, wholesale sauna, OEM, ODM, custom sauna, hotel sauna  
- 产品：outdoor sauna, indoor sauna, infrared sauna, prefab sauna, cedar sauna  
- 信息：sauna vs steam room, installation guide, home sauna cost, infrared vs traditional  
- 差异化：source saunas from China, OEM vs ODM, certifications CE/ETL  

原指南 Title/H1 可参考；**SV/KD 数字不写入对外承诺**。

---

## 6. 内容集群与 30 天排期

### 6.1 集群

| 集群 | Pillar | 说明 |
|---|---|---|
| 选购 | `/blog/sauna-buying-guide` | 新建 |
| 安装 | `/blog/sauna-installation-guide` | 新建 |
| 产品 | `/products` + T2 分类 | 交易 |
| B2B | **先 T5 建成** `/custom-sauna` 或 `/blog/b2b-sauna-sourcing-guide` | 禁止把软 404 当 Pillar |

### 6.2 内链硬规则

每篇：→ Pillar ×1；同集群 ×2–3；分类/单品 ×1–2；CTA → `/contact`；禁止「点击这里」。

### 6.3 发布前 Checklist

- Title / 唯一 H1 / Description / 短 slug / 首段答问  
- 覆盖 SERP 子问题；≥1 个可核对来源；ALT；FAQ 与 schema 一致  
- Article schema；进 sitemap；英文先发  

（**无最低字数排名规则**；写到把问题讲清楚为止。）

### 6.4 30 天排期

#### 第 1 周 · 解锁索引 + 清软 404 + 2 篇高优先

| Day | 任务 | 验收 |
|---|---|---|
| 1 | T0 + T1（blog 进 sitemap） | sitemap 含 2 篇文章 |
| 1 | T4：开放 AI 爬虫（D1 已定） | robots/Cloudflare 已放行 |
| 1–2 | T7：`/home` 301；错误 blog slug 301/真 404 | 不再软 404 |
| 2 | 优化现有 2 篇博客 | Checklist |
| 3–4 | T2：仅 `outdoor-sauna` + `indoor-sauna` 上线 | contact 链可通 |
| 3–5 | T5：Support 四真页 + Privacy/Terms 开工/上线 | 页脚无软 404 |
| 4 | 发 `sauna-vs-steam-room` | 可索引 |
| 5–6 | 发 `source-saunas-from-china` | 可索引 |
| 5 | T4：Cloudflare AI 爬虫开放（D1） | robots 已放行 |
| 7 | T8 基础 schema；GSC 提交 | 富结果无严重报错 |

#### 第 2 周 · Pillar + Cluster

| Day | 任务 |
|---|---|
| 8 | Pillar `sauna-buying-guide` |
| 9 | `infrared-vs-traditional-sauna` |
| 10 | `sauna-oem-vs-odm` |
| 11 | Pillar `sauna-installation-guide` |
| 12 | `home-sauna-cost-guide` |
| 13 | 加热器对比文（无加热器分类则 CTA 指询盘/房型） |
| 14 | 内链巡检 + T9（只链已上线真页） |

#### 第 3 周 · 深度文 + 单品 URL

| Day | 任务 |
|---|---|
| 15–20 | 木材/电气/认证/创业等 Cluster（按产能，宁缺毋滥） |
| 19 | 分类页 SEO 打磨 |
| 21 | T3 单品 URL 首批（建议 Outdoor 5–10 个） |

#### 第 4 周 · 审计

| Day | 任务 |
|---|---|
| 22–25 | P2 长尾（有产能再发） |
| 26–27 | 全站 404/软 404/GSC 覆盖问题 |
| 28–30 | KPI 回顾；下月词表；启动 2 篇中文转化文翻译 |

### 6.5 发布优先级理由

1. 技术解锁 + 软 404 治理  
2. vs steam（信息对比好做）  
3. source from China（工厂差异化、询盘向）  
4. Buying / Installation Pillar  
5. OEM / 认证等 B2B  

---

## 7. GEO——可做与不可承诺

**可做**：可引用事实 + 来源；可见 FAQ + schema；维护 llms.txt；月度 AI 抽测；E-E-A-T（工厂/案例/认证）。  

**不承诺**：放行 GPTBot ≠ 进 AI Overview；Schema ≠ 富结果保证；无官方 GEO 因子清单可照抄。  

**前提**：D1 若选屏蔽，则 GEO 不作为正式 KPI。

---

## 8. 竞品借鉴（执行级）

| 可借鉴 | 落地 |
|---|---|
| 清晰分类导航 | T2 |
| 教育内容 Sauna 101 | Cluster 1–2 |
| 研究引用 | 强化 health 文，不编造 |
| 工厂透明度 | About + B2B 真页 |
| 单 SKU 可索引 | T3 |

竞品流量数字不采用为 KPI。

---

## 9. 快速行动清单（打印版）

| # | 任务 | 优先级 | 预估 | 依赖 |
|---|---|---|---|---|
| 1 | GSC/GA4 基线 | P0 | 1h | — |
| 2 | Sitemap + blog + lastmod | P0 | 4h | — |
| 3 | 治理软 404（`/home`、错误 slug）+ Support 四真页 | P0 | 1–3 天 | D6 已定 |
| 4 | 分类页 outdoor + indoor | P0 | 2–3 天 | D4 已定 |
| 5 | 单品独立 URL 首批（无价格，仅询盘） | P0 | 3–5 天 | CMS slug；D5 |
| 6 | 优化现有 2 篇博客 | P0 | 2h | — |
| 7 | 发 vs steam + source from China | P0 | 1–2 天 | — |
| 8 | 新建 `/custom-sauna` / `/commercial` 真页 | P0/P1 | 1–2 天 | — |
| 9 | AI robots 开放（Cloudflare + 核对 robots） | P1 | 2h | D1 已定 |
| 10 | Schema + 更新 llms.txt | P1 | 4h | 真页就绪 |
| 11 | LCP 优化 | P1 | 1–2 天 | — |
| 12 | 30 天 Cluster 按表执行 | P1 | 持续 | Pillar |

---

## 10. 验收节奏

| 周期 | 动作 |
|---|---|
| 每日（内容周） | 新 URL=真 200 内容页；已进 sitemap；非软 404 |
| 每周 | GSC 索引/查询；5 个优先词 SERP |
| 每两周 | 内链/CTA；询盘来源 |
| 每月 | 勾选第 9 节；更新词表；GEO 抽测（若 D1=A） |

---

## 11. 附录：关键文件索引

| 用途 | 路径 |
|---|---|
| SEO 总配置 | `nuxt.config.ts` |
| 多语言 / ISR / hreflang | `shared/seo/rendering.ts` |
| Sitemap | `server/api/__sitemap__/urls.ts` |
| llms | `shared/seo/llms.ts`、`shared/seo/llms-full.ts` |
| 博客数据 | `app/data/blog/index.ts`、`en.ts`、`zh-CN.ts`、`zh-TW.ts` |
| 博客页面 | `app/pages/blog/index.vue`、`app/pages/blog/[slug].vue` |
| 产品列表（弹窗） | `app/pages/products.vue` |
| 桑拿品类定义 | `app/data/sauna-categories.ts` |
| 新闻 CMS | `app/composables/useNews.ts`、`app/components/NewsPage.vue` |
| 页脚链接 | `app/components/SiteFooter.vue` |

---

## 12. 复核记录（v1.1）

| 核查项 | 结果 | 对方案的修正 |
|---|---|---|
| sitemap 是否含 blog | 否，仅 15 条静态 | 维持 T1 |
| 博客数据源 | 本地 `app/data/blog`，非 CMS、非 Nuxt Content | 重写 T1 数据源说明 |
| health 文 slug | 正确为 `health-benefits-of-sauna`；错误 slug 为 200 软 404 | 写入 T7 |
| `/custom-sauna` `/commercial` | 200 但首页壳 | 从「可强化」改为「必须新建」 |
| Support 四页 | 200 软 404 | T5 升为与软 404 治理绑定；增加 D6 |
| `/home` | 200，canonical 指向 `/home` | T7 明确 301 |
| 分类 URL | outdoor/indoor/infrared 均 404 | T2 正确 |
| 联系页分类链 | 已指向 outdoor/indoor | T2 与之对齐 |
| llms.txt | 已 200 | T9=更新非部署 |
| Cloudflare AI Disallow | 属实 | T4 正确 |
| GA4 ID | `G-TLD63MYJC7` 在配置/Lighthouse 中出现 | T0 正确 |
| 原指南 heaters 等分类 | 当前不宜作第一批 | 维持暂缓 |
| OG Image | 配置关闭 | T8 附带说明 |

**仍无法在本次核实（需账号）**：GSC 索引/查询、CrUX 字段 CWV、GA4 询盘、付费工具 SV/KD。方案中已标为未知/不承诺。

---

## 13. 修订历史

| 版本 | 日期 | 说明 |
|---|---|---|
| v1.0 | 2026-07-09 | 首版：基于原指南重写 |
| v1.1 | 2026-07-09 | 复核：纠正软 404 误判、博客数据源、B2B 页状态、T1/T5/T7/附录 |
| v1.2 | 2026-07-09 | 锁定决策：AI 开放；blog/news 并存；分类 outdoor+indoor；仅询盘；Support 做真页 |

---

**下一步**：决策已锁定。按 **T0 → T1 → T7 → T5（Support 真页）→ T2（outdoor+indoor）→ T4（开放 AI）→ T3** 开工；内容侧同步优化旧文并发布高优先博客。需要改代码时直接指定任务编号即可。
