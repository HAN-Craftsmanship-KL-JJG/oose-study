// Every new promotion means a change in CashRegister.
class CashRegister {
    double amountDue(Order order, String promotion) {
        double total = order.getTotal();
        switch (promotion) { // [!code highlight]
            case "TEN_PERCENT" -> total = total * 0.9;
            case "FIVE_EURO" -> total = total - 5;
            // "3 for the price of 2"? Open CashRegister and add a case.
        }
        return total;
    }
}
