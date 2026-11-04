class Bird {
    std::string name;                   // private: Penguin cannot use it directly

public:
    Bird(std::string name) : name(name) {}

    std::string getName() {
        return name;
    }
};

class Penguin : public Bird {
    int dives = 0;

public:
    Penguin(std::string name) : Bird(name) {}

    std::string dive() {
        dives++;
        return getName() + " dives, dive " + std::to_string(dives);   // inherited method
    }
};
