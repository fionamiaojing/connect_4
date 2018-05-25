import React from "react"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: Array(7).fill().map((_, index) => Array(6).fill(0)),
            player1: Array(7).fill(0),
            player2: Array(7).fill(0),
            turn: 1,
        }
        this.nextTurn ={
            1: 2,
            2: 1
        }
    }

    

    handleClick(ind1, ind2, event){
        const index = this.state.board[ind1].indexOf(0);
        if (index < 0) {
            return;
        }
        let newBoard = this.state.board.map((row) => [...row]);
        newBoard[ind1][index] = this.state.turn;
        this.setState({
            board: newBoard,
            turn: this.nextTurn[this.state.turn]
        });
    }

    render(){
        return (
            <div className="board">
                {this.state.board.map((col, colIndex) => (
                    <div className="column" key={colIndex} >
                        {col.map((item, rowIndex) => (
                            <div className="cell" key={rowIndex} col={colIndex} row={rowIndex} onClick={this.handleClick.bind(this, colIndex, rowIndex)}>{item}</div>
                        ))}
                    </div>
                ))}
            </div>
        )
    }
}

export default App;