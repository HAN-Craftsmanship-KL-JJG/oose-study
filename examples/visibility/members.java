public class Keeper {
    public String name;           // +  everywhere
    protected int badgeNumber;    // #  package and subclasses
    int age;                      // ~  package only
    private int pinCode;          // -  only Keeper

    public void feed() { }
    private void checkBadge() { }
}
