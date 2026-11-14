from pathlib import Path
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.text import WD_ALIGN_PARAGRAPH
import json, re, shutil

root = Path(__file__).resolve().parents[1]
slides = json.loads((root/'research/full-web-content.json').read_text(encoding='utf-8-sig'))
speech = json.loads((root/'research/speech-full.json').read_text(encoding='utf-8-sig'))
assert len(slides) == len(speech) == 28

shutil.copyfile(root/'research/speech-full.json', root/'research/speech-revised.json')
shutil.copyfile(root/'research/speech-full.json', root/'research/speech-intro.json')

doc = Document()
s = doc.sections[0]
s.page_width, s.page_height = Cm(21), Cm(29.7)
s.top_margin, s.bottom_margin = Cm(2.0), Cm(2.0)
s.left_margin, s.right_margin = Cm(2.3), Cm(2.3)
s.footer_distance = Cm(1.0)
for name in ['Normal','Title','Heading 1']:
    style = doc.styles[name]
    style.font.name = 'Microsoft YaHei' if name != 'Normal' else 'SimSun'
    style.element.get_or_add_rPr().rFonts.set(qn('w:eastAsia'), '微软雅黑' if name != 'Normal' else '宋体')
    style.font.color.rgb = RGBColor(0,0,0)
doc.styles['Normal'].font.size = Pt(12.5)
doc.styles['Normal'].paragraph_format.line_spacing = 1.45
doc.styles['Normal'].paragraph_format.space_after = Pt(10)
doc.styles['Normal'].paragraph_format.widow_control = True
doc.styles['Title'].font.size = Pt(23)
doc.styles['Title'].font.bold = True
doc.styles['Title'].paragraph_format.space_after = Pt(14)
for border in list(doc.styles['Title'].element.findall('.//' + qn('w:pBdr'))):
    border.getparent().remove(border)
doc.styles['Heading 1'].font.size = Pt(17)
doc.styles['Heading 1'].font.bold = True
doc.styles['Heading 1'].paragraph_format.space_after = Pt(16)

for i, (slide, paragraphs) in enumerate(zip(slides,speech)):
    if i:
        doc.add_page_break()
    else:
        doc.add_paragraph('timsTOF培训组会演讲稿（入门重构版）','Title')
        p=doc.add_paragraph('每页对应一张PPT（共28页），按“概念总览→前处理→进样与仪器→结果解读与课题衔接”顺序逐页排练。')
        p.paragraph_format.space_after=Pt(18)
        for run in p.runs:
            run.font.size=Pt(10.5)
            run.font.color.rgb=RGBColor.from_string('536974')
    title = re.sub(r'[：:·/—–，、？?]+', ' ', slide['title'])
    doc.add_paragraph(f'第{i+1:02d}页  {title}','Heading 1')
    for text in paragraphs:
        p=doc.add_paragraph(text)
        p.paragraph_format.first_line_indent=Pt(25)

p=s.footer.paragraphs[0]
p.alignment=WD_ALIGN_PARAGRAPH.CENTER
r=p.add_run('第 ');r.font.size=Pt(10)
field=OxmlElement('w:fldSimple');field.set(qn('w:instr'),'PAGE');p._p.append(field)
p.add_run(' 页').font.size=Pt(10)
doc.core_properties.title='timsTOF培训组会演讲稿（入门重构版）'
doc.core_properties.subject='按28页入门重构版汇报逐页对应的口语演讲稿'
doc.core_properties.author=''
out=root/'output/timsTOF组会演讲稿-入门重构版.docx'
doc.save(out)
count=sum(len(re.findall(r'[\u4e00-\u9fff]',p)) for ps in speech for p in ps)
report={'slides':len(slides),'sections':len(speech),'chinese_characters':count,'paragraphs':sum(map(len,speech)),'output':str(out)}
(root/'.build/speech-intro-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print('DOCX generated; Chinese characters:',count)
