class B {
    hidden [int]$j = 0

    [int] GetJ() { return $this.j }
}

class A {
    hidden [int]$i = 0
    hidden [B]$b

    A([B]$b) { $this.b = $b }

    [void] C() { $this.F() }

    [void] F() {
        Write-Host $this.b.GetJ()   # only B's data
    }
}
