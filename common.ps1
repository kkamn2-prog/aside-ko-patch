# shared helpers (dot-sourced by apply/restore)
function Find-AsideBase {
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
  return $base
}
