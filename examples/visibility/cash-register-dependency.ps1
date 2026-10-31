class CashRegister {
    [void] Calculate() {
        [IDeal]::new().Pay(10)   # no field, and tied to IDeal
    }
}
