// Ticket has three reasons to change:
// the price rules, the PDF layout and the email server.
class Ticket {
public:
    double calculatePrice() { ... } // [!code highlight]
    std::vector<std::byte> makePdf() { ... } // [!code highlight]
    void sendByEmail(std::string address) { ... } // [!code highlight]
};
