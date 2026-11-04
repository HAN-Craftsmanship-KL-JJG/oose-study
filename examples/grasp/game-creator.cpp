class GameBoard {
    std::vector<Square> squares;

public:
    // Runs when the board is made.
    GameBoard() {
        for (int i = 0; i < 64; i++) {
            squares.push_back(Square()); // the board makes its own squares [!code highlight]
        }
    }
};
