class RateSource {
    [double] GetRate([string]$bikeType) {
        throw [System.NotImplementedException]::new("GetRate")
    }
}

class PriceCalculator {
    hidden [RateSource]$rateSource

    PriceCalculator([RateSource]$rateSource) {        # constructor injection
        $this.rateSource = $rateSource
    }

    [double] Price([Ride]$ride) {
        $rate = $this.rateSource.GetRate($ride.BikeType)
        return $rate * $ride.Minutes
    }
}

# The real source, used by the application
class DatabaseRateSource : RateSource {
    [double] GetRate([string]$bikeType) {
        return [Database]::GetInstance().GetRate($bikeType)
    }
}

# Somewhere at start-up
$calculator = [PriceCalculator]::new([DatabaseRateSource]::new())
