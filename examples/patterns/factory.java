public class LockFactory {
    // The only place that knows the concrete adapter classes.
    public BikeLock createLock(String supplier) {
        return switch (supplier) {
            case "lockit" -> new LockItAdapter(new LockItSdk());
            case "smartlock" -> new SmartLockAdapter(new SmartLockApi(), "secret-token");
            default -> throw new IllegalArgumentException("Unknown supplier: " + supplier);
        };
    }
}

// The client reads the supplier from the configuration and only knows BikeLock.
BikeLock lock = new LockFactory().createLock(config.getProperty("lock.supplier"));
lock.unlock("42");
