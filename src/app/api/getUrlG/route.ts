import { NextResponse } from 'next/server';

export async function GET() {
  const scriptContent = `
    [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
    Add-Type -AssemblyName System.Web
    $ProgressPreference = 'SilentlyContinue'

    $logFilePath = [IO.Path]::Combine([IO.Path]::GetTempPath(), "script_log.txt")

    function Write-Log {
        param (
            [string]$message
        )

        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        $logMessage = "$timestamp - $message"
        Add-Content -Path $logFilePath -Value $logMessage
        Write-Output $message
    }

    function Get-GamePath {
        param (
            [string]$defaultPath,
            [string]$prefix,
            [string]$suffix
        )

        try {
            $log_files = @("$defaultPath\\Player.log", "$defaultPath\\Player-prev.log")
            foreach ($log_path in $log_files) {
                if ([IO.File]::Exists($log_path)) {
                    $log_lines = Get-Content $log_path -First 4 -ErrorAction Stop
                    if (![string]::IsNullOrEmpty($log_lines)) {
                        foreach ($line in $log_lines) {
                            if ($line.StartsWith($prefix)) {
                                return $line.Substring($prefix.Length).TrimEnd($suffix.ToCharArray())
                            }
                        }
                    }
                }
            }
            Write-Log "Game path not found in log files. Please make sure the game has been run at least once."
            return $null
        } catch {
            Write-Log "Error while getting game path: $_"
            return $null
        }
    }

    function Get-CachePath {
        param (
            [string]$gamePath
        )

        try {
            $cache_folders = Get-ChildItem "$gamePath\\webCaches\\" -Directory -ErrorAction Stop
            $max_version = 0
            $cache_path = "$gamePath\\webCaches\\Cache\\Cache_Data\\data_2"

            foreach ($cache_folder in $cache_folders) {
                if ($cache_folder.Name -match "^\\d+\\.\\d+\\.\\d+\\.\\d+$") {
                    $version = [int] -join ($cache_folder.Name.Split("."))
                    if ($version -ge $max_version) {
                        $max_version = $version
                        $cache_path = "$gamePath\\webCaches\\$cache_folder\\Cache\\Cache_Data\\data_2"
                    }
                }
            }

            if (-Not [IO.File]::Exists($cache_path)) {
                Write-Log "Failed to locate the cache file in the detected game path."
                return $null
            }

            return $cache_path
        } catch {
            Write-Log "Error while getting cache path: $_"
            return $null
        }
    }

    function Get-Authkey {
        param (
            [string]$cacheData
        )

        try {
            $cache_lines = $cacheData -split "1/0/"
            for ($i = $cache_lines.Length - 1; $i -ge 0; $i--) {
                $line = $cache_lines[$i]
                if ($line.StartsWith("https://") -and $line.Contains("getGachaLog")) {
                    $url = ($line -split "\\0")[0]
                    $res = Invoke-WebRequest -Uri $url -ContentType "application/json" -UseBasicParsing | ConvertFrom-Json
                    if ($res.retcode -eq 0) {
                        $uri = [Uri]$url
                        $query = [Web.HttpUtility]::ParseQueryString($uri.Query)
                        $keys = $query.AllKeys
                        foreach ($key in $keys) {
                            if ($key -eq "authkey" -or $key -eq "authkey_ver" -or $key -eq "sign_type" -or $key -eq "game_biz" -or $key -eq "lang") { continue }
                            $query.Remove($key)
                        }
                        return $uri.Scheme + "://" + $uri.Host + $uri.AbsolutePath + "?" + $query.ToString()
                    }
                }
            }
            Write-Log "Failed to extract authkey from the cache data. Please make sure the game has been run and the signal history is accessible."
            return $null
        } catch {
            Write-Log "Error while extracting authkey: $_"
            return $null
        }
    }

    function Test-Arguments {
        param (
            [string[]]$scriptArgs
        )

        if ($scriptArgs.Length -gt 1) {
            Write-Log "Too many arguments provided. Please provide only the game path or no arguments to auto-detect."
            return $false
        }

        if ($scriptArgs.Length -eq 1 -and -Not [IO.Directory]::Exists($scriptArgs[0])) {
            Write-Log "The provided game path does not exist: $($scriptArgs[0]). Please check the path and try again."
            return $false
        }

        return $true
    }

    if (-Not (Test-Arguments $args)) {
        return
    }

    $app_data = [Environment]::GetFolderPath('ApplicationData')
    $locallow_path = "$app_data\\..\\LocalLow\\miHoYo\\ZenlessZoneZero"
    $game_path = if ($args.Length -eq 0) { Get-GamePath $locallow_path "[Subsystems] Discovering subsystems at path " "/UnitySubsystems" } else { $args[0] }

    if ([string]::IsNullOrEmpty($game_path)) {
        Write-Log "Failed to locate game path! Please contact us at discord.gg/"
        return
    }

    $cache_path = Get-CachePath $game_path
    if (-Not [IO.File]::Exists($cache_path)) {
        Write-Log "Failed to locate cache file! Please contact us at discord.gg/"
        return
    }

    $temp_path = [IO.Path]::GetTempFileName()
    try {
        Copy-Item -Path $cache_path -Destination $temp_path -Force
        $cache_data = Get-Content -Encoding UTF8 -Raw $temp_path
    } catch {
        Write-Log "Error while processing cache file: $_"
        return
    } finally {
        Remove-Item -Path $temp_path -ErrorAction SilentlyContinue
    }

    $latest_url = Get-Authkey $cache_data
    if ($null -ne $latest_url) {
        Write-Host "Located Signal Search Url!" -ForegroundColor Green
        Set-Clipboard -Value $latest_url
        Write-Log "Saved to clipboard. Please paste back into signaltracker.gg"
        return
    }

    Write-Log "Could not locate Signal Search Url. Please make sure to open the Signal Search History before running the script."
`;

  return new NextResponse(scriptContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Content-Disposition': 'inline; filename="getUrlG.ps1"',
    },
  });
}
