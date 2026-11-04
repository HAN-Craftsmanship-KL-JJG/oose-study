class RateSource {
public:
    virtual double getRate(std::string bikeType) = 0;
};

class PriceCalculator {
    RateSource* rateSource;

public:
    // constructor injection
    PriceCalculator(RateSource* rateSource) : rateSource(rateSource) {} // [!code highlight]

    double price(Ride& ride) {
        double rate = rateSource->getRate(ride.getBikeType()); // [!code highlight]
        return rate * ride.getMinutes();
    }
};

// The real source, used by the application
class DatabaseRateSource : public RateSource {
public:
    double getRate(std::string bikeType) override {
        return Database::getInstance()->getRate(bikeType);
    }
};

// Somewhere at start-up
PriceCalculator calculator(new DatabaseRateSource());
