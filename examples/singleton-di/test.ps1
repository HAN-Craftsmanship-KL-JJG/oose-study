# PriceCalculator.Tests.ps1, run with: Invoke-Pester
using module ./Prices.psm1

# A stub: always the same rate, no database needed
class FixedRateSource : RateSource {
    hidden [double]$rate

    FixedRateSource([double]$rate) {
        $this.rate = $rate
    }

    [double] GetRate([string]$bikeType) {
        return $this.rate
    }
}

Describe "PriceCalculator" {
    It "multiplies the rate by the minutes" {
        $calculator = [PriceCalculator]::new([FixedRateSource]::new(0.25)) # [!code highlight]
        $ride = [Ride]::new("e-bike", 30)

        $calculator.Price($ride) | Should -Be 7.5
    }
}
