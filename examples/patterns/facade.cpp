// A subsystem with several classes.
class TicketService {
public:
    bool isAvailable(std::string date) { return true; }
    void reserve(std::string date) {}
};

class PaymentService {
public:
    bool pay(std::string visitorId, double amount) { return true; }
};

class TourService {
public:
    void book(std::string date, std::string visitorId) {}
};

// The facade: one simple entry to the whole subsystem.
class ZooDesk {
    TicketService tickets;
    PaymentService payment;
    TourService tours;

public:
    bool bookVisit(std::string visitorId, std::string date, double price) { // [!code highlight]
        if (!tickets.isAvailable(date)) return false;
        if (!payment.pay(visitorId, price)) return false;
        tickets.reserve(date);
        tours.book(date, visitorId);
        return true;
    }
};

// The user interface only knows ZooDesk.
ZooDesk().bookVisit("v7", "2026-11-14", 24.50);
