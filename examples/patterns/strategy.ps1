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
        return [math]::Ceiling($ride.GetMinutes() / 1440) * 15.00
    }
}

class Ride {
    hidden [datetime]$startTime
    hidden [datetime]$endTime
    hidden [RateStrategy]$rate              # composition: Ride has a strategy [!code highlight]

    Ride([datetime]$startTime, [datetime]$endTime, [RateStrategy]$rate) {
        $this.startTime = $startTime
        $this.endTime = $endTime
        $this.rate = $rate
    }

    [int] GetMinutes() {
        return [int]($this.endTime - $this.startTime).TotalMinutes
    }

    [double] CalculatePrice() {
        return $this.rate.Calculate($this)  # delegate to the strategy [!code highlight]
    }
}

# The rate is chosen per ride. A new rate is a new class; Ride does not change.
$ride = [Ride]::new((Get-Date).AddMinutes(-30), (Get-Date), [PerMinuteRate]::new())
$ride.CalculatePrice()
