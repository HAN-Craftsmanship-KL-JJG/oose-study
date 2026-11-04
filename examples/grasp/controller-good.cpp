// The user interface only passes the input on to the controller.
class LoanScreen {
    Library* library;
    TextField cardNumberField;
    TextField isbnField;

public:
    LoanScreen(Library* library) : library(library) {}

    void onLendClicked() {
        library->lend(cardNumberField.getText(), isbnField.getText()); // [!code highlight]
    }
};

// The controller in the domain layer coordinates the system operation.
class Library {
    std::map<std::string, Borrower*> borrowers;
    std::map<std::string, Book*> books;

public:
    void lend(std::string cardNumber, std::string isbn) {
        Borrower* borrower = borrowers.at(cardNumber);
        Book* book = books.at(isbn);
        borrower->borrow(book);   // Borrower creates the Loan (Creator)
    }
};
