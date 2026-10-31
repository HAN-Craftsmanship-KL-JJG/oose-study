public class Keeper {
    private final String name;
    private final String area;

    public Keeper(String name, String area) {
        this.name = name;
        this.area = area;
    }

    public String description() {
        return name + " (" + area + ")";
    }
}

// Two objects of the same class, each with its own data
Keeper a = new Keeper("Anna", "Reptiles");
Keeper b = new Keeper("Ben", "Birds");
System.out.println(a.description());
