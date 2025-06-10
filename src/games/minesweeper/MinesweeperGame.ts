export enum Status{
    Hidden,
    Revealed,
    Flagged,
    RevealedBomb,
    ClickedBomb,
    WronglyFlagged
}

class MinesweeperGame{
    n: number;
    board: number[][];
    mines: number;
    statusBoard: Status[][];
    unRevealedCells: number;
    hasClickedABomb: boolean;

    constructor(n: number, mines: number){
        this.n = n;
        this.board = Array.from({length:n}, () => new Array(n).fill(0));
        this.statusBoard = Array.from({length:n}, () => new Array(n).fill(Status.Hidden));
        this.mines = mines;
        this.#fillBoard();
        this.unRevealedCells = n * n - mines;
        this.hasClickedABomb = false;
    }

    #fillBoard(): void{

        let remainingMines = this.mines;

        while(remainingMines > 0){
            const row = Math.random() * this.n;
            const col = Math.random() * this.n;
            if(this.board[row][col] != -1){
                this.board[row][col] = -1;
                remainingMines -= 1
            }
        }

        for(let row = 0; row < this.n; row++){
            for(let col = 0; col < this.n; col++){
                if(this.board[row][col] == -1){
                    for(let r = -1; r <= 1; r++){
                        for(let c = -1; c <= 1; c++){
                            if(this.board[r][c] != -1){
                                this.board[r][c]++;
                            }
                        }
                    }
                }
            }
        }

    }

    getNumber(cell: number): number{
        return this.board[Math.floor(cell/this.n)][cell % this.n];
    }

    getStatus(cell: number): Status{
        return this.statusBoard[Math.floor(cell/this.n)][cell % this.n];
    }

    click(cell: number): void{
        const row = Math.floor(cell/this.n);
        const col = cell % this.n;

        //pressing a cell already recovered or flagged or simply not hidden or when gameover
        if(this.statusBoard[row][col] != Status.Hidden || this.isGameOver()) return;

        //when a bomb is clicked
        if(this.board[row][col] == -1){
            this.#clickedBomb(row, col);
        }

        //if it is a hidden number cell
        this.#clickedNumberedCell(row, col);
    }

    #clickedBomb(bRow: number, bCol: number): void{

        for(let row = 0; row < this.n; row++){
            for(let col = 0; col < this.n; col++){
                if(this.board[row][col] == -1 && this.statusBoard[row][col] == Status.Hidden){
                    this.statusBoard[row][col] = Status.RevealedBomb;
                }

                if(this.statusBoard[row][col] == Status.Flagged && this.board[row][col] != -1){
                    this.statusBoard[row][col] = Status.WronglyFlagged;
                }
            }
        }

        this.statusBoard[bRow][bCol] = Status.ClickedBomb;

        this.hasClickedABomb = true;

    }

    #clickedNumberedCell(row: number, col: number): void{
        if(row < 0 || row >= this.n || col < 0 || col >= this.n || 
            this.board[row][col] == -1 || 
            this.statusBoard[row][col] == Status.Revealed || 
            this.statusBoard[row][col] == Status.Flagged)
            return;

        this.statusBoard[row][col] = Status.Revealed;
        this.unRevealedCells -= 1;
        
        if(this.board[row][col] != 0){
            return;
        }

        this.#clickedNumberedCell(row + 1, col);
        this.#clickedNumberedCell(row - 1, col);
        this.#clickedNumberedCell(row, col - 1);
        this.#clickedNumberedCell(row, col + 1);
    }

    flag(cell: number): void{
        const row = Math.floor(cell/this.n), col = cell % this.n;
        if(this.statusBoard[row][col] == Status.Revealed || this.isGameOver()) return;

        if(this.statusBoard[row][col] == Status.Flagged){
            this.statusBoard[row][col] = Status.Hidden;
        } else{
            this.statusBoard[row][col] = Status.Flagged;
        }
    }

    isGameOver(): boolean{
        return this.hasClickedABomb || this.unRevealedCells === 0;
    }

    //TODO: Implement a On Win Method 
}

export default MinesweeperGame;