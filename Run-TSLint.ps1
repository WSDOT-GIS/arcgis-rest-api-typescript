<#
.SYNOPSIS
    Runs TSLint on all *.d.ts files.
#>

[string[]]$typeDefs = Get-ChildItem "*.d.ts"
$args = [System.Collections.Generic.List[string]]::new()
$args.Add("--fix")
foreach ($item in $typeDefs) {
    $args.Add($item)
}

Start-Process "tslint" $args -NoNewWindow -Wait