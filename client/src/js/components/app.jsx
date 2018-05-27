import React from "react"

let gameSetup = {};
gameSetup.rowNum = 6;
gameSetup.colNum = 7;
gameSetup.winRule = 4;
gameSetup.check = 2 ** gameSetup.winRule - 1;
gameSetup.fullBoard = 2 ** gameSetup.colNum - 1;

gameSetup.boardSetup = [];
for (let i = 0; i < gameSetup.colNum; i++) {
    gameSetup.boardSetup[1 << i] = 0;
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.turnProps ={
            p1: ['p2', 'O'],
            p2: ['p1', 'X']
        };

        this.state = {
            fullBoard: gameSetup.fullBoard,
            p1: gameSetup.boardSetup.slice(),
            p2: gameSetup.boardSetup.slice(),
            turn: 'p1',
            banner: `Game starts with player ${this.turnProps.p1[1]}`,
            game: true,
        };
    }

    componentDidMount(){
    }

    incrementalCheckWin(player, piece, col) {
        //concurrent column check;
        let curCheck = gameSetup.check;
        while (!(curCheck & piece)) curCheck <<= 1;
        if (!((player[col] & curCheck) ^ curCheck)) {
            return true;
        }
        
        let curCol, leftDiag, rightDiag, row; 
        curCheck = gameSetup.check;
        while (!((curCheck & gameSetup.fullBoard) ^ curCheck)) {
            if (curCheck & col) {
                curCol = (curCheck) & (-curCheck);
                leftDiag = rightDiag = row = player[curCol];
                curCol <<= 1;
                while (curCol & curCheck) {
                    leftDiag = (leftDiag << 1) & player[curCol];
                    rightDiag = (rightDiag >> 1) & player[curCol];
                    row &= player[curCol];
                    curCol <<= 1;
                }
                if (leftDiag | rightDiag | row) {
                    return true;
                }
            }
            curCheck <<= 1;
        }

        return false;
    }

    placeOnePiece(col) {
        //determine if the column is all occupied before placing
        if (this.state.fullBoard & col) {
            //create new state
            let newState = {}
            Object.keys(this.state).forEach((key) => {
                newState[key] = Array.isArray(this.state[key]) ? this.state[key].slice() : this.state[key];
            });

            //determine current piece
            let piece = (newState.p1[col] | newState.p2[col]) + 1;

            //toggle piece:
            newState[newState.turn][col] ^= piece;
            //determine if the column is all occupied after placing
            ((1 << (gameSetup.rowNum - 1)) & piece) && (newState.fullBoard ^= col);

            //determine win:
            if (this.incrementalCheckWin(newState[newState.turn], piece, col)) {
                newState.banner = `Winner is player ${this.turnProps[newState.turn][1]}`
                newState.game = false;
            } else if (!newState.fullBoard) {
                //if draw
                newState.banner = `Draw!`
                newState.game = false;
            }else {
                //switch turns:
                newState.turn = this.turnProps[newState.turn][0];
                newState.banner = `Player ${this.turnProps[newState.turn][1]}'s turn`
            }

            //set new state
            this.setState(newState)
        }
        
    }

    resetBoard() {
        //create new state
        let newState = {
            fullBoard: gameSetup.fullBoard,
            p1: gameSetup.boardSetup.slice(),
            p2: gameSetup.boardSetup.slice(),
            banner: `Game starts with player ${this.turnProps[this.state.turn][1]}`,
            game: true,
        }

        //set new state
        this.setState(newState)

    }

    handleClick(ind1){
        if (this.state.game) {
            this.placeOnePiece(ind1);
        } else {
            this.resetBoard();
        }
    }

    render(){
        return (
            <div>
                <div className="center">
                    <h2 className="banner">{this.state.banner}</h2>
                </div>
                <div className={`board center ${this.state.game ? "rotation" : ""}`} onClick={(event) => {this.handleClick(event.target.getAttribute('col'))}}>
                    {gameSetup.boardSetup.map((col, colIndex) => (
                        <div className="column" key={colIndex} >
                        {Array(gameSetup.rowNum).fill().map((_, rowIndex) => (
                            <div className="cell center" key={rowIndex} col={colIndex}>{
                                ((this.state.p1[colIndex] & (1 << rowIndex)) && (this.turnProps.p1[1])) ||
                                ((this.state.p2[colIndex] & (1 << rowIndex)) && (this.turnProps.p2[1])) ||
                                ('')
                            }</div>
                        ))}
                        </div>
                    ))
                    }
                </div>
                <div>
                    
                </div>
            </div>
        )
    }
}

export default App;