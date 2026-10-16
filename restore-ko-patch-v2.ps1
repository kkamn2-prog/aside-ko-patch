# Aside Korean patch v2 - restore originals. Run from an EXTERNAL terminal with Aside closed.
param([switch]$IgnoreRunning)
$ErrorActionPreference = 'Stop'
$base = Join-Path $env:LOCALAPPDATA 'Aside\User Data\AsideAgentManager'
if (-not $IgnoreRunning) {
  $run = Get-Process | Where-Object { $_.Name -match '^aside' -or ($_.Path -and $_.Path -like '*\Aside\*') }
  if ($run) { throw "Aside is running. Close it first (or use -IgnoreRunning)." }
}
foreach ($ver in Get-ChildItem $base -Directory) {
  foreach ($bak in Get-ChildItem $ver.FullName -Filter '*.html.ko-v2-bak' -File) {
    $orig = $bak.FullName -replace '\.ko-v2-bak$', ''
    Copy-Item $bak.FullName $orig -Force
    Write-Output "restored $($ver.Name)\$([IO.Path]::GetFileName($orig))"
  }
  $js = Join-Path $ver.FullName 'ko-i18n.js'
  if (Test-Path $js) { Remove-Item $js -Force; Write-Output "removed $($ver.Name)\ko-i18n.js" }
  $left = Select-String -Path (Join-Path $ver.FullName '*.html') -Pattern 'ko-i18n' -List
  if ($left) { Write-Output "WARNING still referenced: $($left.Path -join ', ')" } else { Write-Output "clean: $($ver.Name)" }
}
