class Ride;

class RateStrategy {
public:
    virtual double calculate(Ride& ride) = 0;
};

class Ride {
    int minutes;
    RateStrategy* rate;                     // composition: Ride has a strategy [!code highlight]

public:
    Ride(int minutes, RateStrategy* rate) : minutes(minutes), rate(rate) {}

    int getMinutes() { return minutes; }

    double calculatePrice() {
        return rate->calculate(*this);      // delegate to the strategy [!code highlight]
    }
};

class PerMinuteRate : public RateStrategy {
public:
    double calculate(Ride& ride) override {
        return ride.getMinutes() * 0.25;
    }
};

class DailyRate : public RateStrategy {
public:
    double calculate(Ride& ride) override {
        return 15.00;                       // one price for the whole day
    }
};

// The rate is chosen per ride. A new rate is a new class; Ride does not change.
Ride ride(30, new PerMinuteRate());
std::cout << ride.calculatePrice() << "\n";     // 7.5
