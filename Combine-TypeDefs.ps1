<#
.SYNOPSIS
    Combines d.ts files into index.d.ts
.DESCRIPTION
    Combines typescript definition files into a single file.
#>

# Remove pre-existing index.d.ts. Supress error if file doesn't exist.
Remove-Item "index.d.ts" -ErrorAction Ignore

# Get the d.ts files.
$files = Get-ChildItem "*.d.ts"

# Concat the files into index.d.ts
Get-Content $files | Select-String "^import" -NotMatch | Set-Content "index.d.ts"