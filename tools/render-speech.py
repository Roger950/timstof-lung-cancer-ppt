"""Use the packaged DOCX rasterizer with native Word as the Windows PDF backend."""
import importlib.util
import os
import subprocess
import sys
from pathlib import Path

root=Path(__file__).resolve().parents[1]
poppler_bin=r'C:\Program Files\WindowsApps\OpenAI.CodexPrimaryRuntime.v26-1112-737-0_26.1112.737.0_x64__3k8sg7r9htsxt\dependencies\native\poppler\Library\bin'
os.environ['PATH']=poppler_bin+os.pathsep+os.environ.get('PATH','')
skill=Path('C:/Program Files/WindowsApps/OpenAI.CodexPrimaryRuntime.v26-1112-737-0_26.1112.737.0_x64__3k8sg7r9htsxt/plugins/openai-primary-runtime/plugins/documents/skills/documents')
spec=importlib.util.spec_from_file_location('render_docx',skill/'render_docx.py')
renderer=importlib.util.module_from_spec(spec)
spec.loader.exec_module(renderer)

def word_pdf(input_path,user_profile,convert_tmp_dir,stem,verbose=False):
    pdf=Path(convert_tmp_dir)/(stem+'.pdf')
    result=subprocess.run(['powershell.exe','-NoProfile','-ExecutionPolicy','Bypass','-File',str(root/'tools/render-word.ps1'),'-InputFile',input_path,'-OutputFile',str(pdf)],capture_output=True,text=True)
    if result.returncode or not pdf.exists():
        raise RuntimeError(result.stdout+'\n'+result.stderr)
    return str(pdf),result.stdout

renderer.convert_to_pdf=word_pdf
sys.argv=['render_docx.py',str(root/'output/timsTOF组会演讲稿-入门重构版.docx'),'--output_dir',str(root/'.build/speech-intro-render'),'--dpi','120','--emit_pdf']
renderer.main()
