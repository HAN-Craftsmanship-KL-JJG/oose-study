class CashRegister {
    private PaymentMethod method;          // the association

    CashRegister(PaymentMethod method) {
        this.method = method;
    }

    void checkout(double amount) {
        method.pay(amount);
    }
}

CashRegister register = new CashRegister(new IDeal());
