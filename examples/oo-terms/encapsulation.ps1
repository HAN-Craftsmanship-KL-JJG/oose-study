class FoodStore {
    hidden [double]$stockKg = 0

    [void] Add([double]$kg) {
        if ($kg -le 0) { throw "Amount must be positive" }
        $this.stockKg += $kg
    }

    [void] Take([double]$kg) {
        if ($kg -gt $this.stockKg) { throw "Not enough food" }
        $this.stockKg -= $kg
    }

    [double] GetStockKg() {
        return $this.stockKg
    }
}
