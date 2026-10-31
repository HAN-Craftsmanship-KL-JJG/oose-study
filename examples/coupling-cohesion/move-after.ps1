class B {
    hidden [int]$j = 0

    [void] F() {
        Write-Host $this.j          # uses its own data
    }
}

class A {
    hidden [int]$i = 0
    hidden [B]$b

    A([B]$b) { $this.b = $b }

    [void] C() {
        $this.b.F()                 # still one dependency on B
    }
}
