class Bird {
    [void] Fly() { Write-Host "I fly" }
}

class Penguin : Bird {
    [void] Fly() {
        throw "Penguins do not fly" # [!code highlight]
    }
}

# This code works for every Bird, until it gets a Penguin.
foreach ($bird in $birds) {
    $bird.Fly()
}
