public interface Board {
    void setUp();
}

public class ChessBoard implements Board {
    public void setUp() { System.out.println("8 x 8 squares, 32 pieces"); }
}

public class DraughtsBoard implements Board {
    public void setUp() { System.out.println("10 x 10 squares, 40 discs"); }
}

public abstract class Game {
    private Board board;

    public void start() {
        board = createBoard();      // the factory method
        board.setUp();
    }

    protected abstract Board createBoard();
}

public class ChessGame extends Game {
    @Override
    protected Board createBoard() { return new ChessBoard(); }
}

public class DraughtsGame extends Game {
    @Override
    protected Board createBoard() { return new DraughtsBoard(); }
}

Game game = new DraughtsGame();
game.start();                       // 10 x 10 squares, 40 discs
