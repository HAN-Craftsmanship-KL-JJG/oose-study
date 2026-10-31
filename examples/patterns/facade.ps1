# A subsystem with several classes.
class TicketService {
    [bool] IsAvailable([string]$date) { return $true }
    [void] Reserve([string]$date) { }
}

class PaymentService {
    [bool] Pay([string]$visitorId, [double]$amount) { return $true }
}

class TourService {
    [void] Book([string]$date, [string]$visitorId) { }
}

# The facade: one simple entry to the whole subsystem.
class ZooDesk {
    hidden [TicketService]$tickets = [TicketService]::new()
    hidden [PaymentService]$payment = [PaymentService]::new()
    hidden [TourService]$tours = [TourService]::new()

    [bool] BookVisit([string]$visitorId, [string]$date, [double]$price) {
        if (-not $this.tickets.IsAvailable($date)) { return $false }
        if (-not $this.payment.Pay($visitorId, $price)) { return $false }
        $this.tickets.Reserve($date)
        $this.tours.Book($date, $visitorId)
        return $true
    }
}

# The user interface only knows ZooDesk.
[ZooDesk]::new().BookVisit("v7", "2026-11-14", 24.50)
