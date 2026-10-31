// The high-level class CashRegister depends on a detail from an external library.
class CashRegister {
    private final MollieClient mollie = new MollieClient();

    boolean checkout(double amount) {
        PaymentResponse response = mollie.createPayment((int) Math.round(amount * 100));
        return response.isPaid();
    }
}
