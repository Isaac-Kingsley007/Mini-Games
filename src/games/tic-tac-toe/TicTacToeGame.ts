class TicTacToeGame{
    board: number[];
    setBoard: React.Dispatch<React.SetStateAction<number[]>>;
    userValue: number;
    computerValue: number;
    winBoards: number[][];
    isUserTurn: boolean;

    constructor(board: number[], setBoard: React.Dispatch<React.SetStateAction<number[]>>, userValue: number = 1, computerValue: number = -1, isUserTurn: boolean = true){
        this.board = board;
        this.setBoard = setBoard;
        this.userValue = userValue;
        this.computerValue = computerValue;
        this.winBoards = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        this.isUserTurn = isUserTurn;
    }

    updateBoard(board:number[]):void{
        this.setBoard(board)
        this.board = board;
    }

    resetBoard(): void{
        //Reset Only works after game over
        if(!this.isGameOver()) return;

        this.updateBoard(new Array(9).fill(0));
        this.isUserTurn = true;
    }

    userPlay(cell:number):void{
        if(!this.isUserTurn || this.board[cell] != 0 || this.isGameOver()) return;

        const newBoard = [...this.board]
        newBoard[cell] = this.userValue;
        
        this.updateBoard(newBoard);
        this.isUserTurn = !this.isUserTurn;
    }

    computerPlay():void{
        if(this.isUserTurn) return;

        const cell = this.findBestMove();
        const newBoard = [...this.board]
        newBoard[cell] = this.computerValue;

        this.updateBoard(newBoard);

        this.isUserTurn = !this.isUserTurn;
    }

    isWin(board:number[] = this.board, player:number):boolean{
        return this.winBoards.some((winBoard:number[]) => {
            return winBoard.every((value:number)=>{
                return board[value] === player;
            });
        });
    }

    isDraw(board:number[] = this.board):boolean{
        return board.every((value:number) => value != 0);
    }

    isGameOver(board:number[] = this.board):boolean{
        return this.isWin(board, this.userValue) || this.isWin(board, this.computerValue) || this.isDraw(board);
    }

    findBestMove(): number {
        const tempBoard = [...this.board];
        let bestMove = -1;
        let bestScore = -Infinity;
    
        for (let i = 0; i < 9; i++) {
            if (tempBoard[i] === 0) {
                tempBoard[i] = this.computerValue;
                const score = this.minimax(tempBoard, false);
                tempBoard[i] = 0;
    
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                    if (bestScore === 1) break; // Early win
                }
            }
        }
    
        return bestMove;
    }
    
    minimax(board: number[], isComputerTurn: boolean): number {
        if(this.isWin(board, this.computerValue)) return 1;
        if(this.isWin(board, this.userValue)) return -1;
        if(this.isDraw(board)) return 0;

        let bestScore = isComputerTurn ? -Infinity: Infinity;
        let score: number;
        for(let i = 0; i<9; i++){
            if(board[i] === 0){

                board[i] = (isComputerTurn) ? this.computerValue : this.userValue;
                score = this.minimax(board, !isComputerTurn);
                board[i] = 0;

                if(isComputerTurn){
                    bestScore = Math.max(bestScore, score);
                    if(bestScore === 1) break;
                } else{
                    bestScore = Math.min(bestScore, score);
                    if(bestScore === -1) break;
                }
            }
        }

        return bestScore;
    }
    
}

export default TicTacToeGame;