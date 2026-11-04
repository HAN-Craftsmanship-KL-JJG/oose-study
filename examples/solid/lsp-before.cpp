class Bird {
public:
    virtual void fly() { std::cout << "I fly\n"; }
};

class Penguin : public Bird {
public:
    void fly() override {
        throw std::logic_error("Penguins do not fly"); // [!code highlight]
    }
};

// This code works for every Bird, until it gets a Penguin.
for (Bird* bird : birds) {
    bird->fly();
}
