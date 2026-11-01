public interface DiscountRule {
    double discount(Order order);
}

public class CashRegister {
    private final List<DiscountRule> rules;

    public CashRegister(List<DiscountRule> rules) {
        this.rules = rules;
    }

    public double amountDue(Order order) {
        double total = order.getTotal();
        for (DiscountRule rule : rules) {
            total -= rule.discount(order); // [!code highlight]
        }
        return total;
    }
}

// The new promotion "3 for the price of 2" is a new class.
// CashRegister and the other rules do not change.
public class ThreeForTwo implements DiscountRule { // [!code highlight]
    @Override
    public double discount(Order order) {
        double discount = 0;
        for (OrderLine line : order.getLines()) {
            int free = line.getQuantity() / 3;
            discount += free * line.getPrice();
        }
        return discount;
    }
}
