// namespace webshop::domain: the abstraction belongs to the high level
class PaymentProvider {
public:
    virtual bool pay(double amount) = 0;
};

class CashRegister {
    PaymentProvider* provider; // [!code highlight]

public:
    CashRegister(PaymentProvider* provider) : provider(provider) {} // [!code highlight]

    bool checkout(double amount) {
        return provider->pay(amount);
    }
};

// namespace webshop::payment: the detail depends on the abstraction
class MolliePaymentProvider : public PaymentProvider {
    MollieClient mollie;

public:
    bool pay(double amount) override {
        PaymentResponse response = mollie.createPayment(std::lround(amount * 100));
        return response.isPaid();
    }
};

// Somewhere at start-up
CashRegister cashRegister(new MolliePaymentProvider());
