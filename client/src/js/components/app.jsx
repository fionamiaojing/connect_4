import React from "react"
import Board from './board.jsx'
import History from './history.jsx';

const automate = (cb, wt) => {
    cb();
    setTimeout(automate.bind(null, cb, wt), wt);
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [],
        };

        this.historyUrl = 'http://localhost:3000/history'
        this.sendGameRecord = this.sendGameRecord.bind(this);
        this.retrieveGameRecords = this.retrieveGameRecords.bind(this);
        this.handleHistoryClick = this.handleHistoryClick.bind(this);
    }

    componentDidMount() {
        automate(this.retrieveGameRecords, 10000);
    }
    
    sendGameRecord(result) {
        return fetch(this.historyUrl, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(result)
        }).then(this.retrieveGameRecords.bind(this))
    }

    retrieveGameRecords() {
        return fetch(this.historyUrl, {
            method: 'GET',
            mode: 'cors',
        }).then(response => response.json())
        .then((history) => {
            this.setState({
            history: history
        })})
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