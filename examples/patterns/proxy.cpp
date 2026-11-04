class AnswerKey {
public:
    virtual std::string answer(int question) = 0;
};

// The real object: it knows the answers.
class AnswerFile : public AnswerKey {
    std::map<int, std::string> answers = {{1, "B"}, {2, "D"}};

public:
    std::string answer(int question) override { return answers[question]; }
};

// The proxy: the same interface, and it checks the access first.
class TeacherOnlyAnswerKey : public AnswerKey { // [!code highlight]
    AnswerKey* real;
    bool teacher;

public:
    TeacherOnlyAnswerKey(AnswerKey* real, bool teacher) : real(real), teacher(teacher) {}

    std::string answer(int question) override {
        if (!teacher) return "No access";      // the check
        // [!code highlight]
        return real->answer(question);         // pass the call on
    }
};

// The client only knows the interface.
AnswerKey* file = new AnswerFile();
AnswerKey* forStudent = new TeacherOnlyAnswerKey(file, false);
AnswerKey* forTeacher = new TeacherOnlyAnswerKey(file, true);
std::cout << forStudent->answer(1) << "\n";    // No access
std::cout << forTeacher->answer(1) << "\n";    // B
