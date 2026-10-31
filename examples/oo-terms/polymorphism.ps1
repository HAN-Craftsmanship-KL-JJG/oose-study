[Animal[]]$animals = @([Lion]::new(), [Penguin]::new())

foreach ($animal in $animals) {
    $animal.MakeSound()
}

# Roar
# Squawk
