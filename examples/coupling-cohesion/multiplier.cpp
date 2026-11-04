class Calculator {
public:
    int mul(int i, int j) {
        return i * j;
    }
};

class Multiplier {
public:
    int i;
    int j;

    Multiplier(int i, int j) : i(i), j(j) {}

    int calculate() {
        return Calculator().mul(i, j);
    }
};
