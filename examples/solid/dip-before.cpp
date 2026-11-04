// The high-level class CashRegister depends on a detail from an external library.
class CashRegister {
    MollieClient mollie; // [!code highlight]

public:
    bool checkout(double amount) {
        PaymentResponse response = mollie.createPayment(std::lround(amount * 100));
        return response.isPaid();
    }
};
