// The observer interface: every listener has this one method.
interface FeedingObserver {
    void animalFed(Animal animal);
}

// The subject: it keeps a list of observers and tells them about a change.
class Animal {
    private final String name;
    private final List<FeedingObserver> observers = new ArrayList<>();

    Animal(String name) { this.name = name; }

    String getName() { return name; }

    void subscribe(FeedingObserver observer) { observers.add(observer); }

    void unsubscribe(FeedingObserver observer) { observers.remove(observer); }

    void feed() {
        // ... the keeper gives the food ...
        for (FeedingObserver observer : observers) {
            observer.animalFed(this);   // Animal does not know the concrete classes
        }
    }
}

class KeeperApp implements FeedingObserver {
    public void animalFed(Animal animal) {
        System.out.println("App: " + animal.getName() + " was fed");
    }
}

class FeedingLog implements FeedingObserver {
    public void animalFed(Animal animal) {
        System.out.println("Log: " + animal.getName() + " fed at " + LocalTime.now());
    }
}

// Using it
Animal leo = new Animal("Leo the lion");
leo.subscribe(new KeeperApp());
leo.subscribe(new FeedingLog());
leo.feed();   // both observers get a message
