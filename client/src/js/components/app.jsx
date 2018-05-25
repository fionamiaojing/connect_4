import React from "react"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            len: Array(7).fill(0),
            p1: Array(7).fill(0),
            p2: Array(7).fill(0),
            turn: 'p1',
        };
        
        this.fullBoard = 2 ** 6 -1;

        this.turnProps ={
            p1: ['p2', 'O'],
            p2: ['p1', 'X']
        };

    }

    placeOnePiece(col) {
        if (this.state.len[col] < 6) {
            //create new state
            let newState = {}
            Object.keys(this.state).forEach((key) => {
                newState[key] = Array.isArray(this.state[key]) ? [...this.state[key]] : this.state[key];
            })

            //toggle piece:
            newState[newState.turn][col] ^= (1 << newState.len[col]);
            newState.len[col]++;
            newState.turn = this.turnProps[newState.turn][0];
            this.setState(newState)
        }
        
    }

    handleClick(ind1){
        this.placeOnePiece(ind1);

    }

    render(){
        return (
            <div className="board center" onClick={(event) => {this.handleClick(event.target.getAttribute('col'))}}>
                {this.state.len.map((col, colIndex) => (
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
        )
    }
}

export default App;