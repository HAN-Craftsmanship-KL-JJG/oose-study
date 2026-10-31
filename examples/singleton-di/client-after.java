public interface RateSource {
    double getRate(String bikeType);
}

public class PriceCalculator {
    private final RateSource rateSource;

    public PriceCalculator(RateSource rateSource) {   // constructor injection
        this.rateSource = rateSource;
    }

    public double price(Ride ride) {
        double rate = rateSource.getRate(ride.getBikeType());
        return rate * ride.getMinutes();
    }
}

// The real source, used by the application
public class DatabaseRateSource implements RateSource {
    @Override
    public double getRate(String bikeType) {
        return Database.getInstance().getRate(bikeType);
    }
}

// Somewhere at start-up
PriceCalculator calculator = new PriceCalculator(new DatabaseRateSource());
