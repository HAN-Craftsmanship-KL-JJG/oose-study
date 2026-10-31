class DiscountRule {
    [double] Discount([Order]$order) {
        throw [System.NotImplementedException]::new("Discount")
    }
}

class CashRegister {
    hidden [DiscountRule[]]$rules

    CashRegister([DiscountRule[]]$rules) {
        $this.rules = $rules
    }

    [double] AmountDue([Order]$order) {
        $total = $order.GetTotal()
        foreach ($rule in $this.rules) {
            $total -= $rule.Discount($order)
        }
        return $total
    }
}

# The new promotion "3 for the price of 2" is a new class.
# CashRegister and the other rules do not change.
class ThreeForTwo : DiscountRule {
    [double] Discount([Order]$order) {
        $discount = 0.0
        foreach ($line in $order.GetLines()) {
            $free = [math]::Floor($line.Quantity / 3)
            $discount += $free * $line.Price
        }
        return $discount
    }
}
