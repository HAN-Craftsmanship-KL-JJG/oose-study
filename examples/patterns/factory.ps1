class LockFactory {
    # The only place that knows the concrete adapter classes.
    [BikeLock] CreateLock([string]$supplier) { # [!code highlight]
        switch ($supplier) {
            "lockit" { return [LockItAdapter]::new([LockItSdk]::new()) } # [!code highlight]
            # [!code highlight]
            "smartlock" { return [SmartLockAdapter]::new([SmartLockApi]::new(), "secret-token") }
        }
        throw "Unknown supplier: $supplier"
    }
}

# The client reads the supplier from the configuration and only knows BikeLock.
$config = Get-Content ./config.json | ConvertFrom-Json
[BikeLock]$lock = [LockFactory]::new().CreateLock($config.lockSupplier)
$lock.Unlock("42")
