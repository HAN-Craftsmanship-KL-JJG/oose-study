// Only birds that can fly promise to fly.
class Bird {
public:
    void eat() { std::cout << "I eat\n"; }
};

class FlyingBird : public Bird { // [!code highlight]
public:
    virtual void fly() { std::cout << "I fly\n"; }
};

class Parrot : public FlyingBird {};

class Penguin : public Bird {
public:
    void swim() { std::cout << "I swim\n"; }
};

// Every FlyingBird can really fly, so this loop never fails.
for (FlyingBird* bird : flyingBirds) { // [!code highlight]
    bird->fly();
}
