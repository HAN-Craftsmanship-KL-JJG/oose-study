# Only birds that can fly promise to fly.
class Bird {
    [void] Eat() { Write-Host "I eat" }
}

class FlyingBird : Bird { # [!code highlight]
    [void] Fly() { Write-Host "I fly" }
}

class Parrot : FlyingBird { }

class Penguin : Bird {
    [void] Swim() { Write-Host "I swim" }
}

# Every FlyingBird can really fly, so this loop never fails.
foreach ($bird in [FlyingBird[]]$flyingBirds) { # [!code highlight]
    $bird.Fly()
}
