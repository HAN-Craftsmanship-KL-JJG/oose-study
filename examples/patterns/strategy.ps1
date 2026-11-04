class RateStrategy {
    [double] Calculate([Ride]$ride) {
        throw [System.NotImplementedException]::new("Calculate")
    }
}

class PerMinuteRate : RateStrategy {
    [double] Calculate([Ride]$ride) {
        return $ride.GetMinutes() * 0.25
    }
}

class DailyRate : RateStrategy {
    [double] Calculate([Ride]$ride) {
        return 15.00                        # one price for the whole day
    }
}

class Ride {
    hidden [int]$minutes
    hidden [RateStrategy]$rate              # composition: Ride has a strategy [!code highlight]

    Ride([int]$minutes, [RateStrategy]$rate) {
        $this.minutes = $minutes
        $this.rate = $rate
    }

    [int] GetMinutes() {
        return $this.minutes
    }

    [double] CalculatePrice() {
        return $this.rate.Calculate($this)  # delegate to the strategy [!code highlight]
    }
}

# The rate is chosen per ride. A new rate is a new class; Ride does not change.
$ride = [Ride]::new(30, [PerMinuteRate]::new())
$ride.CalculatePrice()      # 7.5
