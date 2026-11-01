class Game {
    private final GameBoard board = new GameBoard();

    // The player clicked "join" in the user interface.
    void joinGame(String name) {
        Character character = new Character(name);
        board.placeOnFreeSquare(character); // "board, you handle this" [!code highlight]
    }
}
