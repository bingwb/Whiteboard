using namespace System
using namespace System.Collections.Generic

using namespace Microsoft.VisualBasic.FileIO

[CmdletBinding()]
param (
    [Parameter()]
    [string]
    $CmdParam
)

Add-Type -AssemblyName 'Microsoft.VisualBasic'

Write-Host "Received command parameter: $CmdParam"

<#
   root
    ├── Sources
    └── Parameters
        ├── Name
        ├── Value
        ├── Values
        ├── IsDefault
        ├── IsInherited
        └── SourceLevel


├──
└──
 #>

# Stack for params file path
# Stack for params value set
# Merge the params value set
function Import-Ini {
    param (
        [Parameter(Mandatory)]
        [string]
        $IniFilePath
    )

    if (-Not (Test-Path -Path $IniFilePath)) {
        throw "INI file not found: $IniFilePath"
    }

    $parser = [TextFieldParser]::new($IniFilePath)

    $parser.TextFieldType = [FieldType]::Delimited
    $parser.SetDelimiters('=', ' ')
    $parser.HasFieldsEnclosedInQuotes = $true
    $parser.TrimWhiteSpace = $true
    $parser.CommentTokens = @('#', ';', "'", '//', '--')

    $params = @{}

    try {
        while (-Not $parser.EndOfData) {
            $fields = $parser.ReadFields() | Where-Object { $_ -ne '' }

            if ($fields.Count -ge 2) {
                $key = $fields[0]
                $value = [regex]::Unescape($fields[1])

                $params[$key] = $value
            }
        }
    }
    finally {
        $parser.Close()
    }

    return $params
}

function Resolve-Params {
    param (
        [Parameter(Mandatory)]
        [string]
        $IniFilePath
    )

    $sources = [List[string]]::new()
    $paramSet = [Stack[hashtable]]::new()

    $currentPath = $IniFilePath
    $currentParams = $null
    $prototype = $null

    do {
        $currentParams = Import-Ini -IniFilePath $currentPath
        $prototype = $currentParams['prototype']

        [void]$sources.Add($currentPath)
        [void]$currentParams.Remove('prototype')
        $paramSet.Push($currentParams)

        if (-Not $prototype) {
            break
        }

        $currentPath = Join-Path -Path (Split-Path -Path $currentPath -Parent) -ChildPath $prototype -Resolve -ErrorAction Stop

        if ($sources.Contains($currentPath)) {
            throw "Cyclic prototype reference detected: $currentPath is already in the stack."
        }
    } while ($true)

    $mergedParams = @{}

    $level = $paramSet.Count - 1

    while ($paramSet.Count -gt 0) {
        $currentParams = $paramSet.Pop()

        foreach ($entry in $currentParams.GetEnumerator()) {
            $existingEntry = $mergedParams[$entry.Key]
            $values = $null

            if ($existingEntry) {
                $values = $existingEntry.Values
            }
            else {
                $values = [List[PSCustomObject]]::new()
            }

            [void]$values.Insert(0, [PSCustomObject]@{
                    Value  = $entry.Value
                    Source = $sources[$level]
                }
            )

            $mergedParams[$entry.Key] = [PSCustomObject]@{
                Value       = $entry.Value
                Values      = $values
                IsInherited = ($level -gt 0)
                SourceLevel = $level
                Source      = $sources[$level]
            }
        }

        $level--
    }

    return [PSCustomObject]@{
        Sources    = $sources.ToArray()
        Parameters = [PSCustomObject]$mergedParams
    }
}

Import-Ini -IniFilePath $CmdParam

$params = Resolve-Params -IniFilePath $CmdParam

$params

$params.Sources
$params.Parameters.PSObject.Properties | ForEach-Object {
    Write-Host "Parameter: $($_.Name)"
    Write-Host "  Value: $($_.Value.Value)"
    Write-Host "  Values: $($_.Value.Values -join ', ')"
    Write-Host "  IsInherited: $($_.Value.IsInherited)"
    Write-Host "  SourceLevel: $($_.Value.SourceLevel)"
    Write-Host "  Source: $($_.Value.Source)"
}

$refName = 'reference'
$params.Parameters.$refName

foreach ($entry in $params.Parameters.PSObject.Properties) {
    Write-Host "Parameter: $($entry.Name)"
    Write-Host "    Value: $($entry.Value.Value)"
}
