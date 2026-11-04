// In the user interface: the click handler coordinates the whole system operation itself.
class LoanScreen {
    Library* library;
    TextField cardNumberField;
    TextField isbnField;

public:
    LoanScreen(Library* library) : library(library) {}

    void onLendClicked() {
        Borrower* borrower = library->findBorrower(cardNumberField.getText());
        Book* book = library->findBook(isbnField.getText());
        Loan* loan = new Loan(borrower, book, today()); // [!code highlight]
        borrower->add(loan); // [!code highlight]
        book->setLent(true); // [!code highlight]
    }
};
