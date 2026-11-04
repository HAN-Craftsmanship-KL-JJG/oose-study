class FoodStore {
    double stockKg = 0;   // private: only FoodStore can change this

public:
    void add(double kg) {
        if (kg <= 0) throw std::invalid_argument("Amount must be positive");
        stockKg += kg;
    }

    void take(double kg) {
        if (kg > stockKg) throw std::logic_error("Not enough food");
        stockKg -= kg;
    }

    double getStockKg() {
        return stockKg;
    }
};
