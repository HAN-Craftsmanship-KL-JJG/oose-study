class Bird {
    hidden [string]$name

    Bird([string]$name) {
        $this.name = $name
    }

    [string] GetName() { return $this.name }
}

class Penguin : Bird {
    hidden [int]$dives = 0

    Penguin([string]$name) : base($name) { }

    [string] Dive() {
        $this.dives++
        return "$($this.GetName()) dives, dive $($this.dives)"   # inherited method
    }
}
