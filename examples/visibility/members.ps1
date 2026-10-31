class Keeper {
    [string]$Name = "Anna"        # public
    hidden [int]$pinCode = 9999   # hidden, not truly private

    [void] Feed() { }             # public
    hidden [void] CheckBadge() { }
}
