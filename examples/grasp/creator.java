class Product {
    private final String name;
    private final double price;

    Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    double getPrice() { return price; }
}

class OrderLine {
    private final Product product;
    private final int quantity;

    OrderLine(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    double subtotal() { return product.getPrice() * quantity; }
}

class Order {
    private final List<OrderLine> lines = new ArrayList<>();

    // Creator: Order contains its lines, so Order creates them.
    void add(Product product, int quantity) {
        lines.add(new OrderLine(product, quantity)); // [!code highlight]
    }
}

// The caller never writes "new OrderLine":
order.add(bike, 1);
