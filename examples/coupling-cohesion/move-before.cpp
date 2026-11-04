class B {
    int j = 0;

public:
    int getJ() {
        return j;
    }
};

class A {
    int i = 0;
    B* b;

public:
    A(B* b) : b(b) {}

    void c() {
        f();
    }

    void f() {
        std::cout << b->getJ() << "\n";   // only B's data
    }
};
