// Only birds that can fly promise to fly.
class Bird {
    void eat() { System.out.println("I eat"); }
}

class FlyingBird extends Bird {
    void fly() { System.out.println("I fly"); }
}

class Parrot extends FlyingBird { }

class Penguin extends Bird {
    void swim() { System.out.println("I swim"); }
}

// Every FlyingBird can really fly, so this loop never fails.
for (FlyingBird bird : flyingBirds) {
    bird.fly();
}
