# Project Progress

## 当前目标

将原有 22 页 `timsTOF` 培训汇报重构为面向零基础听众的 **28 页入门重构版**，按“基础概念与总览（第 1–3 页）→ 蛋白质前处理（第 4–10 页）→ 样品进样与仪器工作（第 11–20 页）→ 结果解读与慢阻肺气道微生态应用（第 21–27 页）→ 全流程证据链总结（第 28 页）”展开。同步交付 **WebPPT**、**可编辑 PPTX（`output/timsTOF组会汇报-入门重构版.pptx`）**、**逐页 Word 讲稿（`output/timsTOF组会演讲稿-入门重构版.docx`）** 及内嵌 PPT/Web 讲者备注，保留旧 22 页交付文件，并已上传至 GitHub 仓库及部署 GitHub Pages 在线预览。

## 已完成的事项

- **培训资料补齐与核验（13 份 PDF 全部完成物理页文本提取）**：
  - 补齐此前未提取的 `07_Data Analysis 查看蛋白组学数据.pdf`（9 页）与 `11_DIA_Spectronaut21.1介绍.pdf`（38 页）按页文本提取至 `research/extracted/`，更新 `research/source-index.json`（13 份 PDF 全部标记 `"extracted": true`）。
  - 核对 TIC / BPC / EIC（XIC）、MS1 / MS2、虚拟酶切谱图匹配、Unique / Shared Peptide、Protein Group、1% FDR（Decoy 假序列估计）、色谱峰面积相对定量、Fold Change / 统计检验 / 缺失值、GO / 通路归类与候选验证逻辑，支撑第 21–25 页零基础结果解读。
- **28 页入门重构版大纲与同源内容**：
  - 更新 `research/outline.md` 为 28 页完整大纲（保留旧 22 页备份于 `.build/outline-22.md`、`.build/full-web-content-22.json`、`.build/speech-22-revised.json`）。
  - 重写 `tools/build-full-web.mjs` 与 `web/full-style.css`：严格按用户确认的 28 页顺序编排，每页明确“输入对象 → 具体操作 → 物理/化学/生物学原因 → 本步输出”，首次出现的专业术语（Bottom-up、变性/还原/烷基化、K/R 酶切与漏切、C18 反相除盐、保留时间 RT、电喷雾 ESI、质荷比 $m/z$、离子淌度 $1/K_0$、四极杆、碰撞池、飞行时间 TOF、PASEF、DDA/DIA/PRM、TIC/BPC/EIC、FDR、Protein Group 等）均给出直观中文解释。
  - 全套 28 页共使用 10 张不重复的培训与文献原图（第 3 页 `prep-flow.png`、第 5 页 `full/lysis.png`、第 7 页 `full/reduction.png`、第 8 页 `full/trypsin.png`、第 9 页 `full/cleanup.png`、第 11 页 `lc-prep.png`、第 14 页 `ion-path.png`、第 15 页 `tims.png`、第 18 页 `pasef.png`、第 27 页 `full/e5-pca.png`）；旧 CF 差速离心富集案例（Graf et al., 2021 Fig.3A）按方案整合进第 26 页正文与讲稿，第 27 页保留慢阻肺（COPD）痰液宿主蛋白组 PCA 案例（Frey et al., 2025 Fig.5A）。
- **28 页 WebPPT 构建与 Edge 自动化验证**：
  - 运行 `node tools/build-full-web.mjs` 与 `npm --prefix web run build` 生成 `web/slides.md`、`web/dist/`、`research/full-web-content.json` 和 `research/speaker-notes.md`（网页演讲者视图同步包含完整 28 页逐页演讲稿）。
  - 更新并运行 `tools/check-full-web.mjs`：通过本机 Edge 验证全部 28 页无脚本错误、无失败请求、无图片加载失败、无标题或正文边界溢出（`overflowSlides: []`），左右键翻页、`F` 键全屏、`960×600` 缩放及讲者视图（`/#/presenter/27`）全部通过，保存截图 `output/previews/intro-web/slide-01.png`–`slide-28.png`、拼图 `contact-1.jpg`–`contact-7.jpg` 及报告 `.build/intro-web-validation.json`。
- **28 页研一汇报口吻逐页演讲稿（Word 交付与本机 Word 渲染检查）**：
  - 按用户七条长期表达偏好重写 28 页完整口语讲稿 `research/speech-full.json`（同步至 `research/speech-revised.json` 与 `research/speech-intro.json`），共 28 页、98 段、13,342 个汉字。
  - 运行 `tools/build-speech.py` 生成 `output/timsTOF组会演讲稿-入门重构版.docx`（校验记录 `.build/speech-intro-check.json`）。
  - 运行 `tools/render-speech.py` 调用本机 Word COM 与 Documents 技能 `render_docx.py` 渲染出 28 页 PNG（`.build/speech-intro-render/page-1.png`–`page-28.png` 及拼图 `contact-1.jpg`–`contact-4.jpg`），确认一页对应一张 PPT、共 28 页无跨页溢出。
- **28 页可编辑 PPTX 导出、修复、双重校验与本机 PowerPoint 渲染检查**：
  - 通过 Slidev `pptx-editable` 导出 `.build/timstof-intro-editable.pptx`。
  - 运行 `tools/repair-export.py` 清理 27 条未引用的 `slideMaster` 声明，修复 10 张原图的宽高比与居中位置，并将 28 页完整演讲稿写入 `ppt/notesSlides/notesSlide1.xml`–`notesSlide28.xml`（同时保留原讲者备注与来源说明），输出 `.build/timstof-intro-repaired.pptx`（修复记录 `.build/export-intro-repair.json`）。
  - 运行 `tools/finalize-full-pptx.mjs` 调用 Presentations 技能完成包结构完整性、版式几何与标题拟合校验（`--expected-slide-size-emu 12192000,6858000 --validate-heading-fit`，`explicitTotalSlideCount: 28`）及 Artifact Tool 重新导入验证：28 页 `finding_count: 0`、`warning_count: 0`，916 个文本脚本段全部为 `Microsoft YaHei`，正式生成 `output/timsTOF组会汇报-入门重构版.pptx`（验证收据 `.build/intro-pptx-validation.json`）。
  - 运行 `tools/render-pptx.ps1` 调用本机 PowerPoint COM 打开 `output/timsTOF组会汇报-入门重构版.pptx` 并导出 28 页高清 PNG（`output/previews/pptx-intro/幻灯片1.PNG`–`幻灯片28.PNG`、拼图 `contact-1.jpg`–`contact-7.jpg` 及对象统计 `powerpoint-check.json`），逐页完成视觉核验。
- **旧 22 页交付文件完整保留**：
  - `output/timsTOF组会汇报-交付版.pptx`、`output/timsTOF组会汇报-讲稿修订版.pptx`、`output/timsTOF组会演讲稿.docx`、`output/timsTOF组会演讲稿-修订版.docx` 均保持原状未覆盖。

## 关键决策

- **写作与表达规范**：严格遵循用户七条偏好——先说重点、直接具体；删无效套话；不预先答辩；条件说清对象、场景及影响；有依据就明确判断，真实边界紧贴相关结论；每段一个中心；篇幅服从问题，保留推理与关键细节。采用研一学生向课题组同门与导师汇报的自然口吻。
- **前处理教学主线**：以培训 10 的**尿素溶液酶解（In-solution digestion）**为统一教学主线，按“采样保存 → 裂解提取 → BCA 定量投料 → 变性/还原/烷基化与稀释 → 胰蛋白酶 K/R 酶切 → 酸化与 C18 除盐复溶 → 上机前五项放行检查”串联；SDC 酸沉淀与 SDS 的 SP3/S-Trap/FASP 路线在第 9 页对比说明，不把不同裂解体系拼成单一混合配方，不虚构未核实的体积、浓度、酶比与时长。
- **进样到仪器工作连续逻辑**：第 11–20 页沿着样品和离子的真实前进路线依次讲清：进样瓶与序列表 → 反相液相色谱按疏水性分批洗脱（保留时间 RT 与色谱峰宽）→ 电喷雾（ESI）脱溶剂产生多电荷气相正离子 → timsTOF 内部五段硬件总览 → 双 TIMS 顺风推力平衡反向电场按空间形状分离（$1/K_0$）→ 四极杆筛选母离子（MS1）与碰撞池打碎肽键（MS2）→ 飞行时间（TOF）测速换算质荷比（$m/z$）→ PASEF 并行累积与毫秒级连续跳变碎裂 → DDA / DIA / PRM 三种采集策略 → Blank 与多级 QC 质控排查。
- **结果解读与气道微生态边界**：第 21–27 页只讲基础结果表读法与课题研究应用，不讲软件界面点击步骤。明确区分：相对峰面积支持同一蛋白跨样本横向比较，不等于不同蛋白间的绝对摩尔浓度比；蛋白质丰度变化不直接等同于酶活性、活菌绝对数量或致病因果关系。
- **文献案例准确归属**：
  - 第 26 页整合 `Graf et al. (2021)`（E2，Orbitrap Elite，3 例 CF 痰液差速离心加过滤富集使细菌蛋白相对信号均值由约 8% 升至约 19%，但伴随生物量损失）。
  - 第 27 页展示 `Frey et al. (2025)`（E5 Fig.5A，Orbitrap Exploris 480 DIA，痰液上清 Auto-SP3 前处理，检索人类参考蛋白库），用于说明 COPD 气道宿主蛋白组异质性及与 16S 菌群联用的思路；不把总队列人数（38 CF / 18 COPD / 10 Healthy）套作蛋白组有效样本量（具体每组蛋白组人数待补充表 2 核验），并注明年龄与采样方式（健康人诱导痰 vs 患者自发痰）对解释的影响。

## 相关文件

- **28 页入门重构版核心交付（最新）**：
  - `output/timsTOF组会汇报-入门重构版.pptx`：28 页可编辑 PPTX（内嵌 28 页完整演讲稿与来源备注）。
  - `output/timsTOF组会演讲稿-入门重构版.docx`：28 页逐页对应 Word 口语演讲稿（13,342 汉字、98 段）。
  - `web/slides.md`、`web/dist/`、`tools/build-full-web.mjs`、`web/full-style.css`：28 页 WebPPT 源码、样式与生产静态包。
  - `research/outline.md`、`research/full-web-content.json`、`research/speaker-notes.md`、`research/speech-full.json`（及副本 `speech-intro.json`、`speech-revised.json`）：28 页同源大纲、结构化页面内容与逐页讲稿。
  - `output/previews/intro-web/`、`output/previews/pptx-intro/`、`.build/speech-intro-render/`：28 页 WebPPT、PowerPoint COM 渲染与 Word COM 渲染预览图及拼图。
  - `.build/intro-web-validation.json`、`.build/intro-pptx-validation.json`、`.build/export-intro-repair.json`、`.build/speech-intro-check.json`：28 页入门重构版各项验证报告。
- **保留的历史 22 页交付文件**：
  - `output/timsTOF组会汇报-讲稿修订版.pptx`、`output/timsTOF组会汇报-交付版.pptx`、`output/timsTOF组会演讲稿-修订版.docx`、`output/timsTOF组会演讲稿.docx`。
  - `.build/outline-22.md`、`.build/full-web-content-22.json`、`.build/speech-22-revised.json`：22 页版本内容备份。

## 未完成的待办

- [x] 按 28 页方案重写页面正文与讲稿，补中文术语解释和流程图；核对培训 07/11 及已有文献以支持结果解读。
- [x] 调整生成、备注同步、导出和检查脚本中的页数（28 页）、章节索引及输出文件名，保留旧 22 页交付。
- [x] 生成入门重构版 WebPPT、PPTX（`output/timsTOF组会汇报-入门重构版.pptx`）、Word（`output/timsTOF组会演讲稿-入门重构版.docx`），保持 28 页正文及备注一一对应。
- [x] PowerPoint 渲染并逐页检查 28 页，验证可编辑性、文字可读、无溢出；检查网页显示/翻页、Word 排版和跨格式一致性。
- [ ] 结合个人语速进行计时排练，微调各页停留节奏（当前预计 35–40 分钟）。
- [ ] 核验 E5 补充表 2 中的各组蛋白组有效人数及完整检索参数；E1 展开平台方法时取得全文。
- [ ] 与实验室确认实际课题样本组分（全痰/上清/富集）、本机型号与液相配置、现行前处理 SOP 和 QC 基线。
- [x] 发布前确定 GitHub 仓库、发布范围，上传源码与交付物并验证 GitHub Pages 公网访问（仓库：`https://github.com/Roger950/timstof-group-meeting`，在线 WebPPT：`https://roger950.github.io/timstof-group-meeting/#/1`）。

## 环境与验证

- Windows / PowerShell，当前工作目录 `E:\Gemini-project\组会`。Node v24.21.0、npm 11.19.0、Slidev 53.1.0。
- 捆绑运行时路径：`C:\Program Files\WindowsApps\OpenAI.CodexPrimaryRuntime.v26-1112-737-0_26.1112.737.0_x64__3k8sg7r9htsxt\dependencies`（Python、Node 模块与 `native\poppler\Library\bin`）；技能路径位于同级 `plugins\openai-primary-runtime\plugins\`。
- 2026-11-14 已完成 28 页 WebPPT 构建、Edge 自动化测试、Slidev 可编辑 PPTX 导出与修复、Presentations 技能完整性与几何校验、PowerPoint COM 28 页 PNG 渲染、Word 28 页生成与 Word COM + Poppler 28 页 PNG 渲染，并完成全部页面视觉检查。
