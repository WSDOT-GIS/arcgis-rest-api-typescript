<#
.SYNOPSIS
    Combines d.ts files into index.d.ts
.DESCRIPTION
    Combines typescript definition files into a single file.
#>

# Remove pre-existing index.d.ts if it exists
if (Test-Path "index.d.ts") {
    Remove-Item "index.d.ts"
}

# Get the d.ts files.
$files = Get-ChildItem ".\source\*.d.ts"

# Concat the files into index.d.ts
Get-Content $files | Select-String "^import" -NotMatch | Set-Content "index.d.ts"