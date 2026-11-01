# Ticket has three reasons to change:
# the price rules, the PDF layout and the email server.
class Ticket {
    [double] CalculatePrice() { return 0 } # [!code highlight]
    [byte[]] MakePdf() { return @() } # [!code highlight]
    [void] SendByEmail([string]$address) { } # [!code highlight]
}
