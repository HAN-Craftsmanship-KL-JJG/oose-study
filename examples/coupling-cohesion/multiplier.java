class Multiplier {
    public int i;
    public int j;

    public Multiplier(int i, int j) {
        this.i = i;
        this.j = j;
    }

    public int calculate() {
        return new Calculator().mul(i, j);
    }
}

class Calculator {
    public int mul(int i, int j) {
        return i * j;
    }
}
