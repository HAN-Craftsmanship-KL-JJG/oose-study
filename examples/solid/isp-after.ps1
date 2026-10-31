# Small base classes: a class takes only what it can do.
class Animal {
    [void] Eat() { throw [System.NotImplementedException]::new() }
}

class Flyer {
    [void] Fly() { throw [System.NotImplementedException]::new() }
}

class Lion : Animal {
    [void] Eat() { Write-Host "Eating meat" }
}
