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
    }

    componentDidMount() {
        
    }
    
    sendGameRecord(result) {
        console.log(result);
    }


    render(){
        return (
            <div>
                <Board sendGameRecord={this.sendGameRecord}/>
                <History history={this.state.history} />
            </div>
        )
    }
}

export default App;