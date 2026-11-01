// The user interface only passes the input on to the controller.
class LoanScreen {
    private final Library library;
    private final TextField cardNumberField = new TextField();
    private final TextField isbnField = new TextField();

    LoanScreen(Library library) {
        this.library = library;
    }

    void onLendClicked() {
        library.lend(cardNumberField.getText(), isbnField.getText()); // [!code highlight]
    }
}

// The controller in the domain layer coordinates the system operation.
class Library {
    private final Map<String, Borrower> borrowers = new HashMap<>();
    private final Map<String, Book> books = new HashMap<>();

    public void lend(String cardNumber, String isbn) {
        Borrower borrower = borrowers.get(cardNumber);
        Book book = books.get(isbn);
        borrower.borrow(book);   // Borrower creates the Loan (Creator)
    }
}
