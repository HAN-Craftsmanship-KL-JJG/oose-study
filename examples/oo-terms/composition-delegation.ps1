class OrderLine {
    hidden [double]$price
    hidden [int]$quantity

    OrderLine([double]$price, [int]$quantity) {
        $this.price = $price
        $this.quantity = $quantity
    }

    [double] Subtotal() { return $this.price * $this.quantity }
}

class Order {
    # Composition: Order owns its lines. Nobody else gets them.
    hidden [System.Collections.Generic.List[OrderLine]]$lines =
        [System.Collections.Generic.List[OrderLine]]::new()

    [void] Add([double]$price, [int]$quantity) {
        # Composition: Order creates its own parts.
        $this.lines.Add([OrderLine]::new($price, $quantity))
    }

    [double] GetTotal() {
        $total = 0.0
        foreach ($line in $this.lines) {
            # Delegation: each line works out its own subtotal.
            $total += $line.Subtotal()
        }
        return $total
    }
}

class CashRegister {
    # Delegation without composition: the order comes from outside.
    [double] AmountDue([Order]$order) {
        return $order.GetTotal()
    }
}
