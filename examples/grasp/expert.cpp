using Date = std::chrono::sys_days;     // a date, counted in days

class Book {
    double finePerDay;

public:
    Book(double finePerDay) : finePerDay(finePerDay) {}

    double getFinePerDay() { return finePerDay; }
};

class Loan {
    Book* book;
    Date dueDate;

public:
    Loan(Book* book, Date dueDate) : book(book), dueDate(dueDate) {}

    // Expert for the fine of one loan: it knows its book and its due date.
    double fine(Date today) {
        long daysLate = (today - dueDate).count();
        return daysLate > 0 ? daysLate * book->getFinePerDay() : 0; // [!code highlight]
    }
};

class Borrower {
    std::vector<Loan*> loans;

public:
    // Expert for the total: Borrower knows all its loans.
    double openFines(Date today) {
        double total = 0;
        for (Loan* loan : loans) total += loan->fine(today); // [!code highlight]
        return total;
    }
};
