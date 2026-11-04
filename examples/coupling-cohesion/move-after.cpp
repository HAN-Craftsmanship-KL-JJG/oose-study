class B {
    int j = 0;

public:
    void f() {
        std::cout << j << "\n";     // uses its own data
    }
};

class A {
    int i = 0;
    B* b;

public:
    A(B* b) : b(b) {}

    void c() {
        b->f();                     // still one dependency on B
    }
};
