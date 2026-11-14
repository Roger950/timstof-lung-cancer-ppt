# timsTOF 组会汇报（28页入门重构版）

当前主线为面向无质谱与蛋白研究基础听众的 **28 页入门重构版**，按真实实验先后顺序展开：
1. **基础概念与总流程（第 1–3 页）**：封面、氨基酸/肽段/蛋白质与自下而上（Bottom-up）策略、实验台到蛋白表的四阶段全流程。
2. **蛋白质样品前处理（第 4–10 页）**：样品采集与分样保存、细胞裂解与蛋白提取、BCA 蛋白定量与等量投料、尿素变性/DTT 还原/IAA 烷基化、胰蛋白酶 K/R 酶解、酸化与 C18 除盐复溶、上机前五项放行检查。
3. **样品上机与仪器工作（第 11–20 页）**：进样盘与序列表、反相液相色谱分离与保留时间（RT）、电喷雾电离（ESI）、timsTOF 内部硬件通路总览、双 TIMS 捕集与离子淌度分离（$1/K_0$）、四极杆筛选（MS1）与碰撞池碎裂（MS2）、飞行时间（TOF）质量分析与质荷比（$m/z$）、PASEF 并行累积与连续碎裂、DDA/DIA/PRM 三种采集模式、上机空白（Blank）与运行质量控制（QC）。
4. **结果解读与气道微生态应用（第 21–27 页）**：原始 `.d` 数据与 TIC/BPC/EIC 色谱图、FASTA 数据库匹配与蛋白质鉴定（Unique/Shared Peptide、Protein Group、1% FDR）、色谱峰面积提取与相对定量读表规则、组间比较（Fold Change、统计检验与缺失值、火山图与 PCA）、GO/通路功能归类与候选验证设计、痰液宿主蛋白与微生物宏蛋白组前处理对比（含 Graf 等 2021 CF 富集实验）、慢阻肺（COPD）痰液宿主蛋白组文献案例（Frey 等 2025 Fig.5A）。
5. **全流程回顾（第 28 页）**：从原始生物样品到慢阻肺气道微生态验证的六环证据链总结。

## 核心交付文件

- **28 页入门重构版（最新交付）**：
  - 可编辑 PPTX：`output/timsTOF组会汇报-入门重构版.pptx`（28 页，包含可编辑文本、表格与 10 张独立原图，每页 PPT 备注内嵌完整口语演讲稿及来源说明）。
  - 逐页 Word 演讲稿：`output/timsTOF组会演讲稿-入门重构版.docx`（28 页，一页对应一张 PPT，共 98 段、13,342 个汉字，研一学生汇报口吻）。
  - WebPPT 静态站：`web/slides.md` 与 `web/dist/`（讲者视图内嵌完整 28 页逐页演讲稿）。
- **历史 22 页版本（完整保留）**：
  - `output/timsTOF组会汇报-讲稿修订版.pptx`
  - `output/timsTOF组会汇报-交付版.pptx`
  - `output/timsTOF组会演讲稿-修订版.docx`
  - `output/timsTOF组会演讲稿.docx`

## 本地预览 WebPPT

在项目根目录运行：

```powershell
node tools/serve-web.mjs
```

打开 `http://127.0.0.1:3032/#/1` 即可浏览 28 页汇报（左右方向键翻页，`F` 键全屏；演讲者视图地址为 `http://127.0.0.1:3032/#/presenter/1`）。

## 构建与验证命令

内容源位于 `tools/build-full-web.mjs`，样式位于 `web/full-style.css`，逐页口语讲稿位于 `research/speech-full.json`。

```powershell
# 1. 生成 28 页 WebPPT 源码、备注并构建生产静态包
node tools/build-full-web.mjs
npm --prefix web run build

# 2. 启动内置临时端口并通过 Edge 自动检查 28 页溢出、图片加载、翻页与讲者视图
node tools/check-full-web.mjs

# 3. 生成并渲染 28 页 Word 逐页演讲稿
& "C:\Program Files\WindowsApps\OpenAI.CodexPrimaryRuntime.v26-1112-737-0_26.1112.737.0_x64__3k8sg7r9htsxt\dependencies\python\python.exe" tools/build-speech.py
& "C:\Program Files\WindowsApps\OpenAI.CodexPrimaryRuntime.v26-1112-737-0_26.1112.737.0_x64__3k8sg7r9htsxt\dependencies\python\python.exe" tools/render-speech.py

# 4. 导出 28 页可编辑 PPTX、修复原图比例并写入讲稿备注、执行包结构与几何验证
Set-Location web
npx slidev export --format pptx-editable --with-clicks false --executable-path "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --output "../.build/timstof-intro-editable.pptx"
Set-Location ..
& "C:\Program Files\WindowsApps\OpenAI.CodexPrimaryRuntime.v26-1112-737-0_26.1112.737.0_x64__3k8sg7r9htsxt\dependencies\python\python.exe" tools/repair-export.py
node tools/finalize-full-pptx.mjs

# 5. 使用本机 PowerPoint 渲染 28 页 PNG 预览
powershell -NoProfile -ExecutionPolicy Bypass -File tools/render-pptx.ps1 -InputFile "output/timsTOF组会汇报-入门重构版.pptx" -OutputDir "output/previews/pptx-intro"
```

## 验证与预览产物

- `output/previews/intro-web/`：28 页 WebPPT 浏览器渲染截图（`slide-01.png`–`slide-28.png`）与拼图（`contact-1.jpg`–`contact-7.jpg`）。
- `output/previews/pptx-intro/`：28 页可编辑 PPTX 经本机 PowerPoint 导出的 PNG（`幻灯片1.PNG`–`幻灯片28.PNG`）、拼图（`contact-1.jpg`–`contact-7.jpg`）与形状统计（`powerpoint-check.json`）。
- `.build/speech-intro-render/`：28 页 Word 演讲稿经本机 Word 导出的逐页 PNG（`page-1.png`–`page-28.png`）与拼图（`contact-1.jpg`–`contact-4.jpg`）。
- `.build/intro-web-validation.json`、`.build/intro-pptx-validation.json`、`.build/speech-intro-check.json`：WebPPT、PPTX 与 Word 自动化验证报告。
