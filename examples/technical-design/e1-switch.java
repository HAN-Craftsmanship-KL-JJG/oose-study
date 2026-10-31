// Alternative 2: one switch in Ride. It works, but every new tariff changes Ride.
public class Ride {
    private final String rateType;   // "minute", "day", ...
    private final int minutes;

    public Ride(String rateType, int minutes) {
        this.rateType = rateType;
        this.minutes = minutes;
    }

    public double calculatePrice() {
        switch (rateType) {
            case "minute":
                return minutes * 0.25;
            case "day":
                return Math.ceil(minutes / 1440.0) * 15.00;
            // A student subscription? Change this method again.
            // A weekend offer? Change it again.
            default:
                throw new IllegalStateException("Unknown rate: " + rateType);
        }
    }
}
