class Book {
    [double]$FinePerDay

    Book([double]$finePerDay) { $this.FinePerDay = $finePerDay }
}

class Loan {
    hidden [Book]$book
    hidden [datetime]$dueDate

    Loan([Book]$book, [datetime]$dueDate) {
        $this.book = $book
        $this.dueDate = $dueDate
    }

    # Expert for the fine of one loan: it knows its book and its due date.
    [double] Fine([datetime]$today) {
        $daysLate = ($today.Date - $this.dueDate.Date).Days
        if ($daysLate -le 0) { return 0 }
        return $daysLate * $this.book.FinePerDay # [!code highlight]
    }
}

class Borrower {
    hidden [System.Collections.Generic.List[Loan]]$loans =
        [System.Collections.Generic.List[Loan]]::new()

    # Expert for the total: Borrower knows all its loans.
    [double] OpenFines([datetime]$today) {
        $total = 0.0
        foreach ($loan in $this.loans) { $total += $loan.Fine($today) } # [!code highlight]
        return $total
    }
}
