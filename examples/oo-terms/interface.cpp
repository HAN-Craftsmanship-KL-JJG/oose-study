class Animal {
public:
    virtual std::string makeSound() = 0;
};

class Lion : public Animal {
public:
    std::string makeSound() override {
        return "Roar";
    }
};

class Penguin : public Animal {
public:
    std::string makeSound() override {
        return "Squawk";
    }
};
