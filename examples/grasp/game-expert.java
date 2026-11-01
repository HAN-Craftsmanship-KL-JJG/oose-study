class GameBoard {
    private final List<Square> squares = new ArrayList<>(); // only the board has this list

    Square findFreeSquare() {
        for (Square square : squares) { // looks through its own squares [!code highlight]
            if (square.isEmpty()) return square;
        }
        return null;
    }
}
