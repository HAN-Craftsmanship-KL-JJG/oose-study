# Each class now has one reason to change.
class Ticket {
    [double] CalculatePrice() { return 0 } # [!code highlight]
}

class TicketPdfMaker {
    [byte[]] MakePdf([Ticket]$ticket) { return @() } # [!code highlight]
}

class TicketMailer {
    [void] Send([Ticket]$ticket, [string]$address) { } # [!code highlight]
}
