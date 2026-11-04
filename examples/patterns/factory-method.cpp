class Board {
public:
    virtual void setUp() = 0;
};

class ChessBoard : public Board {
public:
    void setUp() override { std::cout << "8 x 8 squares, 32 pieces\n"; }
};

class DraughtsBoard : public Board {
public:
    void setUp() override { std::cout << "10 x 10 squares, 40 discs\n"; }
};

class Game {
    Board* board = nullptr;

public:
    void start() {
        board = createBoard();      // the factory method [!code highlight]
        board->setUp();
    }

protected:
    virtual Board* createBoard() = 0; // [!code highlight]
};

class ChessGame : public Game {
protected:
    Board* createBoard() override { return new ChessBoard(); }
};

class DraughtsGame : public Game {
protected:
    Board* createBoard() override { return new DraughtsBoard(); }
};

Game* game = new DraughtsGame();
game->start();                      // 10 x 10 squares, 40 discs
