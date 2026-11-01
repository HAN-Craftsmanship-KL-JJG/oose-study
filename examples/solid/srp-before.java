// Ticket has three reasons to change:
// the price rules, the PDF layout and the email server.
class Ticket {
    double calculatePrice() { ... } // [!code highlight]
    byte[] makePdf() { ... } // [!code highlight]
    void sendByEmail(String address) { ... } // [!code highlight]
}
