class OrderLine {
    double price;
    int quantity;

public:
    OrderLine(double price, int quantity) : price(price), quantity(quantity) {}

    double subtotal() { return price * quantity; }
};

class Order {
    // Composition: Order owns its lines. Nobody else gets them.
    std::vector<OrderLine> lines;

public:
    void add(double price, int quantity) {
        // Composition: Order creates its own parts.
        lines.push_back(OrderLine(price, quantity));
    }

    double getTotal() {
        double total = 0;
        for (OrderLine& line : lines) {
            // Delegation: each line works out its own subtotal.
            total += line.subtotal();
        }
        return total;
    }
};

class CashRegister {
public:
    // Delegation without composition: the order comes from outside.
    double amountDue(Order& order) {
        return order.getTotal();
    }
};
