public interface QuestionStorage {
    void save(String id, String text);
    String load(String id);
}

// The real storage.
public class FlatFileQuestionStorage implements QuestionStorage {
    private final Map<String, String> file = new HashMap<>();   // stands in for a text file

    public void save(String id, String text) { file.put(id, text); }
    public String load(String id) { return file.get(id); }
}

// The proxy: the same interface, and it stands in front of the real object.
public class EncryptingQuestionStorage implements QuestionStorage { // [!code highlight]
    private final QuestionStorage real;

    public EncryptingQuestionStorage(QuestionStorage real) {
        this.real = real;
    }

    @Override
    public void save(String id, String text) {
        // [!code highlight]
        real.save(id, encrypt(text));           // extra work, then pass the call on
    }

    @Override
    public String load(String id) {
        return decrypt(real.load(id));
    }

    // Base64 stands in for real encryption in this example.
    private String encrypt(String t) { return Base64.getEncoder().encodeToString(t.getBytes()); }
    private String decrypt(String t) { return new String(Base64.getDecoder().decode(t)); }
}

// The client cannot tell the difference.
QuestionStorage storage = new EncryptingQuestionStorage(new FlatFileQuestionStorage());
storage.save("q1", "What is polymorphism?");
