class A {
    private int i;
    private B b;

    public A(B b) {
        this.b = b;
    }

    public void c() {
        b.f();                      // still one dependency on B
    }
}

class B {
    private int j;

    public void f() {
        System.out.println(j);      // uses its own data
    }
}
