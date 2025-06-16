export enum Status{
    Hidden,
    Revealed,
    Flagged,
    RevealedBomb,
    ClickedBomb,
    WronglyFlagged,
    RevealedAfterWinning
}

export interface Score{
    wins: number,
    loses: number,
    score: number
}

export interface LearderBoardRow{
    username: string,
    wins: number,
    loses: number,
    score: number
}