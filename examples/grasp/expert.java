class Book {
    private final double finePerDay;

    Book(double finePerDay) { this.finePerDay = finePerDay; }

    double getFinePerDay() { return finePerDay; }
}

class Loan {
    private final Book book;
    private final LocalDate dueDate;

    Loan(Book book, LocalDate dueDate) {
        this.book = book;
        this.dueDate = dueDate;
    }

    // Expert for the fine of one loan: it knows its book and its due date.
    double fine(LocalDate today) {
        long daysLate = ChronoUnit.DAYS.between(dueDate, today);
        return daysLate > 0 ? daysLate * book.getFinePerDay() : 0; // [!code highlight]
    }
}

class Borrower {
    private final List<Loan> loans = new ArrayList<>();

    // Expert for the total: Borrower knows all its loans.
    double openFines(LocalDate today) {
        double total = 0;
        for (Loan loan : loans) total += loan.fine(today); // [!code highlight]
        return total;
    }
}
