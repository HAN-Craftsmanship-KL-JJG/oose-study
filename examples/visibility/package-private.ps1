# file: SpotifyModel.psm1

function New-Artist([string]$name) {      # internal helper
    [pscustomobject]@{ Name = $name }
}

function New-Album([string]$title, [string]$artist) {
    [pscustomobject]@{ Title = $title; Artist = New-Artist $artist }
}

Export-ModuleMember -Function New-Album   # New-Artist stays inside the module
