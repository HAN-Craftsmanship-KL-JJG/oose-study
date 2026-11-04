class Enclosure {
    Keeper* keeper;                     // the association

public:
    Enclosure(Keeper* keeper) : keeper(keeper) {}

    std::string sign() {
        return "Keeper: " + keeper->description();  // A calls B
    }
};
