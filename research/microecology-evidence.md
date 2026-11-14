# 慢阻肺微生态与痰液前处理证据

核验日期：2026-11-13。用于22页大纲，不替代SOP。只把实际读到的摘要、图注或方法段落记为已核验，全文受限的论文保留限制。

## E1：COPD多组学背景，平台未确定

Yan Z et al. Multi-omics analyses of airway host–microbe interactions in chronic obstructive pulmonary disease identify potential therapeutic interventions. Nature Microbiology 7, 1361–1375 (2022).

- [论文](https://www.nature.com/articles/s41564-022-01196-8)，[PubMed](https://pubmed.ncbi.nlm.nih.gov/35995842/)。
- 核验摘要及Extended Data Fig.1图注：99例COPD和36名健康人，诱导痰多组学，各层人数不同，蛋白组图注为n=59。不能写成135人均完成蛋白组。
- 全文方法受订阅限制，未核验蛋白检测平台，仅用于多组学背景，不作质谱或timsTOF实证。图未下载和视觉核验。

## E2：CF痰液微生物蛋白方法

Graf AC et al. An Innovative Protocol for Metaproteomic Analyses of Microbial Pathogens in Cystic Fibrosis Sputum. Front Cell Infect Microbiol 11:724569 (2021).

- [开放全文](https://www.frontiersin.org/journals/cellular-and-infection-microbiology/articles/10.3389/fcimb.2021.724569/full)。已阅读Experimental Procedures及相关Results/Discussion。
- 21份样本用于建方法，3份作详细概念验证，仪器为Orbitrap Elite。
- 依据：黏稠痰液与宿主背景影响检测，富集改变最终组分。DTT加入顺序需考虑DNase及代谢组兼容性。
- 本轮核验并下载Fig.3（A：NSAF相对信号，B：蛋白组数量），原图已目视检查；第19页采用A面板，保留断轴，图注重述Control/Enriched图例。来源与CC BY许可记录见figures/e2/source.md。Fig.1/2仍为未采用候选。
- CF结果仅作COPD方法迁移参考，不直接套参数，也不把蛋白检出写成酶活或活菌量。

## E3：COPD痰液靶向黏蛋白测量

Sun W et al. Development and qualification of an LC-MS/MS method for quantification of MUC5AC and MUC5B mucins in spontaneous sputum. 2025. DOI: 10.1080/17576180.2025.2457844。

- [期刊全文](https://www.tandfonline.com/doi/full/10.1080/17576180.2025.2457844)，[PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11853556/)。
- 核验搜索索引返回的方法2.8及采样处理评估段落，直接PMC访问遇验证页。仪器为SCIEX 6500+三重四极杆。
- 5例COPD配对样本比较采样、冻存及PBS/DTT组分，支持记录处理与归一化口径。不能外推为全蛋白组结论。
- Fig.2为候选，尚未视觉核验，不采用其整套参数或具体效应值。

## E4：DTT影响具有检测方法依赖性

Pedersen F et al. Multi-analyte profiling of inflammatory mediators in COPD sputum—the effects of processing. DOI: 10.1016/j.cyto.2014.10.008。

- [PubMed摘要](https://pubmed.ncbi.nlm.nih.gov/25464927/)。
- 20例稳定期COPD痰液，DTT/PBS平行处理，Luminex xMAP检测，部分指标测得浓度发生变化。
- 仅提醒处理影响可能依赖检测对象与平台，不能证明DTT对LC–MS全部蛋白有同样效果。

## E5：优先的宿主反应与微生态案例

Frey DL et al. SputOMICs identifies common and distinct markers in cystic fibrosis and chronic obstructive pulmonary disease. Scientific Reports 15:44418 (2025). DOI: 10.1038/s41598-025-32565-y。

- [论文](https://www.nature.com/articles/s41598-025-32565-y)，[PDF](https://www.nature.com/articles/s41598-025-32565-y.pdf)。
- 本轮通过[PMC正式发表全文](https://pmc.ncbi.nlm.nih.gov/articles/PMC12738762/)直接核验研究人群、质谱方法、蛋白组结果、Fig.5图注和许可；Nature入口仍重定向。补充材料尚未核验，不将主文阅读记为全部材料审核。
- 概念验证队列38例CF、18例COPD、10名健康对照。患者自发痰、健康人诱导痰，处理后分组分，联测16S、炎症和蛋白组。
- 蛋白制备采用Auto-SP3，质谱为Orbitrap Exploris 480 DIA，不能写成timsTOF结果。
- 主文方法明确使用人类UniProt reviewed canonical参考蛋白组，故这是宿主蛋白组案例，不是微生物宏蛋白质组。完整检索参数仍待补充材料核验。
- Fig.5A显示COPD蛋白组分布较分散，部分与健康或CF样本接近；只描述探索性异质性，不推断诊断性能或微生物因果。
- 已下载并目视检查Fig.5全图：`figures/e5/fig5.jpg`。A为PCA，B为蛋白簇平均z-score热图，图例区分疾病与样本聚类。第20页优先放A，保留图例与坐标；暂未裁切或排入Web。
- 主文说明蛋白组仅检测余量充足的子集；MOFA蛋白层为30人，不将总队列66人写成蛋白组人数。各疾病组蛋白组有效人数仍需Supplementary Table 2确认。
- 文章为CC BY 4.0；Fig.5图注未见单独排除声明。使用时标注Frey et al., Sci Rep (2025), Fig.5A、DOI、[许可](https://creativecommons.org/licenses/by/4.0/)，并注明裁切/中文标注。主文及图像核验完成，不代表案例排版完成。

## 本项目的推论与限制

- timsTOF承担肽段检测与蛋白组比较的设想来自培训03/04/05的采集原理，以上论文不证明本机在COPD痰液中的实际性能。
- 16S/宏基因组、宿主蛋白、微生物蛋白回答不同问题。蛋白相对信号不能单独证明酶活、活菌数、绝对菌量或因果。
- 分样、液化、富集及裂解需先做配对预实验，保留起始样本量、处理记录、过程空白和重复，待本地SOP确认后再定参数。
- 稳定期—急性加重—恢复期只是研究设计示例，尚未确定队列或样本量。

## 正式制作前的检查

- [x] 核验E5主文质谱方法、宿主数据库、Fig.5结果和CC BY 4.0许可；已目视检查下载原图。
- [ ] E5补充材料：确认各疾病组蛋白组有效人数及完整检索设置；主文MOFA的30人不能替代各面板人数。
- [x] E2 Fig.3原图和A面板裁切已核验并用于第19页；E5第20页保留A面板图例与坐标，来源与裁切已记录。
- [x] 第20页已排入Fig.5A的COPD蛋白组异质性结果及边界，完整Web稿待用户审核。
- [ ] E1若要讲具体蛋白测量方法，须先取得方法正文，否则保留为背景。
- [ ] 确认实际样本、宿主/微生物目标与本地前处理条件。

检索入口：论文完整标题、sputum proteomics DTT processing COPD、metaproteomic microbial enrichment CF sputum。访问失败和仅索引可见状态逐条保留，没有把搜索命中记成全文审核通过。
