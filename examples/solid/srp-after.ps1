# Each class now has one reason to change.
class Ticket {
    [double] CalculatePrice() { return 0 }
}

class TicketPdfMaker {
    [byte[]] MakePdf([Ticket]$ticket) { return @() }
}

class TicketMailer {
    [void] Send([Ticket]$ticket, [string]$address) { }
}
