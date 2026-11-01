// Each class now has one reason to change.
class Ticket {
    double calculatePrice() { ... } // [!code highlight]
}

class TicketPdfMaker {
    byte[] makePdf(Ticket ticket) { ... } // [!code highlight]
}

class TicketMailer {
    void send(Ticket ticket, String address) { ... } // [!code highlight]
}
