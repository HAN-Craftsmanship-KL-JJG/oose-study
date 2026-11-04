class Question {
public:
    virtual int points() = 0;
};

// Two normal question types.
class OpenQuestion : public Question {
public:
    int points() override { return 3; }
};

class MultipleChoiceQuestion : public Question {
public:
    int points() override { return 1; }
};

// The decorator: the same interface, and it wraps another Question.
class SourceBonus : public Question { // [!code highlight]
    Question* question;                         // the wrapped question

public:
    SourceBonus(Question* question) : question(question) {}

    int points() override {
        // [!code highlight]
        return question->points() + 2;          // pass the call on, then add something
    }
};

// Decorators can wrap each other, like layers of an onion.
class TimeBonus : public Question {
    Question* question;

public:
    TimeBonus(Question* question) : question(question) {}

    int points() override {
        return question->points() * 2;
    }
};

Question* q1 = new OpenQuestion();                                  // 3 points
Question* q2 = new SourceBonus(new OpenQuestion());                 // 3 + 2 = 5 points
Question* q3 = new TimeBonus(new SourceBonus(new MultipleChoiceQuestion()));  // (1 + 2) * 2 = 6
std::cout << q3->points() << "\n";                                  // 6
