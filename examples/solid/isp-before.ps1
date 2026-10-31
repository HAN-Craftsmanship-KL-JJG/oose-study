# One big base class: every animal must offer everything.
class Animal {
    [void] Eat() { throw [System.NotImplementedException]::new() }
    [void] Fly() { throw [System.NotImplementedException]::new() }
    [void] Swim() { throw [System.NotImplementedException]::new() }
}

class Lion : Animal {
    [void] Eat() { Write-Host "Eating meat" }
    # Fly and Swim still exist on Lion, and they throw.
}
