# Every new promotion means a change in CashRegister.
class CashRegister {
    [double] AmountDue([Order]$order, [string]$promotion) {
        $total = $order.GetTotal()
        switch ($promotion) { # [!code highlight]
            "TEN_PERCENT" { $total = $total * 0.9 }
            "FIVE_EURO" { $total = $total - 5 }
            # "3 for the price of 2"? Open CashRegister and add a case.
        }
        return $total
    }
}
