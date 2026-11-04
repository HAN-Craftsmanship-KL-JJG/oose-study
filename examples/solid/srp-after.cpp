// Each class now has one reason to change.
class Ticket {
public:
    double calculatePrice() { ... } // [!code highlight]
};

class TicketPdfMaker {
public:
    std::vector<std::byte> makePdf(Ticket& ticket) { ... } // [!code highlight]
};

class TicketMailer {
public:
    void send(Ticket& ticket, std::string address) { ... } // [!code highlight]
};
