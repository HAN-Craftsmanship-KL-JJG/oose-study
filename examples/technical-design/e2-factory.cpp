// Domain layer: the domain owns the interface and knows no vendor.
class BikeLock {
public:
    virtual void unlock() = 0;
};

class Bike {
    BikeLock* lock;
public:
    Bike(BikeLock* lock) : lock(lock) {}
    void unlock() { lock->unlock(); }
};

// Infrastructure layer: one adapter per vendor library.
class LockItBikeLock : public BikeLock {
    LockItSdk sdk;
    std::string lockId;
public:
    LockItBikeLock(std::string lockId) : lockId(lockId) {}
    void unlock() override { sdk.unlockBike(lockId); }        // translate
};

class SmartLockBikeLock : public BikeLock {
    SmartLockApi api;
    int number;
    std::string token;
public:
    SmartLockBikeLock(int number, std::string token) : number(number), token(token) {}
    void unlock() override { api.open(number, token); }       // translate
};

// The factory is the only place that knows which adapters exist.
class LockFactory {
public:
    BikeLock* createLock(LockConfig config) {
        if (config.vendor == "LockIt") return new LockItBikeLock(config.lockId);
        if (config.vendor == "SmartLock") return new SmartLockBikeLock(config.number, config.token);
        throw std::invalid_argument("Unknown vendor");
    }
};
