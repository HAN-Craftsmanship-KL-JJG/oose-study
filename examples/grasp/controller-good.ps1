# The user interface only passes the input on to the controller.
class LoanScreen {
    hidden [Library]$library
    [string]$CardNumberField
    [string]$IsbnField

    LoanScreen([Library]$library) {
        $this.library = $library
    }

    [void] OnLendClicked() {
        $this.library.Lend($this.CardNumberField, $this.IsbnField) # [!code highlight]
    }
}

# The controller in the domain layer coordinates the system operation.
class Library {
    hidden [hashtable]$borrowers = @{}
    hidden [hashtable]$books = @{}

    [void] Lend([string]$cardNumber, [string]$isbn) {
        $borrower = $this.borrowers[$cardNumber]
        $book = $this.books[$isbn]
        $borrower.Borrow($book)   # Borrower creates the Loan (Creator)
    }
}
