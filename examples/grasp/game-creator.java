class GameBoard {
    private final List<Square> squares = new ArrayList<>();

    // Runs when the board is made.
    GameBoard() {
        for (int i = 0; i < 64; i++) {
            squares.add(new Square()); // the board makes its own squares [!code highlight]
        }
    }
}
