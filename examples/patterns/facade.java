// A subsystem with several classes.
class TicketService {
    boolean isAvailable(String date) { return true; }
    void reserve(String date) { }
}

class PaymentService {
    boolean pay(String visitorId, double amount) { return true; }
}

class TourService {
    void book(String date, String visitorId) { }
}

// The facade: one simple entry to the whole subsystem.
public class ZooDesk {
    private final TicketService tickets = new TicketService();
    private final PaymentService payment = new PaymentService();
    private final TourService tours = new TourService();

    public boolean bookVisit(String visitorId, String date, double price) {
        if (!tickets.isAvailable(date)) return false;
        if (!payment.pay(visitorId, price)) return false;
        tickets.reserve(date);
        tours.book(date, visitorId);
        return true;
    }
}

// The user interface only knows ZooDesk.
new ZooDesk().bookVisit("v7", "2026-11-14", 24.50);
