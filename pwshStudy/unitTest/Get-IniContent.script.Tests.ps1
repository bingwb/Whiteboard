<#
.SYNOPSIS
    Unit tests for Get-IniContent function using Pester.

.DESCRIPTION
    This file contains Pester tests to validate the Get-IniContent function.
    Run with: Invoke-Pester -Path .\Get-IniContent.Tests.ps1

.NOTES
    Requires Pester module: Install-Module -Name Pester -Force
#>

using namespace System.IO

$scriptPath = Join-Path $PSScriptRoot '..\Get-IniContent.ps1'

# Invoke script
function Get-IniContent {
    param (
        $Path
    )

    & $scriptPath -Path $Path
}

Describe 'Get-IniContent' {
    Context 'Basic parsing' {
        It 'Parses a simple INI file correctly' {
            # Create a temporary INI file
            $iniContent = @"
[section1]
key1=value1
key2=value2

[section2]
key3=value3
"@
            $tempFile = [Path]::GetTempFileName() + '.ini'
            Set-Content -Path $tempFile -Value $iniContent

            try {
                $result = Get-IniContent -Path $tempFile

                $result['section1']['key1'] | Should -Be 'value1'
                $result['section1']['key2'] | Should -Be 'value2'
                $result['section2']['key3'] | Should -Be 'value3'
                $result['global'] | Should -BeNullOrEmpty  # No global section in this file
            }
            finally {
                Remove-Item $tempFile -ErrorAction SilentlyContinue
            }
        }
    }

    Context 'Comments and blank lines' {
        It 'Ignores comments and blank lines' {
            $iniContent = @"
; This is a comment
# Another comment

[section]
key=value
; inline comment
"@
            $tempFile = [Path]::GetTempFileName() + '.ini'
            Set-Content -Path $tempFile -Value $iniContent

            try {
                $result = Get-IniContent -Path $tempFile

                $result['section']['key'] | Should -Be 'value'
                $result['global'] | Should -BeNullOrEmpty
            }
            finally {
                Remove-Item $tempFile -ErrorAction SilentlyContinue
            }
        }
    }

    Context 'Quoted values' {
        It 'Unquotes double-quoted values' {
            $iniContent = @'
[section]
key1="quoted value"
key2='single quoted'
key3=unquoted
'@
            $tempFile = [Path]::GetTempFileName() + '.ini'
            Set-Content -Path $tempFile -Value $iniContent

            try {
                $result = Get-IniContent -Path $tempFile

                $result['section']['key1'] | Should -Be 'quoted value'
                $result['section']['key2'] | Should -Be 'single quoted'
                $result['section']['key3'] | Should -Be 'unquoted'
            }
            finally {
                Remove-Item $tempFile -ErrorAction SilentlyContinue
            }
        }
    }

    Context 'Duplicate keys' {
        It 'Handles duplicate keys as arrays' {
            $iniContent = @"
[section]
key=value1
key=value2
key=value3
"@
            $tempFile = [Path]::GetTempFileName() + '.ini'
            Set-Content -Path $tempFile -Value $iniContent

            try {
                $result = Get-IniContent -Path $tempFile

                Should -BeOfType [System.Collections.IList] -InputObject $result['section']['key']
                $result['section']['key'][0] | Should -Be 'value1'
                $result['section']['key'][1] | Should -Be 'value2'
                $result['section']['key'][2] | Should -Be 'value3'
            }
            finally {
                Remove-Item $tempFile -ErrorAction SilentlyContinue
            }
        }
    }

    Context 'Global section' {
        It 'Puts keys before first section in global' {
            $iniContent = @"
key1=value1
key2=value2

[section]
key3=value3
"@
            $tempFile = [Path]::GetTempFileName() + '.ini'
            Set-Content -Path $tempFile -Value $iniContent

            try {
                $result = Get-IniContent -Path $tempFile

                $result['global']['key1'] | Should -Be 'value1'
                $result['global']['key2'] | Should -Be 'value2'
                $result['section']['key3'] | Should -Be 'value3'
            }
            finally {
                Remove-Item $tempFile -ErrorAction SilentlyContinue
            }
        }
    }

    Context 'Error handling' {
        It 'Throws when file does not exist' {
            { Get-IniContent -Path 'nonexistent.ini' } | Should -Throw "INI file not found: nonexistent.ini"
        }
    }

    Context 'Empty file' {
        It 'Returns empty hashtable for empty file' {
            $tempFile = [Path]::GetTempFileName() + '.ini'
            New-Item -ItemType File -Path $tempFile -Force | Out-Null

            try {
                $result = Get-IniContent -Path $tempFile

                $result | Should -BeOfType [System.Collections.Hashtable]
                $result.Count | Should -Be 1  # Only global section
                $result['global'].Count | Should -Be 0
            }
            finally {
                Remove-Item $tempFile -ErrorAction SilentlyContinue
            }
        }
    }

    Context 'Invalid lines' {
        It 'Ignores invalid lines' {
            $iniContent = @"
[section]
key1=value1
invalid line without equals
key2=value2
"@
            $tempFile = [Path]::GetTempFileName() + '.ini'
            Set-Content -Path $tempFile -Value $iniContent

            try {
                $result = Get-IniContent -Path $tempFile

                $result['section']['key1'] | Should -Be 'value1'
                $result['section']['key2'] | Should -Be 'value2'
                $result['section'].ContainsKey('invalid line without equals') | Should -Be $false
            }
            finally {
                Remove-Item $tempFile -ErrorAction SilentlyContinue
            }
        }
    }
}
