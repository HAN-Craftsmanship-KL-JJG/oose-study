class Bird {
    void fly() { System.out.println("I fly"); }
}

class Penguin extends Bird {
    @Override
    void fly() {
        throw new UnsupportedOperationException("Penguins do not fly");
    }
}

// This code works for every Bird, until it gets a Penguin.
for (Bird bird : birds) {
    bird.fly();
}
