public interface RateStrategy {
    double calculate(Ride ride);
}

public class PerMinuteRate implements RateStrategy {
    @Override
    public double calculate(Ride ride) {
        return ride.getMinutes() * 0.25;
    }
}

public class DailyRate implements RateStrategy {
    @Override
    public double calculate(Ride ride) {
        return 15.00;                       // one price for the whole day
    }
}

public class Ride {
    private final int minutes;
    private final RateStrategy rate;        // composition: Ride has a strategy [!code highlight]

    public Ride(int minutes, RateStrategy rate) {
        this.minutes = minutes;
        this.rate = rate;
    }

    public int getMinutes() {
        return minutes;
    }

    public double calculatePrice() {
        return rate.calculate(this);        // delegate to the strategy [!code highlight]
    }
}

// The rate is chosen per ride. A new rate is a new class; Ride does not change.
Ride ride = new Ride(30, new PerMinuteRate());
System.out.println(ride.calculatePrice());      // 7.5
