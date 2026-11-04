class LockFactory {
public:
    // The only place that knows the concrete adapter classes.
    BikeLock* createLock(std::string supplier) { // [!code highlight]
        if (supplier == "lockit") {
            return new LockItAdapter(new LockItSdk()); // [!code highlight]
        }
        if (supplier == "smartlock") {
            return new SmartLockAdapter(new SmartLockApi(), "secret-token"); // [!code highlight]
        }
        throw std::invalid_argument("Unknown supplier: " + supplier);
    }
};

// The client reads the supplier from the configuration and only knows BikeLock.
BikeLock* lock = LockFactory().createLock(config.get("lock.supplier"));
lock->unlock("42");
