$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:3000/')
$listener.Prefixes.Add('http://127.0.0.1:3000/')
$listener.Start()
Write-Host "Server started at http://localhost:3000/"
Write-Host "Press Ctrl+C to stop the server"

$blogPath = Join-Path $PSScriptRoot "index.html"
$htmlContent = Get-Content -Path $blogPath -Raw -Encoding UTF8

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $response = $context.Response
    $buffer = [System.Text.Encoding]::UTF8.GetBytes($htmlContent)
    $response.ContentType = "text/html; charset=utf-8"
    $response.ContentLength64 = $buffer.Length
    $response.OutputStream.Write($buffer, 0, $buffer.Length)
    $response.Close()
}

$listener.Stop()
$listener.Close()