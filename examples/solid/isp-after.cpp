// Small interfaces: a class implements only what it can do.
class Animal {
public:
    virtual void eat() = 0;
};

class Flyer {
public:
    virtual void fly() = 0;
};

class Swimmer {
public:
    virtual void swim() = 0;
};

class Lion : public Animal { // [!code highlight]
public:
    void eat() override { ... }
};

class Duck : public Animal, public Flyer, public Swimmer { // [!code highlight]
public:
    void eat() override { ... }
    void fly() override { ... }
    void swim() override { ... }
};
