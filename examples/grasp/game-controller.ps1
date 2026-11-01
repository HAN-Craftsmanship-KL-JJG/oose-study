class Game {
    hidden [GameBoard]$board = [GameBoard]::new()

    # The player clicked "join" in the user interface.
    [void] JoinGame([string]$name) {
        $character = [Character]::new($name)
        $this.board.PlaceOnFreeSquare($character) # "board, you handle this" [!code highlight]
    }
}
