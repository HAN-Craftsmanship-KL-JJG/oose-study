class CashRegister {
public:
    void calculate() {
        IDeal().pay(10);  // no field, and tied to IDeal
    }
};
