# Ticket has three reasons to change:
# the price rules, the PDF layout and the email server.
class Ticket {
    [double] CalculatePrice() { return 0 }
    [byte[]] MakePdf() { return @() }
    [void] SendByEmail([string]$address) { }
}
