class OrderLine {
    private final double price;
    private final int quantity;

    OrderLine(double price, int quantity) {
        this.price = price;
        this.quantity = quantity;
    }

    double subtotal() { return price * quantity; }
}

class Order {
    // Composition: Order owns its lines. Nobody else gets them.
    private final List<OrderLine> lines = new ArrayList<>();

    void add(double price, int quantity) {
        // Composition: Order creates its own parts.
        lines.add(new OrderLine(price, quantity));
    }

    double getTotal() {
        double total = 0;
        for (OrderLine line : lines) {
            // Delegation: each line works out its own subtotal.
            total += line.subtotal();
        }
        return total;
    }
}

class CashRegister {
    // Delegation without composition: the order comes from outside.
    double amountDue(Order order) {
        return order.getTotal();
    }
}
