// The domain defines the interface it needs.
public interface BikeLock {
    void unlock(String bikeNumber);
}

// Two external libraries. You cannot change them.
public class LockItSdk {
    public void unlockBike(String id) { /* talks to the LockIt lock */ }
}

public class SmartLockApi {
    public void open(int nr, String token) { /* talks to the SmartLock lock */ }
}

// One adapter per library. Each translates the call.
public class LockItAdapter implements BikeLock {
    private final LockItSdk sdk;

    public LockItAdapter(LockItSdk sdk) {
        this.sdk = sdk;
    }

    @Override
    public void unlock(String bikeNumber) {
        sdk.unlockBike(bikeNumber);                         // other method name [!code highlight]
    }
}

public class SmartLockAdapter implements BikeLock {
    private final SmartLockApi api;
    private final String token;

    public SmartLockAdapter(SmartLockApi api, String token) {
        this.api = api;
        this.token = token;
    }

    @Override
    public void unlock(String bikeNumber) {
        // [!code highlight]
        api.open(Integer.parseInt(bikeNumber), token);      // other name, types and data
    }
}
