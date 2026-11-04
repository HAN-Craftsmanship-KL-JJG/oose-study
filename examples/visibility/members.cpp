class Keeper {
public:
    std::string name;             // +  everywhere
protected:
    int badgeNumber;              // #  Keeper and its subclasses
private:
    int pinCode;                  // -  only Keeper
                                  // ~  C++ has no package level

public:
    void feed() {}
private:
    void checkBadge() {}
};
