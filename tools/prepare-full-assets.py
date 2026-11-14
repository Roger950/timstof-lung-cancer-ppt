from pathlib import Path
from PIL import Image
import pypdfium2 as pdfium
import json

root = Path(__file__).resolve().parents[1]
dest = root / 'web/public/figures/full'
dest.mkdir(parents=True, exist_ok=True)
manifest = []

def crop(src, box, name, source):
    im = Image.open(root / src)
    if box:
        w, h = im.size
        im = im.crop(tuple(round(v * (w if i % 2 == 0 else h)) for i, v in enumerate(box)))
    im.save(dest / name)
    manifest.append(dict(file='figures/full/' + name, original=src, crop_fraction=box, source=source))

crop('research/figures/preparation-p15.png', (.045,.20,.95,.37), 'reduction.png', '10 p15；仅裁步骤图')
crop('research/figures/preparation-p07.png', (.07,.14,.90,.61), 'trypsin.png', '10 p7；保留序列、规则和切割产物')
crop('research/figures/e5/fig5.jpg', (0,0,1,.605), 'e5-pca.png', 'Frey et al. 2025 Fig.5A；CC BY 4.0；裁切A面板')
crop('research/figures/e2/fig3.webp', (0,0,1,.46), 'e2-nsaf.png', 'Graf et al. 2021 Fig.3A；CC BY；图例另以文字保留')

pdfpath = next((root / '20261112_Wuhan_timsTOF_Training').glob('10_*.pdf'))
doc = pdfium.PdfDocument(str(pdfpath))
for n in [14,16]:
    im = doc[n-1].render(scale=1.6).to_pil()
    im.save(root / f'research/figures/preparation-p{n:02d}.png')
crop('research/figures/preparation-p14.png', (.055,.18,.94,.51), 'lysis.png', '10 p14；裁切样本屏障与机械处理示意')
crop('research/figures/preparation-p16.png', (.055,.19,.95,.79), 'cleanup.png', '10 p16；裁切酸化、除盐、浓缩与复溶')
(root / 'research/full-asset-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
print('Prepared', len(manifest), 'assets')
