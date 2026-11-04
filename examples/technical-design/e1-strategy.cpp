// The chosen design: Strategy. A new tariff is one new class.
class Ride;

class RateStrategy {
public:
    virtual double calculate(Ride& ride) = 0;
};

class Ride {
    RateStrategy* rate;                 // the strategy for this ride
    int minutes;

public:
    Ride(RateStrategy* rate, int minutes) : rate(rate), minutes(minutes) {}

    int getMinutes() { return minutes; }

    double calculatePrice() {
        return rate->calculate(*this);      // delegation + polymorphism
    }
};

class PerMinuteRate : public RateStrategy {
public:
    double calculate(Ride& ride) override { return ride.getMinutes() * 0.25; }
};

class DayRate : public RateStrategy {
public:
    double calculate(Ride& ride) override { return std::ceil(ride.getMinutes() / 1440.0) * 15.00; }
};

// Added later. No existing class changes (Open/Closed Principle).
class StudentSubscription : public RateStrategy {
public:
    double calculate(Ride& ride) override { return std::max(0, ride.getMinutes() - 30) * 0.10; }
};

// Per ride, the app chooses the tariff:
Ride ride(new StudentSubscription(), 45);
std::cout << ride.calculatePrice() << "\n";   // 1.5
