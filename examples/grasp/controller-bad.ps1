# In the user interface: the click handler coordinates the whole system operation itself.
class LoanScreen {
    hidden [Library]$library
    [string]$CardNumberField
    [string]$IsbnField

    LoanScreen([Library]$library) {
        $this.library = $library
    }

    [void] OnLendClicked() {
        $borrower = $this.library.FindBorrower($this.CardNumberField)
        $book = $this.library.FindBook($this.IsbnField)
        $loan = [Loan]::new($borrower, $book, (Get-Date)) # [!code highlight]
        $borrower.Add($loan) # [!code highlight]
        $book.SetLent($true) # [!code highlight]
    }
}
