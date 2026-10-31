public class Bird {
    private final String name;          // private: Penguin cannot use it directly

    public Bird(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

public class Penguin extends Bird {
    private int dives;

    public Penguin(String name) {
        super(name);
    }

    public String dive() {
        dives++;
        return getName() + " dives, dive " + dives;   // inherited method
    }
}
