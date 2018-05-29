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
            section: 0
        };

        this.section={
            0: [1, 'History'],
            1: [0, 'Bitwise Implementation']
        }

        this.historyUrl = 'http://localhost:3000/history'
        this.sendGameRecord = this.sendGameRecord.bind(this);
        this.retrieveGameRecords = this.retrieveGameRecords.bind(this);
        this.handleSectionClick = this.handleSectionClick.bind(this);
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

    handleSectionClick(event) {
        this.setState({
            section: this.section[this.state.section][0]
        })
    }

    handleHistoryClick(event) {
        this.board.resetBoard(this.state.history[event.currentTarget.getAttribute('index')]);
    }

    render(){
        return (
            <div>
                <Board sendGameRecord={this.sendGameRecord} onRef={(ref) => (this.board = ref)}/>
                <div className="section center">
                    <h2 className="center"  onClick={this.handleSectionClick}>{this.section[this.state.section][1]}</h2><br/>
                </div>
                {((this.state.section === 0) && (<History history={this.state.history} handleHistoryClick={this.handleHistoryClick}/>))
                || ((this.state.section === 1) && (''))}
            </div>
        )
    }
}

export default App;