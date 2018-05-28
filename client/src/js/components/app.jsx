import React from "react"
import Board from './board.jsx'
import History from './history.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [],
            }
        this.sendGameRecord = this.sendGameRecord.bind(this);
        this.handleHistoryClick = this.handleHistoryClick.bind(this);
    }

    componentDidMount() {
        
    }
    
    sendGameRecord(result) {
        this.setState({
            history: [...this.state.history, result]
        })
    }

    handleHistoryClick(event) {
        this.board.resetBoard(this.state.history[event.currentTarget.getAttribute('index')]);
    }

    render(){
        return (
            <div>
                <Board sendGameRecord={this.sendGameRecord} onRef={(ref) => (this.board = ref)}/>
                <History history={this.state.history} handleHistoryClick={this.handleHistoryClick}/>
            </div>
        )
    }
}

export default App;