class Game {
    GameBoard board;

public:
    // The player clicked "join" in the user interface.
    void joinGame(std::string name) {
        Character* character = new Character(name);
        board.placeOnFreeSquare(character); // "board, you handle this" [!code highlight]
    }
};
