public class FoodStore {
    private double stockKg;   // only FoodStore can change this

    public void add(double kg) {
        if (kg <= 0) throw new IllegalArgumentException("Amount must be positive");
        stockKg += kg;
    }

    public void take(double kg) {
        if (kg > stockKg) throw new IllegalStateException("Not enough food");
        stockKg -= kg;
    }

    public double getStockKg() {
        return stockKg;
    }
}
