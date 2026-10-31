class Calculator {
    [int] Mul([int]$i, [int]$j) {
        return $i * $j
    }
}

class Multiplier {
    [int]$I
    [int]$J

    Multiplier([int]$i, [int]$j) {
        $this.I = $i
        $this.J = $j
    }

    [int] Calculate() {
        return [Calculator]::new().Mul($this.I, $this.J)
    }
}
