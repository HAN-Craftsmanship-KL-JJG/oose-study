// One big interface: every animal must offer everything.
interface Animal {
    void eat();
    void fly();
    void swim();
}

class Lion implements Animal {
    public void eat() { ... }
    public void fly() { throw new UnsupportedOperationException(); }
    public void swim() { throw new UnsupportedOperationException(); }
}
