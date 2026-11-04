class CashRegister {
    PaymentMethod* method;                 // the association

public:
    CashRegister(PaymentMethod* method) : method(method) {}

    void checkout(double amount) {
        method->pay(amount);
    }
};

CashRegister cashRegister(new IDeal());
