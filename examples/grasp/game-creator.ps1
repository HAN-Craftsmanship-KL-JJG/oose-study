class GameBoard {
    hidden [System.Collections.Generic.List[Square]]$squares =
        [System.Collections.Generic.List[Square]]::new()

    # Runs when the board is made.
    GameBoard() {
        for ($i = 0; $i -lt 64; $i++) {
            $this.squares.Add([Square]::new()) # the board makes its own squares [!code highlight]
        }
    }
}
