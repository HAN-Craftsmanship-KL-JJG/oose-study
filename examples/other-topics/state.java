// Each state is a class. A method returns the next state.
interface EnclosureState {
    EnclosureState open();
    EnclosureState close();
}

class ClosedState implements EnclosureState {
    public EnclosureState open() {
        System.out.println("The gate opens, visitors may enter");
        return new OpenState();
    }

    public EnclosureState close() {
        System.out.println("The enclosure is already closed");
        return this;
    }
}

class OpenState implements EnclosureState {
    public EnclosureState open() {
        System.out.println("The enclosure is already open");
        return this;
    }

    public EnclosureState close() {
        System.out.println("The gate closes, the keeper counts the animals");
        return new ClosedState();
    }
}

// The context: it delegates to its current state. No if or switch on the state.
class Enclosure {
    private EnclosureState state = new ClosedState();

    void open() { state = state.open(); }

    void close() { state = state.close(); }
}
