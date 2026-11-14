from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from lxml import etree as E
import json

root=Path(__file__).resolve().parents[1]
src=root/'output/timsTOF组会汇报-入门重构版.pptx'
draft=root/'.build/timstof-intro-notes-synced.pptx'
speech=json.loads((root/'research/speech-full.json').read_text(encoding='utf-8-sig'))
assert len(speech) == 28
ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
with ZipFile(src) as zi:
    parts={n:zi.read(n) for n in zi.namelist()}
    changed=[]
    for i,paras in enumerate(speech,1):
        name=f'ppt/notesSlides/notesSlide{i}.xml'
        note=E.fromstring(parts[name])
        for sh in note.findall('.//p:sp',ns):
            ph=sh.find('.//p:ph',ns)
            if ph is not None and ph.get('type')=='body':
                body=sh.find('p:txBody',ns)
                break
        else: raise RuntimeError(f'Missing notes body {i}')
        blocks=body.findall('a:p',ns)
        texts=[''.join(p.itertext()) for p in blocks]
        start=next(j for j,t in enumerate(texts) if t=='逐页演讲稿')
        end=next(j for j,t in enumerate(texts) if t=='原讲者备注及来源如下')
        for p in blocks[start:end]:body.remove(p)
        insertion=list(body).index(blocks[end])
        for j,text in enumerate(['逐页演讲稿']+paras):
            p=E.Element('{'+ns['a']+'}p')
            r=E.SubElement(p,'{'+ns['a']+'}r')
            E.SubElement(r,'{'+ns['a']+'}t').text=text
            body.insert(insertion+j,p)
        parts[name]=E.tostring(note,encoding='UTF-8',xml_declaration=True,standalone=True)
        changed.append(name)
    with ZipFile(draft,'w',ZIP_DEFLATED) as zo:
        for n,data in parts.items():zo.writestr(n,data)
with ZipFile(src) as za, ZipFile(draft) as zb:
    actual=[n for n in za.namelist() if za.read(n)!=zb.read(n)]
    assert set(actual)==set(changed)
(root/'.build/speech-intro-notes-revision.json').write_text(json.dumps({'changed_notes_slides':28,'all_other_package_parts_identical':True,'changed_parts':actual},indent=2),encoding='utf-8')
print('Synced 28 notes transcripts.')
