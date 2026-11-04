// Each state is a class. A method returns the next state.
class EnclosureState {
public:
    virtual EnclosureState* open() = 0;
    virtual EnclosureState* close() = 0;
};

class ClosedState : public EnclosureState {
public:
    EnclosureState* open() override;
    EnclosureState* close() override;
};

class OpenState : public EnclosureState {
public:
    EnclosureState* open() override;
    EnclosureState* close() override;
};

EnclosureState* ClosedState::open() {
    std::cout << "The gate opens, visitors may enter\n";
    return new OpenState();
}

EnclosureState* ClosedState::close() {
    std::cout << "The enclosure is already closed\n";
    return this;
}

EnclosureState* OpenState::open() {
    std::cout << "The enclosure is already open\n";
    return this;
}

EnclosureState* OpenState::close() {
    std::cout << "The gate closes, the keeper counts the animals\n";
    return new ClosedState();
}

// The context: it delegates to its current state. No if or switch on the state.
class Enclosure {
    EnclosureState* state = new ClosedState();

public:
    void open() { state = state->open(); }

    void close() { state = state->close(); }
};
