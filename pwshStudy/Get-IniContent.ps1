using namespace System.Collections
using namespace System.Collections.Generic

[CmdletBinding()]
param(
    [Parameter(Mandatory, Position = 0)]
    [string]$Path
)

if (-not (Test-Path $Path)) {
    throw "INI file not found: $Path"
}

$ini = @{}
$currentSection = 'global'
$ini[$currentSection] = @{}

Get-Content $Path | ForEach-Object {
    $line = $_.Trim()

    if ($line -eq '' -or $line.StartsWith(';') -or $line.StartsWith('#')) {
        return
    }

    if ($line -match '^\[(.+?)\]$') {
        $currentSection = $matches[1].Trim()

        if (-not $ini.ContainsKey($currentSection)) {
            $ini[$currentSection] = @{}
        }

        return
    }

    if ($line -match '^\s*([^=]+?)\s*=\s*(.*)$') {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()

        # Optionally unquote
        if ($value -match '^"(.*)"$') {
            $value = $matches[1]
        }
        elseif ($value -match "^'(.*)'$") {
            $value = $matches[1]
        }

        # Keep multiple same key values as array
        if ($ini[$currentSection].ContainsKey($key)) {
            $existing = $ini[$currentSection][$key]

            if ($existing -is [IList]) {
                $ini[$currentSection][$key].Add($value)
            }
            else {
                $ini[$currentSection][$key] = [List[string]]@($existing, $value)
            }
        }
        else {
            $ini[$currentSection][$key] = $value
        }
    }
}

return $ini

# Usage example (commented out to avoid execution on import):
# $iniFile = "C:\path\to\config.ini"
# $iniData = Get-IniContent -Path $iniFile
#
# Example:
# $iniData['default']['username']
# $iniData['mysection']['key']