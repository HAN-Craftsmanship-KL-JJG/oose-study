class Product {
    std::string name;
    double price;

public:
    Product(std::string name, double price) : name(name), price(price) {}

    double getPrice() { return price; }
};

class OrderLine {
    Product* product;
    int quantity;

public:
    OrderLine(Product* product, int quantity) : product(product), quantity(quantity) {}

    double subtotal() { return product->getPrice() * quantity; }
};

class Order {
    std::vector<OrderLine> lines;

public:
    // Creator: Order contains its lines, so Order creates them.
    void add(Product* product, int quantity) {
        lines.push_back(OrderLine(product, quantity)); // [!code highlight]
    }
};

// The caller never writes "OrderLine(...)":
order.add(bike, 1);
