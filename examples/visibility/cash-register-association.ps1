class CashRegister {
    hidden [PaymentMethod]$method          # the association

    CashRegister([PaymentMethod]$method) {
        $this.method = $method
    }

    [void] Checkout([double]$amount) {
        $this.method.Pay($amount)
    }
}

$register = [CashRegister]::new([IDeal]::new())
