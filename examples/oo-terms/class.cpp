class Keeper {
    std::string name;
    std::string area;

public:
    Keeper(std::string name, std::string area) : name(name), area(area) {}

    std::string description() {
        return name + " (" + area + ")";
    }
};

// Two objects of the same class, each with its own data
Keeper a("Anna", "Reptiles");
Keeper b("Ben", "Birds");
std::cout << a.description() << "\n";
