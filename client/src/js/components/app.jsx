import React from "react"

class App extends React.Component {
    constructor(props) {
        super(props);

        this.turnProps ={
            p1: ['p2', 'O'],
            p2: ['p1', 'X']
        };

        this.state = {
            fullBoard: 2 ** 7 - 1,
            p1: Array(7).fill(0),
            p2: Array(7).fill(0),
            turn: 'p1',
            banner: `Game starts with player ${this.turnProps.p1[1]}`,
            game: true,
        };
        
    }

    //Not using this check since we know who's turn it is and its position
    // fullCheckWin(player) {
    //     //concurrent column check
    //     const check = 2 ** 4 - 1;
    //     for (let i = 0; i < player.length; i++) {
    //         for (let j = 0; j < 3; j++) {
    //             if (((player[i] >> j) & check) === check) {
    //                 return true;
    //             }
    //         }
    //     }
        
    //     //inter-column check
    //     let leftDiag, row, rightDiag;
    //     for (let i = 0; i < 4; i++) {
    //         row = player[i];
    //         leftDiag = player[i];
    //         rightDiag = player[i];
    //         for (let j = 1; j < 4; j++) {
    //             leftDiag = (leftDiag << 1) & player[i + j];
    //             rightDiag = (rightDiag >> 1) & player[i + j];
    //             row = row & player[i + j];
    //         }
    //         if (leftDiag | rightDiag | row) {
    //             return true;
    //         }
    //     }

    //     return false;
    // }

    incrementalCheckWin(player, piece, col) {
        //concurrent column check;
        const check = 2 ** 4 - 1;
        let currentCheck = check;
        while (!(currentCheck & piece)) {
            currentCheck <<= 1;
        }
        if (!((player[col] & currentCheck) ^ currentCheck)) {
            return true;
        }
        
        let leftDiag, rightDiag, row; 
        for (let i = Math.max(0, col - 3); i <= (Math.min(6, col + 3) - 3); i++) {
            currentCheck = check >> 1;
            leftDiag = (piece >> (col - i)) & player[i];
            rightDiag = (piece << (col - i)) & player[i];
            row = piece & player[i];
            let j = 1;
            while (currentCheck) {
                currentCheck >>= 1;
                leftDiag = (leftDiag << 1) & player[i + j];
                rightDiag = (rightDiag >> 1) & player[i + j];
                row &= player[i + j];
                j++;
            }
            if (leftDiag | rightDiag | row) {
                return true;
            }
        }

        return false;
    }

    placeOnePiece(col) {
        //determine if the column is all occupied
        if (this.state.fullBoard & (1 << col)) {
            //create new state
            let newState = {}
            Object.keys(this.state).forEach((key) => {
                newState[key] = Array.isArray(this.state[key]) ? [...this.state[key]] : this.state[key];
            });

            //determine current piece
            let piece = (newState.p1[col] | newState.p2[col]) + 1;

            //toggle piece:
            newState[newState.turn][col] ^= piece;
            //determine if the column is all occupied
            ((1 << 5) & piece) && (newState.fullBoard ^= (1 << col));

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
            fullBoard: 2 ** 7 -1,
            p1: Array(7).fill(0),
            p2: Array(7).fill(0),
            turn: this.state.turn,
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
                <div className={`board center ${this.state.game ? "" : "rotation"}`} onClick={(event) => {this.handleClick(event.target.getAttribute('col'))}}>
                    {this.state.p1.map((col, colIndex) => (
                        <div className="column" key={colIndex} >
                        {Array(6).fill().map((_, rowIndex) => (
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
            </div>
        )
    }
}

export default App;