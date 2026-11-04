public interface AnswerKey {
    String answer(int question);
}

// The real object: it knows the answers.
public class AnswerFile implements AnswerKey {
    private final Map<Integer, String> answers = Map.of(1, "B", 2, "D");

    public String answer(int question) { return answers.get(question); }
}

// The proxy: the same interface, and it checks the access first.
public class TeacherOnlyAnswerKey implements AnswerKey { // [!code highlight]
    private final AnswerKey real;
    private final boolean teacher;

    public TeacherOnlyAnswerKey(AnswerKey real, boolean teacher) {
        this.real = real;
        this.teacher = teacher;
    }

    @Override
    public String answer(int question) {
        if (!teacher) return "No access";      // the check
        // [!code highlight]
        return real.answer(question);          // pass the call on
    }
}

// The client only knows the interface.
AnswerKey file = new AnswerFile();
AnswerKey forStudent = new TeacherOnlyAnswerKey(file, false);
AnswerKey forTeacher = new TeacherOnlyAnswerKey(file, true);
System.out.println(forStudent.answer(1));      // No access
System.out.println(forTeacher.answer(1));      // B
