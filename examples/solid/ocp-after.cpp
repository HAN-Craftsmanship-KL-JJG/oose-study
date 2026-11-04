class DiscountRule {
public:
    virtual double discount(Order& order) = 0;
};

class CashRegister {
    std::vector<DiscountRule*> rules;

public:
    CashRegister(std::vector<DiscountRule*> rules) : rules(rules) {}

    double amountDue(Order& order) {
        double total = order.getTotal();
        for (DiscountRule* rule : rules) {
            total -= rule->discount(order); // [!code highlight]
        }
        return total;
    }
};

// The new promotion "3 for the price of 2" is a new class.
// CashRegister and the other rules do not change.
class ThreeForTwo : public DiscountRule { // [!code highlight]
public:
    double discount(Order& order) override {
        double discount = 0;
        for (OrderLine& line : order.getLines()) {
            int free = line.getQuantity() / 3;
            discount += free * line.getPrice();
        }
        return discount;
    }
};
