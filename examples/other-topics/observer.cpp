class Animal;

// The observer interface: every listener has this one method.
class FeedingObserver {
public:
    virtual void animalFed(Animal& animal) = 0;
};

// The subject: it keeps a list of observers and tells them about a change.
class Animal {
    std::string name;
    std::vector<FeedingObserver*> observers;

public:
    Animal(std::string name) : name(name) {}

    std::string getName() { return name; }

    void subscribe(FeedingObserver* observer) { observers.push_back(observer); }

    void unsubscribe(FeedingObserver* observer) { std::erase(observers, observer); }

    void feed() {
        // ... the keeper gives the food ...
        for (FeedingObserver* observer : observers) {
            observer->animalFed(*this);   // Animal does not know the concrete classes
        }
    }
};

class KeeperApp : public FeedingObserver {
public:
    void animalFed(Animal& animal) override {
        std::cout << "App: " << animal.getName() << " was fed\n";
    }
};

class FeedingLog : public FeedingObserver {
public:
    void animalFed(Animal& animal) override {
        std::cout << "Log: " << animal.getName() << " was fed\n";
    }
};

// Using it
Animal leo("Leo the lion");
leo.subscribe(new KeeperApp());
leo.subscribe(new FeedingLog());
leo.feed();   // both observers get a message
