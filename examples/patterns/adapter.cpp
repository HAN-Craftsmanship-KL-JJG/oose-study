// The domain defines the interface it needs.
class BikeLock {
public:
    virtual void unlock(std::string bikeNumber) = 0;
};

// Two external libraries. You cannot change them.
class LockItSdk {
public:
    void unlockBike(std::string id) { /* talks to the LockIt lock */ }
};

class SmartLockApi {
public:
    void open(int nr, std::string token) { /* talks to the SmartLock lock */ }
};

// One adapter per library. Each translates the call.
class LockItAdapter : public BikeLock {
    LockItSdk* sdk;

public:
    LockItAdapter(LockItSdk* sdk) : sdk(sdk) {}

    void unlock(std::string bikeNumber) override {
        sdk->unlockBike(bikeNumber);                        // other method name [!code highlight]
    }
};

class SmartLockAdapter : public BikeLock {
    SmartLockApi* api;
    std::string token;

public:
    SmartLockAdapter(SmartLockApi* api, std::string token) : api(api), token(token) {}

    void unlock(std::string bikeNumber) override {
        // [!code highlight]
        api->open(std::stoi(bikeNumber), token);            // other name, types and data
    }
};

// The domain only knows BikeLock; it never sees SmartLockApi.
BikeLock* lock = new SmartLockAdapter(new SmartLockApi(), "secret-token");
lock->unlock("42");
