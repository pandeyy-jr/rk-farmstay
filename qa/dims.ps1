$files = @(
  "$env:USERPROFILE\Downloads\Golden-Hour Karjat Farmstay Escape.png",
  "$env:USERPROFILE\Downloads\water.jpg"
)
foreach ($f in $files) {
  $fs = [IO.File]::OpenRead($f)
  $buf = New-Object byte[] 33
  $fs.Read($buf, 0, 33) | Out-Null
  $fs.Close()
  if ($buf[0] -eq 0x89 -and $buf[1] -eq 0x50) {
    $w = [BitConverter]::ToUInt32(@($buf[19], $buf[18], $buf[17], $buf[16]), 0)
    $h = [BitConverter]::ToUInt32(@($buf[23], $buf[22], $buf[21], $buf[20]), 0)
  } else {
    $w = [BitConverter]::ToUInt16(@($buf[5], $buf[4]), 0)
    $h = [BitConverter]::ToUInt16(@($buf[3], $buf[2]), 0)
  }
  Write-Output "$f => ${w}x${h}"
}
