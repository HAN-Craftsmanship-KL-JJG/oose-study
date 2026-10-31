// Each class now has one reason to change.
class Ticket {
    double calculatePrice() { ... }
}

class TicketPdfMaker {
    byte[] makePdf(Ticket ticket) { ... }
}

class TicketMailer {
    void send(Ticket ticket, String address) { ... }
}
