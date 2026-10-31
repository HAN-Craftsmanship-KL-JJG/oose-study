# Each state is a class. A method returns the next state.
class EnclosureState {
    [EnclosureState] Open() { throw [System.NotImplementedException]::new("Open") }
    [EnclosureState] Close() { throw [System.NotImplementedException]::new("Close") }
}

class ClosedState : EnclosureState {
    [EnclosureState] Open() {
        Write-Host "The gate opens, visitors may enter"
        return [OpenState]::new()
    }

    [EnclosureState] Close() {
        Write-Host "The enclosure is already closed"
        return $this
    }
}

class OpenState : EnclosureState {
    [EnclosureState] Open() {
        Write-Host "The enclosure is already open"
        return $this
    }

    [EnclosureState] Close() {
        Write-Host "The gate closes, the keeper counts the animals"
        return [ClosedState]::new()
    }
}

# The context: it delegates to its current state. No if or switch on the state.
class Enclosure {
    hidden [EnclosureState]$state = [ClosedState]::new()

    [void] Open() { $this.state = $this.state.Open() }

    [void] Close() { $this.state = $this.state.Close() }
}
