# The domain defines the interface it needs.
class BikeLock {
    [void] Unlock([string]$bikeNumber) {
        throw [System.NotImplementedException]::new("Unlock")
    }
}

# Two external libraries. You cannot change them.
class LockItSdk {
    [void] unlockBike([string]$id) { }      # talks to the LockIt lock
}

class SmartLockApi {
    [void] open([int]$nr, [string]$token) { }   # talks to the SmartLock lock
}

# One adapter per library. Each translates the call.
class LockItAdapter : BikeLock {
    hidden [LockItSdk]$sdk

    LockItAdapter([LockItSdk]$sdk) { $this.sdk = $sdk }

    [void] Unlock([string]$bikeNumber) {
        $this.sdk.unlockBike($bikeNumber)                   # other method name [!code highlight]
    }
}

class SmartLockAdapter : BikeLock {
    hidden [SmartLockApi]$api
    hidden [string]$token

    SmartLockAdapter([SmartLockApi]$api, [string]$token) {
        $this.api = $api
        $this.token = $token
    }

    [void] Unlock([string]$bikeNumber) {
        # [!code highlight]
        $this.api.open([int]$bikeNumber, $this.token)      # other name, types and data
    }
}

# The domain only knows BikeLock; it never sees SmartLockApi.
[BikeLock]$lock = [SmartLockAdapter]::new([SmartLockApi]::new(), "secret-token")
$lock.Unlock("42")
