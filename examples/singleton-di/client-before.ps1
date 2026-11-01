class PriceCalculator {
    [double] Price([Ride]$ride) {
        # Hidden dependency: you cannot see it in the constructor
        # and a test cannot replace it.
        $rate = [Database]::GetInstance().GetRate($ride.BikeType) # [!code highlight]
        return $rate * $ride.Minutes
    }
}
