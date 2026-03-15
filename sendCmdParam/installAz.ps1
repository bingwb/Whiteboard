# Check if Azure CLI is already installed
if (Get-Command az -ErrorAction SilentlyContinue) {
    Write-Host "Azure CLI is already installed. Skipping installation."
} else {
    # Download and install Azure CLI MSI silently
    Invoke-WebRequest -Uri "https://aka.ms/installazurecliwindows" -OutFile "AzureCLI.msi"
    Start-Process -FilePath "msiexec.exe" -ArgumentList "/i AzureCLI.msi /quiet /norestart" -Wait
    Remove-Item "AzureCLI.msi"

    # Refresh environment variables to include az in PATH
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}

# Update all installed extensions to latest versions
az extension update --all

# Verify installation
az --version
