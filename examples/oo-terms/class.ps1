class Keeper {
    [string]$Name
    [string]$Area

    Keeper([string]$name, [string]$area) {
        $this.Name = $name
        $this.Area = $area
    }

    [string] Description() {
        return "$($this.Name) ($($this.Area))"
    }
}

# Two objects of the same class, each with its own data
$a = [Keeper]::new("Anna", "Reptiles")
$b = [Keeper]::new("Ben", "Birds")
$a.Description()
