class Board {
    [void] SetUp() { throw [System.NotImplementedException]::new("SetUp") }
}

class ChessBoard : Board {
    [void] SetUp() { Write-Host "8 x 8 squares, 32 pieces" }
}

class DraughtsBoard : Board {
    [void] SetUp() { Write-Host "10 x 10 squares, 40 discs" }
}

class Game {
    hidden [Board]$board

    [void] Start() {
        $this.board = $this.CreateBoard()   # the factory method
        $this.board.SetUp()
    }

    [Board] CreateBoard() { throw [System.NotImplementedException]::new("CreateBoard") }
}

class ChessGame : Game {
    [Board] CreateBoard() { return [ChessBoard]::new() }
}

class DraughtsGame : Game {
    [Board] CreateBoard() { return [DraughtsBoard]::new() }
}

[Game]$game = [DraughtsGame]::new()
$game.Start()                       # 10 x 10 squares, 40 discs
