# Domain layer: the domain owns the "interface" and knows no vendor.
class BikeLock {
    [void] Unlock() { throw [System.NotImplementedException]::new("Unlock") }
}

class Bike {
    hidden [BikeLock]$lock
    Bike([BikeLock]$lock) { $this.lock = $lock }
    [void] Unlock() { $this.lock.Unlock() }
}

# Infrastructure layer: one adapter per vendor library.
class LockItBikeLock : BikeLock {
    hidden [object]$sdk
    hidden [string]$lockId
    LockItBikeLock([object]$sdk, [string]$lockId) { $this.sdk = $sdk; $this.lockId = $lockId }
    [void] Unlock() { $this.sdk.UnlockBike($this.lockId) }        # translate
}

class SmartLockBikeLock : BikeLock {
    hidden [object]$api
    hidden [int]$number
    hidden [string]$token
    SmartLockBikeLock([object]$api, [int]$number, [string]$token) {
        $this.api = $api; $this.number = $number; $this.token = $token
    }
    [void] Unlock() { $this.api.Open($this.number, $this.token) }  # translate
}

# The factory is the only place that knows which adapters exist.
class LockFactory {
    [BikeLock] CreateLock([hashtable]$config) {
        switch ($config.Vendor) {
            "LockIt"    { return [LockItBikeLock]::new($config.Sdk, $config.LockId) }
            "SmartLock" {
                return [SmartLockBikeLock]::new($config.Api, $config.Number, $config.Token)
            }
        }
        throw "Unknown vendor: $($config.Vendor)"
    }
}
