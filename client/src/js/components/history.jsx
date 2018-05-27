import React from 'react';

const History = (props) => {
    console.log(props);
    return (
        
            props.history.length 
                ? (<div>
                    <h2 className="history center">History</h2><br/>
                    <table className="records center">
                        <tbody>
                        {props.history.map((record, index) => (
                            <tr key={index}>
                                <td>{record[0][1] ? 'Win' : 'Draw'}</td>
                                <td>{record[0][0]}</td>
                                <td>:</td>
                                <td>{record[1][0]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>) : null
                
        
    );
}

export default History;