class Animal {
    [string] MakeSound() {
        throw [System.NotImplementedException]::new("MakeSound")
    }
}

class Lion : Animal {
    [string] MakeSound() { return "Roar" }
}

class Penguin : Animal {
    [string] MakeSound() { return "Squawk" }
}
