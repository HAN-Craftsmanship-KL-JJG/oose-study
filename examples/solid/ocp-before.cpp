// Every new promotion means a change in CashRegister.
class CashRegister {
public:
    double amountDue(Order& order, std::string promotion) {
        double total = order.getTotal();
        if (promotion == "TEN_PERCENT") total = total * 0.9; // [!code highlight]
        else if (promotion == "FIVE_EURO") total = total - 5;
        // "3 for the price of 2"? Open CashRegister and add an else if.
        return total;
    }
};
