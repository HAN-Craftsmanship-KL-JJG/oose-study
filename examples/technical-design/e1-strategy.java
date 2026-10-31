// The chosen design: Strategy. A new tariff is one new class.
public interface RateStrategy {
    double calculate(Ride ride);
}

public class PerMinuteRate implements RateStrategy {
    public double calculate(Ride ride) { return ride.getMinutes() * 0.25; }
}

public class DayRate implements RateStrategy {
    public double calculate(Ride ride) { return Math.ceil(ride.getMinutes() / 1440.0) * 15.00; }
}

// Added later. No existing class changes (Open/Closed Principle).
public class StudentSubscription implements RateStrategy {
    public double calculate(Ride ride) { return Math.max(0, ride.getMinutes() - 30) * 0.10; }
}

public class Ride {
    private final RateStrategy rate;   // the strategy for this ride
    private final int minutes;

    public Ride(RateStrategy rate, int minutes) {
        this.rate = rate;
        this.minutes = minutes;
    }

    public int getMinutes() { return minutes; }

    public double calculatePrice() {
        return rate.calculate(this);        // delegation + polymorphism
    }
}

// Per ride, the app chooses the tariff:
Ride ride = new Ride(new StudentSubscription(), 45);
System.out.println(ride.calculatePrice());   // 1.5
