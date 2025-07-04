import { Status } from "./types";

class MinesweeperGame{
    n: number;
    board: number[][];
    mines: number;
    statusBoard: Status[][];
    unRevealedCells: number;
    hasClickedABomb: boolean;
    setState: React.ActionDispatch<[]>;

    constructor(setState: React.ActionDispatch<[]>, n: number = 10, mines: number = 9){
        this.n = n;
        this.mines = mines;
        this.setState = setState;

        this.board = Array.from({length:n}, () => new Array(n).fill(0));
        this.statusBoard = Array.from({length:n}, () => new Array(n).fill(Status.Hidden));
        this.#fillBoard();
        this.unRevealedCells = n * n - mines;
        this.hasClickedABomb = false;
    }

    #fillBoard(): void{

        let remainingMines = this.mines;

        while(remainingMines > 0){
            const row = Math.floor(Math.random() * this.n);
            const col = Math.floor(Math.random() * this.n);
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
                            const nrow = row + r;
                            const ncol = col + c;
                            if(nrow >= 0 && nrow < this.n && ncol >= 0 && ncol < this.n && this.board[row + r][col + c] != -1){
                                this.board[nrow][ncol]++;
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

        if(this.isWin()){
            this.#onWin();
        }

        this.setState();
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

        for(let drow = -1; drow < 2; drow++){
            for(let dcol = -1; dcol < 2; dcol++){
                this.#clickedNumberedCell(row + drow, col + dcol);
            }
        }
    }

    flag(cell: number): void{
        const row = Math.floor(cell/this.n), col = cell % this.n;
        if(this.statusBoard[row][col] == Status.Revealed || this.isGameOver()) return;

        if(this.statusBoard[row][col] == Status.Flagged){
            this.statusBoard[row][col] = Status.Hidden;
        } else{
            this.statusBoard[row][col] = Status.Flagged;
        }

        this.setState();
    }

    isGameOver(): boolean{
        return this.hasClickedABomb || this.unRevealedCells === 0;
    }

    isWin(): boolean{
        return this.unRevealedCells === 0;
    }

    isLose(): boolean{
        return this.hasClickedABomb;
    }

    resetGame(): void{
        if(!this.isGameOver()) return;

        this.board = Array.from({length:this.n}, () => new Array(this.n).fill(0));
        this.statusBoard = Array.from({length:this.n}, () => new Array(this.n).fill(Status.Hidden));
        this.#fillBoard();
        this.unRevealedCells = this.n * this.n - this.mines;
        this.hasClickedABomb = false;

        this.setState();
    }

    #onWin(): void{
        for(let row = 0; row < this.n; row++){
            for(let col = 0; col < this.n; col++){
                if(this.statusBoard[row][col] === Status.Hidden){
                    this.statusBoard[row][col] = Status.Flagged;
                } 
                if(this.statusBoard[row][col] === Status.Revealed){
                    this.statusBoard[row][col] = Status.RevealedAfterWinning;
                }
            }
        }
    }
}

export default MinesweeperGame;