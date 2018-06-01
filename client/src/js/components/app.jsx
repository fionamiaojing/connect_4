import React from "react"
import Board from './board.jsx'
import History from './history.jsx';
import BitwiseImplementation from './bitwiseImplementation.jsx';



class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [],
            section: 0,
            title: 'History'
        };

        this.section={
            0: [1, 'History', 'Bitwise Implementation'],
            1: [0, 'Bitwise Implementation', 'Game']
        }

        this.sendGameRecord = this.sendGameRecord.bind(this);
        this.retrieveGameRecords = this.retrieveGameRecords.bind(this);
        this.handleSectionClick = this.handleSectionClick.bind(this);
        this.handleHistoryClick = this.handleHistoryClick.bind(this);
    }

    componentDidMount() {

    }
    
    sendGameRecord(result) {
        this.setState({
            history: [...this.state.history, result]
        })
    }

    retrieveGameRecords() {
    }

    handleSectionClick(event) {
        this.setState({
            section: this.section[this.state.section][0],
            title: this.section[this.section[this.state.section][0]][1]
        })
    }

    handleHistoryClick(event) {
        this.board.resetBoard(this.state.history[event.currentTarget.getAttribute('index')]);
    }

    handleMouseEnter(event) {
        event.currentTarget.classList.add('hover');
    }

    handleMouseLeave(event) {
        event.currentTarget.classList.remove('hover');
    }

    render(){
        return (
            <div>
                {(this.state.section === 0) 
                ? (<Board sendGameRecord={this.sendGameRecord} 
                    onRef={(ref) => (this.board = ref)}
                    handleMouseEnter={this.handleMouseEnter}
                    handleMouseLeave={this.handleMouseLeave}/>) 
                : null}
                <div className="section center">
                    <h2 className="center" 
                    onClick={this.handleSectionClick} 
                    onMouseEnter={(event) => {
                        this.handleMouseEnter(event);
                        this.setState({
                            title: this.section[this.state.section][2]
                        });
                    }}
                    onMouseLeave={(event) => {
                        this.handleMouseLeave(event);
                        this.setState({
                            title: this.section[this.state.section][1]
                        });
                    }}>
                        <span>{this.state.title}</span>
                    </h2>
                </div>
                {((this.state.section === 0) && (<History history={this.state.history} 
                handleHistoryClick={this.handleHistoryClick} 
                handleMouseEnter={this.handleMouseEnter}
                handleMouseLeave={this.handleMouseLeave}/>))
                || ((this.state.section === 1) && (<BitwiseImplementation handleMouseEnter={this.handleMouseEnter}
                    handleMouseLeave={this.handleMouseLeave}/>))}
            </div>
        )
    }
}

export default App;