public class Database {
    private static Database instance;        // the one object

    private Database() { }                   // nobody else can call new

    public static Database getInstance() {   // static: call it on the class
        if (instance == null) {
            instance = new Database();
        }
        return instance;
    }

    public double getRate(String bikeType) { ... }
}

// Every caller gets the same object
Database db = Database.getInstance();
