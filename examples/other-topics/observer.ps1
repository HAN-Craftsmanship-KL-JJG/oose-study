# The observer "interface": a base class whose method throws.
class FeedingObserver {
    [void] AnimalFed([object]$animal) {
        throw [System.NotImplementedException]::new("AnimalFed")
    }
}

# The subject: it keeps a list of observers and tells them about a change.
class Animal {
    [string]$Name
    hidden [System.Collections.Generic.List[FeedingObserver]]$observers =
        [System.Collections.Generic.List[FeedingObserver]]::new()

    Animal([string]$name) { $this.Name = $name }

    [void] Subscribe([FeedingObserver]$observer) { $this.observers.Add($observer) }

    [void] Unsubscribe([FeedingObserver]$observer) { [void]$this.observers.Remove($observer) }

    [void] Feed() {
        # ... the keeper gives the food ...
        foreach ($observer in $this.observers) {
            $observer.AnimalFed($this)   # Animal does not know the concrete classes
        }
    }
}

class KeeperApp : FeedingObserver {
    [void] AnimalFed([object]$animal) {
        Write-Host "App: $($animal.Name) was fed"
    }
}

class FeedingLog : FeedingObserver {
    [void] AnimalFed([object]$animal) {
        Write-Host "Log: $($animal.Name) fed at $(Get-Date -Format HH:mm)"
    }
}

# Using it
$leo = [Animal]::new("Leo the lion")
$leo.Subscribe([KeeperApp]::new())
$leo.Subscribe([FeedingLog]::new())
$leo.Feed()   # both observers get a message
