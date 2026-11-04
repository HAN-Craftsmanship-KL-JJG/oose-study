#include <gtest/gtest.h>

// A stub: always the same rate, no database needed
class FixedRateSource : public RateSource {
    double rate;

public:
    FixedRateSource(double rate) : rate(rate) {}

    double getRate(std::string bikeType) override {
        return rate;
    }
};

TEST(PriceCalculatorTest, PriceIsRateTimesMinutes) {
    FixedRateSource stub(0.25);
    // [!code highlight]
    PriceCalculator calculator(&stub);
    Ride ride("e-bike", 30);

    EXPECT_NEAR(7.5, calculator.price(ride), 0.001);
}
