// Domain layer: the domain owns the interface and knows no vendor.
public interface BikeLock {
    void unlock();
}

public class Bike {
    private final BikeLock lock;
    public Bike(BikeLock lock) { this.lock = lock; }
    public void unlock() { lock.unlock(); }
}

// Infrastructure layer: one adapter per vendor library.
public class LockItBikeLock implements BikeLock {
    private final LockItSdk sdk = new LockItSdk();
    private final String lockId;
    public LockItBikeLock(String lockId) { this.lockId = lockId; }
    public void unlock() { sdk.unlockBike(lockId); }          // translate
}

public class SmartLockBikeLock implements BikeLock {
    private final SmartLockApi api = new SmartLockApi();
    private final int number;
    private final String token;
    public SmartLockBikeLock(int number, String token) { this.number = number; this.token = token; }
    public void unlock() { api.open(number, token); }         // translate
}

// The factory is the only place that knows which adapters exist.
public class LockFactory {
    public BikeLock createLock(LockConfig config) {
        switch (config.vendor()) {
            case "LockIt":    return new LockItBikeLock(config.lockId());
            case "SmartLock": return new SmartLockBikeLock(config.number(), config.token());
            default: throw new IllegalArgumentException("Unknown vendor");
        }
    }
}
