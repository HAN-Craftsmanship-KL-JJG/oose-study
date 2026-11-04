class GameBoard {
    std::vector<Square> squares; // only the board has this list

public:
    Square* findFreeSquare() {
        for (Square& square : squares) { // looks through its own squares [!code highlight]
            if (square.isEmpty()) return &square;
        }
        return nullptr;
    }
};
