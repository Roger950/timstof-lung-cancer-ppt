import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
throw new Error('旧版双格式样例脚本已停用。当前仅运行 tools/build-web-samples.mjs；每一步须用户审核，完整WebPPT完成前不生成新版PPTX。');
const root=process.cwd();
const runtime='C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1111-570-0_26.1111.570.0_x64__3k8sg7r9htsxt/dependencies';
process.env.RUNTIME_NODE_MODULES=runtime+'/node/node_modules';
const skill='C:/Users/Roger/.codex/plugins/cache/openai-primary-runtime/presentations/26.1111.10930/skills/presentations';
const {Presentation,PresentationFile}=await import(pathToFileURL(runtime+'/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs'));
const {finalizePresentation}=await import(pathToFileURL(skill+'/container_tools/artifact_tool_utils.mjs'));
const p=Presentation.create({slideSize:{width:1280,height:720}});
const font='Microsoft YaHei';
const blue='#006E83',ink='#142C3A',gray='#536571';
const pages=[];
let elems=[];
const t=(text,x,y,w,h,size=26,bold=false,color=ink)=>elems.push({type:'text',text,x,y,w,h,size,bold,color});
const title=(text,subtitle)=>{t(text,64,48,1152,66,44,true);t(subtitle,64,120,1152,44,24,false,gray);};
const save=(source,notes)=>{t(source,64,670,1100,28,16,false,gray);t(String(pages.length+1).padStart(2,'0'),1170,670,50,28,17,false,blue);pages.push({elements:elems,notes});elems=[];};

title('TIMS、PASEF 与 TOF 的分工','淌度分离、前体选择与质量分析协同完成采集');
t('TIMS',64,204,430,38,29,true,blue);
t('气流与电场共同捕集离子。\n扫描电场后，离子按淌度依次释放。',64,252,470,84,25);
t('PASEF',64,362,430,38,29,true,blue);
t('累积与分离并行。四极杆同步选择，\n在一次 ramp 中连续获取多个 MS/MS。',64,410,490,84,25);
t('TOF',64,520,430,38,29,true,blue);
t('将离子飞行时间转换为 m/z，\n测量前体或碎片离子谱。',64,568,470,78,25);
elems.push({type:'image',file:'research/figures/tims-crop.png',x:560,y:222,w:656,h:300});
t('双 TIMS：前段累积，后段分离',574,548,630,44,26,true);
t('原图中的 100 ms 为示例条件',574,600,630,34,21,false,gray);
save('来源：01 p12、14、16–18；03 p2–3、6、10（PDF物理页码）','TIMS/PASEF据培训01、03。原图来自01 p14，下方结构与电场图裁切，未改变标注。100 ms不是固定参数。TOF基础补充来源：https://www.ssi.shimadzu.com/service-support/technical-support/analysis-basics/fundamental/mass_analyzers.html 。本页讲解原理，参数需按机型与样本确定。');

title('样本序列的准备与放行','先确认系统状态，再由 QC 和首针结果决定是否继续');
const rows=[
['01','液相准备','溶剂替换、Extended wash、洗针和柱平衡'],
['02','质谱校正','柱压与 TIC 稳定后，校正 m/z 和离子淌度'],
['03','序列核对','核对位置、进样量、LC/MS 方法与柱信息'],
['04','QC 与首针','先 QC，再跑一针样本，比较峰形、信号和柱压'],
['05','运行监控','持续观察压力趋势，按计划穿插 QC 与 Blank']
];
rows.forEach(([n,h,b],i)=>{const y=205+i*77;t(n,64,y,65,43,28,true,blue);t(h,148,y,240,43,28,true);t(b,405,y+2,810,45,25);});
t('保存序列后上传样本条件，状态通过再启动；压力异常升高时暂停追加进样。',64,610,1152,48,24,true,blue);
save('来源：02 p11–26；09 p13–19（PDF物理页码）','逐步来源：02 p13–18液相准备；p20–24校正；p25序列与QC；p26首针与监控。软件操作：Save → Upload Sample Conditions → 状态通过 → Start Sequence。培训建议每6–8针穿插QC与Blank，实际频率按实验设计。本页保留运行质量检查，不展开数据分析。实际校正电压、流量和接受标准依当前机型与SOP。');

title('蛋白前处理的流程与检查点','通用流程明确目的，具体条件由样本与裂解体系决定');
const steps=['取样保存','裂解提取','蛋白定量','还原烷基化','蛋白酶解','酸化除盐','复溶上机'];
steps.forEach((s,i)=>{const x=64+i*166;t(String(i+1).padStart(2,'0'),x,205,150,40,27,true,blue);t(s,x,254,160,45,26,true);});
t('路线选择',64,360,250,42,29,true,blue);
t('依据样本屏障、输入量和干扰物选择提取与清理方法。',340,362,876,44,26);
t('酶解兼容',64,441,250,42,29,true,blue);
t('高尿素需稀释或换液；SDS 需匹配专门的清理路线。',340,443,876,44,26);
t('上机检查',64,522,250,42,29,true,blue);
t('核对酸化、除盐、复溶和澄清度，记录浓度与上样量。',340,524,876,44,26);
t('酶能工作，不代表残余试剂适合直接进入 LC–MS。',64,606,1152,44,25,true,blue);
save('来源：10 p9、12–17、28、32（PDF物理页码）','流程据10 p9重建为可编辑文本，不依赖整页截图。尿素约1 M等为培训入门范围，不作为本实验既定SOP。SDC酸化去除与SDS清理不同，不能混用。两份前处理PDF为逐字节相同文件。还原/烷基化浓度、酶比和酶解时长未在材料中统一规定，需实验方案确定。');

await fs.mkdir(path.join(root,'.build'),{recursive:true});
await fs.mkdir(path.join(root,'output/previews'),{recursive:true});
await fs.mkdir(path.join(root,'web/public'),{recursive:true});
await fs.writeFile(path.join(root,'research/sample-content.json'),JSON.stringify(pages,null,2));
await fs.copyFile(path.join(root,'research/figures/tims-crop.png'),path.join(root,'web/public/tims-crop.png'));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const html=pages.map(page=>'<div class="sample-page">\n'+page.elements.map(e=> e.type==='text'?`<div style="position:absolute;left:${e.x}px;top:${e.y}px;width:${e.w}px;height:${e.h}px;font-size:${e.size}px;font-weight:${e.bold?700:400};color:${e.color};line-height:1.38;white-space:pre-wrap">${escape(e.text)}</div>`:`<img src="/tims-crop.png" style="position:absolute;left:${e.x}px;top:${e.y}px;width:${e.w}px;height:${e.h}px;object-fit:contain" />`).join('\n')+'\n</div>\n\n<!--\n'+page.notes+'\n-->');
await fs.writeFile(path.join(root,'web/slides.md'),'---\ntheme: default\ntitle: timsTOF 组会三页样例\ncanvasWidth: 1280\naspectRatio: 16/9\nfonts:\n  sans: Microsoft YaHei\n  provider: none\ncolorSchema: light\ndrawings:\n  enabled: false\n---\n\n'+html.join('\n\n---\n\n'));
await fs.writeFile(path.join(root,'web/style.css'),'.slidev-layout{padding:0!important;background:#fff!important}.sample-page{position:absolute;inset:0;width:1280px;height:720px;font-family:"Microsoft YaHei",sans-serif}.sample-page div{padding:0;margin:0;box-sizing:border-box}');
if(process.argv.includes('--web-only')) process.exit(0);
for (const [i,page] of pages.entries()) {
 const slide=p.slides.add();slide.background.fill='#FFFFFF';slide.speakerNotes.text=page.notes;
 for (const e of page.elements) {
  if(e.type==='text') {const sh=slide.shapes.add({geometry:'textbox',name:`text-${i}-${e.x}-${e.y}`,position:{left:e.x,top:e.y,width:e.w,height:e.h},fill:'none',line:{fill:'none',width:0}});sh.text=e.text;sh.text.style={typeface:font,fontSize:e.size,bold:e.bold,color:e.color};}
  else {const b=await fs.readFile(path.join(root,e.file));slide.images.add({blob:b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),contentType:'image/png',alt:'双TIMS结构与电场示意，培训01物理第14页',fit:'contain',position:{left:e.x,top:e.y,width:e.w,height:e.h}});}
 }
 await fs.writeFile(path.join(root,`output/previews/sample-${i+1}.png`),new Uint8Array(await (await p.export({slide,format:'png',scale:1})).arrayBuffer()));
}
const candidatePath=path.join(root,'.build/candidate.pptx');
await (await PresentationFile.exportPptx(p)).save(candidatePath);
const finalName=process.argv.find(a=>a.startsWith('--final-name='))?.split('=')[1]||'timstof-samples.pptx';
if(path.basename(finalName)!==finalName||!finalName.endsWith('.pptx')) throw new Error('final-name must be a PPTX filename without directories');
const result=await finalizePresentation({workspaceDir:root,candidatePath,finalPath:path.join(root,'output',finalName),pythonExecutable:runtime+'/python/python.exe',integrityValidatorPath:skill+'/container_tools/inspect_presentation_package_integrity.py',layoutValidatorPath:skill+'/container_tools/inspect_presentation_layout_geometry.py',layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit'],explicitTotalSlideCount:3,fontPolicy:{basis:'design',families:[font]},verifyArtifactToolImport:true,receiptPath:path.join(root,'.build',finalName+'.validation.json')});
console.log(JSON.stringify(result,null,2));

