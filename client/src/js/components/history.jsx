import React from 'react';
import moment from 'moment';

moment.updateLocale('en', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s  : 'a few sec',
        ss : '%d sec',
        m:  "a min",
        mm: "%d min",
        h:  "an hr",
        hh: "%d hr",
        d:  "a day",
        dd: "%d days",
        M:  "a mon",
        MM: "%d mon",
        y:  "a yr",
        yy: "%d yr"
    }
});

const History = (props) => {
    return (
        props.history.length 
            ? (<div>
                <h2 className="history center">History</h2><br/>
                <table className="center">
                    <tbody className="records">
                    {props.history.map((record, index) => (
                        <tr key={index} onClick={props.handleHistoryClick} index={index} className="record">
                            <td>{record.winner ? 'Win' : 'Draw'}</td>
                            <td>{record.players[0]}</td>
                            <td>:</td>
                            <td>{record.players[1]}</td>
                            <td className="time">{moment(record.createdAt).fromNow()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>) 
            : null
    );
}

export default History;