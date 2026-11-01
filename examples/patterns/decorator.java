public interface Question {
    int points();
}

// Two normal question types.
public class OpenQuestion implements Question {
    public int points() { return 3; }
}

public class MultipleChoiceQuestion implements Question {
    public int points() { return 1; }
}

// The decorator: the same interface, and it wraps another Question.
public class SourceBonus implements Question { // [!code highlight]
    private final Question question;            // the wrapped question

    public SourceBonus(Question question) {
        this.question = question;
    }

    @Override
    public int points() {
        // [!code highlight]
        return question.points() + 2;           // pass the call on, then add something
    }
}

// Decorators can wrap each other, like layers of an onion.
public class TimeBonus implements Question {
    private final Question question;

    public TimeBonus(Question question) {
        this.question = question;
    }

    @Override
    public int points() {
        return question.points() * 2;
    }
}

Question q1 = new OpenQuestion();                                   // 3 points
Question q2 = new SourceBonus(new OpenQuestion());                  // 3 + 2 = 5 points
Question q3 = new TimeBonus(new SourceBonus(new MultipleChoiceQuestion()));   // (1 + 2) * 2 = 6
