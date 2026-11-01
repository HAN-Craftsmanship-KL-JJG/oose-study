# The high-level class CashRegister depends on a detail from an external library.
class CashRegister {
    hidden [MollieClient]$mollie = [MollieClient]::new() # [!code highlight]

    [bool] Checkout([double]$amount) {
        $response = $this.mollie.CreatePayment([int][math]::Round($amount * 100))
        return $response.IsPaid
    }
}
