class Enclosure {
    hidden [Keeper]$keeper              # the association

    Enclosure([Keeper]$keeper) {
        $this.keeper = $keeper
    }

    [string] Sign() {
        return "Keeper: " + $this.keeper.Description()   # A calls B
    }
}
