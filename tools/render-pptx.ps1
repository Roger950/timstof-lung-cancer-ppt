param([string]$InputFile,[string]$OutputDir)
$ErrorActionPreference='Stop'
$source=(Resolve-Path -LiteralPath $InputFile).Path
$dest=[IO.Path]::GetFullPath((Join-Path (Get-Location) $OutputDir))
New-Item -ItemType Directory -Force -Path $dest | Out-Null
$ppt=New-Object -ComObject PowerPoint.Application
try {
 $deck=$ppt.Presentations.Open($source,$true,$false,$false)
 try {
  $deck.Export($dest,'PNG',1280,720)
  $stats=@()
  foreach($slide in $deck.Slides){
   $text=0;$pics=0;$tables=0
   foreach($shape in $slide.Shapes){if($shape.HasTextFrame -eq -1){$text++};if($shape.Type -eq 13){$pics++};if($shape.HasTable -eq -1){$tables++}}
   $stats+=@{slide=$slide.SlideIndex;textShapes=$text;pictures=$pics;tables=$tables}
  }
  @{slides=$deck.Slides.Count;objects=$stats} | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $dest 'powerpoint-check.json') -Encoding utf8
 } finally {$deck.Close()}
} finally {$ppt.Quit()}
