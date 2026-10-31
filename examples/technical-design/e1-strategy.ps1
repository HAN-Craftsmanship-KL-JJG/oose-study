# The chosen design: Strategy. A new tariff is one new class.
# PowerShell has no interfaces of its own, so the base class throws.
class RateStrategy {
    [double] Calculate([object]$ride) { throw [System.NotImplementedException]::new("Calculate") }
}

class PerMinuteRate : RateStrategy {
    [double] Calculate([object]$ride) { return $ride.GetMinutes() * 0.25 }
}

class DayRate : RateStrategy {
    [double] Calculate([object]$ride) { return [math]::Ceiling($ride.GetMinutes() / 1440) * 15.00 }
}

# Added later. No existing class changes (Open/Closed Principle).
class StudentSubscription : RateStrategy {
    [double] Calculate([object]$ride) { return [math]::Max(0, $ride.GetMinutes() - 30) * 0.10 }
}

class Ride {
    hidden [RateStrategy]$rate   # the strategy for this ride
    hidden [int]$minutes

    Ride([RateStrategy]$rate, [int]$minutes) {
        $this.rate = $rate
        $this.minutes = $minutes
    }

    [int] GetMinutes() { return $this.minutes }

    [double] CalculatePrice() {
        return $this.rate.Calculate($this)   # delegation + polymorphism
    }
}

# Per ride, the app chooses the tariff:
$ride = [Ride]::new([StudentSubscription]::new(), 45)
$ride.CalculatePrice()   # 1.5
