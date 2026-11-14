from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
from lxml import etree as E
import json,re
from PIL import Image
from io import BytesIO
import posixpath

root=Path(__file__).resolve().parents[1]
src=root/'.build/timstof-intro-editable.pptx'
out=root/'.build/timstof-intro-repaired.pptx'
speech=json.loads((root/'research/speech-full.json').read_text(encoding='utf-8-sig'))
assert len(speech) == 28
ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
with ZipFile(src) as zi:
    parts={n:zi.read(n) for n in zi.namelist()}
    ct=E.fromstring(parts['[Content_Types].xml'])
    removed=[]
    for el in list(ct):
        part=el.get('PartName','').lstrip('/')
        if part and part not in parts:
            removed.append(part);ct.remove(el)
    assert all(re.fullmatch(r'ppt/slideMasters/slideMaster\d+\.xml',p) for p in removed)
    parts['[Content_Types].xml']=E.tostring(ct,encoding='UTF-8',xml_declaration=True,standalone=True)
    image_fixes=[]
    for i in range(1,29):
        slide_name=f'ppt/slides/slide{i}.xml'
        slide=E.fromstring(parts[slide_name])
        counter_number=0
        for sh in slide.findall('.//p:sp',ns):
            texts=sh.findall('.//a:t',ns)
            if len(texts)==1 and (texts[0].text or '').startswith('counter(run'):
                counter_number+=1
                texts[0].text=f'{counter_number:02d}'
                sh.find('p:spPr/a:xfrm/a:ext',ns).set('cx',str(45*9525))
        rels=E.fromstring(parts[f'ppt/slides/_rels/slide{i}.xml.rels'])
        targets={r.get('Id'):posixpath.normpath(posixpath.join('ppt/slides',r.get('Target'))) for r in rels}
        for pic in slide.findall('.//p:pic',ns):
            blip=pic.find('.//a:blip',ns)
            rid=blip.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
            iw,ih=Image.open(BytesIO(parts[targets[rid]])).size
            xf=pic.find('p:spPr/a:xfrm',ns);off=xf.find('a:off',ns);ext=xf.find('a:ext',ns)
            x,y=int(off.get('x')),int(off.get('y'));w,h=int(ext.get('cx')),int(ext.get('cy'))
            factor=min(w/iw,h/ih);nw,nh=round(iw*factor),round(ih*factor)
            off.set('x',str(x+(w-nw)//2));off.set('y',str(y+(h-nh)//2))
            ext.set('cx',str(nw));ext.set('cy',str(nh))
            image_fixes.append(i)
        parts[slide_name]=E.tostring(slide,encoding='UTF-8',xml_declaration=True,standalone=True)
    for i,paras in enumerate(speech,1):
        name=f'ppt/notesSlides/notesSlide{i}.xml'
        note=E.fromstring(parts[name])
        body=None
        for sh in note.findall('.//p:sp',ns):
            ph=sh.find('.//p:ph',ns)
            if ph is not None and ph.get('type')=='body':
                body=sh.find('p:txBody',ns);break
        if body is None:raise RuntimeError(f'Missing body on notes {i}')
        for j,text in enumerate(['逐页演讲稿']+paras+['原讲者备注及来源如下']):
            p=E.Element('{'+ns['a']+'}p')
            r=E.SubElement(p,'{'+ns['a']+'}r')
            E.SubElement(r,'{'+ns['a']+'}t').text=text
            body.insert(2+j,p)
        parts[name]=E.tostring(note,encoding='UTF-8',xml_declaration=True,standalone=True)
    with ZipFile(out,'w',ZIP_DEFLATED) as zo:
        for n,data in parts.items():zo.writestr(n,data)
(root/'.build/export-intro-repair.json').write_text(json.dumps({'removed_unused_master_content_types':removed,'speech_notes_slides':28,'contained_original_image_slides':image_fixes},indent=2),encoding='utf-8')
print('Removed unused declarations:',len(removed),'Added speech to 28 notes pages')
