class Database {
    static inline Database* instance = nullptr; // the one object [!code highlight]

    Database() {}                       // private: nobody else can call new [!code highlight]

public:
    static Database* getInstance() {    // static: call it on the class [!code highlight]
        if (instance == nullptr) {
            instance = new Database();
        }
        return instance;
    }

    double getRate(std::string bikeType) { ... }
};

// Every caller gets the same object
Database* db = Database::getInstance();
