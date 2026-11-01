// package nl.han.webshop.domain: the abstraction belongs to the high level
public interface PaymentProvider {
    boolean pay(double amount);
}

public class CashRegister {
    private final PaymentProvider provider; // [!code highlight]

    public CashRegister(PaymentProvider provider) { // [!code highlight]
        this.provider = provider;
    }

    public boolean checkout(double amount) {
        return provider.pay(amount);
    }
}

// package nl.han.webshop.payment: the detail depends on the abstraction
public class MolliePaymentProvider implements PaymentProvider {
    private final MollieClient mollie = new MollieClient();

    @Override
    public boolean pay(double amount) {
        PaymentResponse response = mollie.createPayment((int) Math.round(amount * 100));
        return response.isPaid();
    }
}

// Somewhere at start-up
CashRegister register = new CashRegister(new MolliePaymentProvider());
