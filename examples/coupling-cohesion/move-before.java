class A {
    private int i;
    private B b;

    public A(B b) {
        this.b = b;
    }

    public void c() {
        f();
    }

    public void f() {
        System.out.println(b.getJ());   // only B's data
    }
}

class B {
    private int j;

    public int getJ() {
        return j;
    }
}
