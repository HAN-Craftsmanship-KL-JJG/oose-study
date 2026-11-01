import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class PriceCalculatorTest {

    // A stub: always the same rate, no database needed
    static class FixedRateSource implements RateSource {
        private final double rate;

        FixedRateSource(double rate) {
            this.rate = rate;
        }

        @Override
        public double getRate(String bikeType) {
            return rate;
        }
    }

    @Test
    void priceIsRateTimesMinutes() {
        // [!code highlight]
        PriceCalculator calculator = new PriceCalculator(new FixedRateSource(0.25));
        Ride ride = new Ride("e-bike", 30);

        assertEquals(7.5, calculator.price(ride), 0.001);
    }
}
