public interface Animal {
    String makeSound();
}

public class Lion implements Animal {
    @Override
    public String makeSound() {
        return "Roar";
    }
}

public class Penguin implements Animal {
    @Override
    public String makeSound() {
        return "Squawk";
    }
}
