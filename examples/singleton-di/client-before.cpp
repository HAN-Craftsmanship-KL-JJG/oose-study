class PriceCalculator {
public:
    double price(Ride& ride) {
        // Hidden dependency: you cannot see it in the constructor
        // and a test cannot replace it.
        double rate = Database::getInstance()->getRate(ride.getBikeType()); // [!code highlight]
        return rate * ride.getMinutes();
    }
};
