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
        return Math.ceil(ride.getMinutes() / 1440.0) * 15.00;
    }
}

public class Ride {
    private final LocalDateTime startTime;
    private final LocalDateTime endTime;
    private final RateStrategy rate;        // composition: Ride has a strategy

    public Ride(LocalDateTime startTime, LocalDateTime endTime, RateStrategy rate) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.rate = rate;
    }

    public int getMinutes() {
        return (int) Duration.between(startTime, endTime).toMinutes();
    }

    public double calculatePrice() {
        return rate.calculate(this);        // delegate to the strategy
    }
}

// The rate is chosen per ride. A new rate is a new class; Ride does not change.
Ride ride = new Ride(start, end, new PerMinuteRate());
System.out.println(ride.calculatePrice());
