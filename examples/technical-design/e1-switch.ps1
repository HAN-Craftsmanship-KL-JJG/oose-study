# Alternative 2: one switch in Ride. It works, but every new tariff changes Ride.
class Ride {
    hidden [string]$rateType   # "minute", "day", ...
    hidden [int]$minutes

    Ride([string]$rateType, [int]$minutes) {
        $this.rateType = $rateType
        $this.minutes = $minutes
    }

    [double] CalculatePrice() {
        switch ($this.rateType) {
            "minute" { return $this.minutes * 0.25 }
            "day"    { return [math]::Ceiling($this.minutes / 1440) * 15.00 }
            # A student subscription? Change this method again.
            # A weekend offer? Change it again.
        }
        throw "Unknown rate: $($this.rateType)"
    }
}
