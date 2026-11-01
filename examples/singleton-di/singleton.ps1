class Database {
    hidden static [Database]$instance        # the one object [!code highlight]

    static [Database] GetInstance() {        # static: call it on the class [!code highlight]
        if ($null -eq [Database]::instance) {
            [Database]::instance = [Database]::new()
        }
        return [Database]::instance
    }

    [double] GetRate([string]$bikeType) { return 0.25 }
}

# Every caller gets the same object
$db = [Database]::GetInstance()
