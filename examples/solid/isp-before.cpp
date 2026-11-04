// One big interface: every animal must offer everything.
class Animal {
public:
    virtual void eat() = 0;
    virtual void fly() = 0;
    virtual void swim() = 0;
};

class Lion : public Animal {
public:
    void eat() override { ... }
    void fly() override { throw std::logic_error("Lions do not fly"); } // [!code highlight]
    void swim() override { throw std::logic_error("Lions do not swim"); } // [!code highlight]
};
