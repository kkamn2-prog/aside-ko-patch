# Aside Korean patch v2 - apply. Run from an EXTERNAL terminal with Aside fully closed.
# Usage: powershell -ExecutionPolicy Bypass -File apply-ko-patch-v2.ps1 [-Extra] [-IgnoreRunning]
param([switch]$Extra, [switch]$IgnoreRunning)
$ErrorActionPreference = 'Stop'
$src = Join-Path $PSScriptRoot 'ko-i18n.js'
if (-not (Test-Path $src)) { throw "ko-i18n.js not found next to this script" }
# locate AsideAgentManager automatically: known paths first, then a bounded search
$candidates = @(
  (Join-Path $env:LOCALAPPDATA 'Aside\User Data\AsideAgentManager'),
  (Join-Path $env:APPDATA 'Aside\User Data\AsideAgentManager'),
  (Join-Path $env:LOCALAPPDATA 'Aside\AsideAgentManager')
)
$base = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $base) {
  foreach ($root in @((Join-Path $env:LOCALAPPDATA 'Aside'), (Join-Path $env:APPDATA 'Aside'), (Join-Path $env:ProgramFiles 'Aside'))) {
    if (-not (Test-Path $root)) { continue }
    $hit = Get-ChildItem $root -Directory -Recurse -Depth 4 -Filter 'AsideAgentManager' -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($hit) { $base = $hit.FullName; break }
  }
}
if (-not $base) { throw "AsideAgentManager folder not found. Is Aside installed?" }

if (-not $IgnoreRunning) {
  $run = Get-Process | Where-Object { $_.Name -match '^aside' -or ($_.Path -and $_.Path -like '*\Aside\*') }
  if ($run) { throw "Aside is running ($($run.Name -join ', ')). Close it completely first (or use -IgnoreRunning)." }
}

# newest version folder only
$ver = Get-ChildItem $base -Directory | Where-Object { $_.Name -match '^\d+(\.\d+)+$' } |
  Sort-Object { [version]$_.Name } -Descending | Select-Object -First 1
if (-not $ver) { throw "no version folder found under $base" }

$htmlFiles = @('main.html', 'sidepanel.html')
if ($Extra) { $htmlFiles += @('account-password.html', 'minipopup.html') }
$tag = '<script src="/ko-i18n.js" defer></script>'
$utf8 = New-Object System.Text.UTF8Encoding($false)

Write-Output "target: $($ver.FullName)"
foreach ($name in $htmlFiles) {
  $file = Join-Path $ver.FullName $name
  if (-not (Test-Path $file)) { Write-Output "skip (missing) $name"; continue }
  $html = [IO.File]::ReadAllText($file, $utf8)
  if ($html -match 'ko-i18n') { Write-Output "already patched $name"; continue }
  if (([regex]::Matches($html, '</head>')).Count -ne 1) { Write-Output "skip (unexpected </head> count) $name"; continue }
  $bak = "$file.ko-v2-bak"
  if (-not (Test-Path $bak)) { Copy-Item $file $bak }
  $html = $html.Replace('</head>', "    $tag`r`n  </head>")
  [IO.File]::WriteAllText($file, $html, $utf8)
  Write-Output "patched $name"
}
Copy-Item $src (Join-Path $ver.FullName 'ko-i18n.js') -Force

# verify
foreach ($name in $htmlFiles) {
  $file = Join-Path $ver.FullName $name
  if (-not (Test-Path $file)) { continue }
  $n = ([regex]::Matches([IO.File]::ReadAllText($file, $utf8), 'ko-i18n\.js')).Count
  Write-Output "verify $name : ko-i18n tag count = $n"
}
Write-Output 'DONE - start Aside. To undo: restore-ko-patch-v2.ps1 (Aside closed)'
