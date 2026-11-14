param([string]$InputFile,[string]$OutputFile)
$ErrorActionPreference='Stop'
$word=New-Object -ComObject Word.Application
$word.Visible=$false
$word.DisplayAlerts=0
$word.AutomationSecurity=3
try {
 $doc=$word.Documents.Open([IO.Path]::GetFullPath($InputFile),$false,$true)
 try {
  $doc.Fields.Update() | Out-Null
  $doc.Repaginate()
  $doc.ExportAsFixedFormat([IO.Path]::GetFullPath($OutputFile),17)
  Write-Output ('Rendered Word pages: '+$doc.ComputeStatistics(2))
 } finally {$doc.Close(0)}
} finally {$word.Quit()}
