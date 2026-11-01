class GameBoard {
    # Only the board has this list.
    hidden [System.Collections.Generic.List[Square]]$squares =
        [System.Collections.Generic.List[Square]]::new()

    [Square] FindFreeSquare() {
        foreach ($square in $this.squares) { # looks through its own squares [!code highlight]
            if ($square.IsEmpty()) { return $square }
        }
        return $null
    }
}
