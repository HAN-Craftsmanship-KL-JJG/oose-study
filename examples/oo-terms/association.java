public class Enclosure {
    private final Keeper keeper;        // the association

    public Enclosure(Keeper keeper) {
        this.keeper = keeper;
    }

    public String sign() {
        return "Keeper: " + keeper.description();   // A calls B
    }
}
