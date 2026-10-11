$cutoff = (Get-Date).AddHours(-5)
$skip = @("node_modules", "AppData", ".local", ".next", "ms-playwright")
Get-ChildItem $env:USERPROFILE -File -Include *.png, *.jpg, *.jpeg, *.webp -Recurse -ErrorAction SilentlyContinue |
  Where-Object {
    $f = $_
    if ($f.LastWriteTime -lt $cutoff) { return $false }
    foreach ($s in $skip) { if ($f.FullName.Contains($s)) { return $false } }
    return $true
  } |
  Sort-Object LastWriteTime -Descending |
  Select-Object FullName, Length, LastWriteTime |
  Format-Table -AutoSize
