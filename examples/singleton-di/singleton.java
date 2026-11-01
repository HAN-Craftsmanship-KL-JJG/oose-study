public class Database {
    private static Database instance;        // the one object [!code highlight]

    private Database() { }                   // nobody else can call new [!code highlight]

    public static Database getInstance() {   // static: call it on the class [!code highlight]
        if (instance == null) {
            instance = new Database();
        }
        return instance;
    }

    public double getRate(String bikeType) { ... }
}

// Every caller gets the same object
Database db = Database.getInstance();
