# 三页技术验证记录

日期：2026-11-12。范围：原理、操作、前处理各1页，总计3页，不含封面。

## 结果

| 项目 | 结果与证据 |
|---|---|
| Slidev版本 | 53.1.0；本地npm安装完成，版本锁文件已保存 |
| 网页构建 | `npm run build` 成功，静态产物 `web/dist/` |
| 浏览器显示 | Edge无头模式，1280×720逐页截图检查；960×600缩放检查；图片加载正常，无页面脚本错误，无文本框溢出 |
| 导航 | ArrowRight从第1页进入第2页，检查通过 |
| 可编辑直接导出 | Slidev `--format pptx-editable --with-clicks false` 成功，无整页回退信息 |
| 对象检查 | Slidev直接导出和Artifact Tool交付均为3页；原生文本框分别12、20、25个；图片分别1、0、0个 |
| 交付PPTX | `output/timstof-samples.pptx`；Artifact Tool结构、尺寸、字体与重新导入检查通过，零finding |
| PowerPoint实测 | 本机PowerPoint以只读、无窗口方式打开两份PPTX并逐页导出PNG；六页分别视觉检查，无截断/重叠/缺图 |
| 字体 | Microsoft YaHei本机已安装；导出文件声明该字体，未嵌入字体 |
| 内容对应 | 两种格式由同一脚本内容生成。第一页面的换行位置略不同，内容及来源一致 |

## 实现选择

继续采用Slidev作为WebPPT主线。当前简洁布局已实测支持可编辑直接导出，可作为正式稿的优先路线；复杂元素或更密集布局仍需逐页复测。另已用技能规定的Artifact Tool建立独立可编辑PPTX生成及检查路线，当前交付为该已最终验证文件。尚未使用PptxGenJS，无需现在引入第三条生成路线。

Slidev导出能力及图片回退边界参考其[官方导出文档](https://sli.dev/guide/exporting)。实测结果优先于文档承诺。原始TIMS结构图保留为位图，新增标题、正文和前处理步骤均为原生可编辑文本。

## 复核文件

- `.build/pptx-validation.json`：最终文件结构、几何、字体及导入报告。
- `.build/web-validation.json`：浏览器错误、图片、文本溢出与导航结果。
- `.build/slidev-object-check.json`：Slidev原生对象统计。
- `output/previews/web-1.png`至`web-3.png`及`web-small.png`：浏览器截图。
- `output/powerpoint-preview/`：交付PPTX的PowerPoint渲染。
- `.build/slidev-powerpoint-preview/`：Slidev直接导出的PowerPoint渲染。

## 已解决的环境问题与仍有限制

- npm首次安装因ECONNRESET失败，降低并发并重试后成功。
- 沙盒限制Edge启动、PowerPoint COM及最终硬链接；获准在本地环境重试后完成验证。
- Artifact Tool脚本最终输出成功报告及文件，但进程曾返回退出码1；不能仅凭退出码认定无文件。已独立确认最终文件哈希、验证报告、PowerPoint可打开并渲染。正式批处理需继续调查运行时退出行为。
- 浏览器和PowerPoint字体度量及换行可能不同，不能承诺像素完全一致。
- 本轮未发布GitHub Pages，未验证公网访问或实际仓库子路径。未制作完整20页。
