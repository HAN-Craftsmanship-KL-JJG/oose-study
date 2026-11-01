// In the user interface: the click handler coordinates the whole system operation itself.
class LoanScreen {
    private final Library library;
    private final TextField cardNumberField = new TextField();
    private final TextField isbnField = new TextField();

    LoanScreen(Library library) {
        this.library = library;
    }

    void onLendClicked() {
        Borrower borrower = library.findBorrower(cardNumberField.getText());
        Book book = library.findBook(isbnField.getText());
        Loan loan = new Loan(borrower, book, LocalDate.now()); // [!code highlight]
        borrower.add(loan); // [!code highlight]
        book.setLent(true); // [!code highlight]
    }
}
