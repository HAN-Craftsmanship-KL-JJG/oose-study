// Small interfaces: a class implements only what it can do.
interface Animal {
    void eat();
}

interface Flyer {
    void fly();
}

interface Swimmer {
    void swim();
}

class Lion implements Animal { // [!code highlight]
    public void eat() { ... }
}

class Duck implements Animal, Flyer, Swimmer { // [!code highlight]
    public void eat() { ... }
    public void fly() { ... }
    public void swim() { ... }
}
