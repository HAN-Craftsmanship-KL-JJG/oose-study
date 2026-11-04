// Alternative 2: one switch in Ride. It works, but every new tariff changes Ride.
class Ride {
    std::string rateType;   // "minute", "day", ...
    int minutes;

public:
    Ride(std::string rateType, int minutes) : rateType(rateType), minutes(minutes) {}

    double calculatePrice() {
        // C++ cannot switch on a string, so this is a chain of ifs.
        if (rateType == "minute") return minutes * 0.25;
        if (rateType == "day") return std::ceil(minutes / 1440.0) * 15.00;
        // A student subscription? Change this method again.
        // A weekend offer? Change it again.
        throw std::logic_error("Unknown rate: " + rateType);
    }
};
