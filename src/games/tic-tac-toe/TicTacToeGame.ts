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

    userPlay(cell:number):void{
        const newBoard = [...this.board]
        newBoard[cell] = this.userValue;
        
        this.updateBoard(newBoard);
    }

    computerPlay():void{
        const cell = this.findBestMove();
        const newBoard = [...this.board]
        newBoard[cell] = this.computerValue;

        this.updateBoard(newBoard);
    }

    findBestMove():number{
        const tempBoard = [...this.board];
        let bestMove = -1;
        let bestScore = -2;
        let score: number;
        for(let i = 0; i<9; i++){
            if(tempBoard[i] === 0){
                tempBoard[i] = this.computerValue;
                score = this.minimax(tempBoard, true);
                if(score > bestScore){
                    bestMove = i;
                    bestScore = score;
                    if(bestScore == 1) return bestMove;
                }
            }
        }

        return bestMove;
    }

    isWin(board:number[] = this.board, player:number):boolean{
        return this.winBoards.some((winBoard:number[]) => {
            return winBoard.every((value:number)=>{
                return board[value] === player;
            });
        });
    }

    isDraw(board:number[] = this.board):boolean{
        return board.some((value:number) => value === 0);
    }

    minimax(board:number[], isUserTurn:boolean):number{

        if(isUserTurn){
            if(this.isWin(board, this.userValue)){
                return 1;
            } else if(this.isWin(board, this.computerValue)){
                return -1;
            } else if(this.isDraw(board)){
                return 0;
            }

            let maxScore = -1;
            for(let i = 0; i<9; i++){
                if(board[i] == 0){
                    board[i] = this.userValue;
                    board[i] = 0;
                    maxScore = Math.max(maxScore, -this.minimax(board, false));
                    if(maxScore == 1) return 1;
                }
            }

            return maxScore;
        } else {
            if(this.isWin(board, this.userValue)){
                return -1;
            } else if(this.isWin(board, this.computerValue)){
                return 1;
            } else if(this.isDraw(board)){
                return 0;
            }

            let maxScore = -1;

            for(let i = 0; i<9; i++){
                if(board[i] == 0){
                    board[i] = this.computerValue;
                    board[i] = 0;
                    maxScore = Math.max(maxScore, -this.minimax(board, true));
                    if(maxScore == 1) return 1;
                }
            }

            return maxScore;
        }

    }
}

export default TicTacToeGame;