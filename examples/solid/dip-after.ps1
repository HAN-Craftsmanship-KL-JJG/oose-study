# The abstraction belongs to the high level (the domain).
class PaymentProvider {
    [bool] Pay([double]$amount) {
        throw [System.NotImplementedException]::new("Pay")
    }
}

class CashRegister {
    hidden [PaymentProvider]$provider

    CashRegister([PaymentProvider]$provider) {
        $this.provider = $provider
    }

    [bool] Checkout([double]$amount) {
        return $this.provider.Pay($amount)
    }
}

# The detail depends on the abstraction.
class MolliePaymentProvider : PaymentProvider {
    hidden [MollieClient]$mollie = [MollieClient]::new()

    [bool] Pay([double]$amount) {
        $response = $this.mollie.CreatePayment([int][math]::Round($amount * 100))
        return $response.IsPaid
    }
}

# Somewhere at start-up
$register = [CashRegister]::new([MolliePaymentProvider]::new())
