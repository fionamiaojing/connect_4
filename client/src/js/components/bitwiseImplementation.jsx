import React from 'react';

let game = [
    {
        p1: [0, 0, 1, 2, 5, 0, 5],
        p2: [0, 3, 0, 1, 2, 1, 2],
        fullBoard: [1, 1, 1, 1, 1, 1, 1]
    },
    {
        p1: [0, 0, 1, 2, 5, 0, 45],
        p2: [0, 3, 0, 1, 2, 1, 18],
        fullBoard: [1, 1, 1, 1, 1, 1, 0]
    },
    {
        p1: [0, 0, 1, 6, 13, 10, 0],
        p2: [0, 0, 6, 9, 2, 5, 0],
        fullBoard: [1, 1, 1, 1, 1, 1, 1]
    },
];

const Slides0 = (props) => (
    <div className="slide center">
        <h3 className="center">Motivation</h3>
        <div className="explanation center">
            <ul>
                <li className="left">Using bitwise representations can reduce the dimensionality of the arrays.</li>
                <li className="left">It makes calculations a lot simplifed and faster.</li>
            </ul>
        </div>
    </div>
);

const Table1 = (props) => (
    <table className={`bordered-table ${props.position}`} onClick={props.onClick}>
        <thead>
            <tr>
                <th colSpan="3">Bitwise Operators</th>
            </tr>
            <tr>
                <th>Operator</th>
                <th>Name</th>
                <th>Example</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>&amp;</td>
                <td>AND</td>
                <td>0101 &amp; 0011 = 0001</td>
            </tr>
            <tr>
                <td>|</td>
                <td>OR</td>
                <td>0101 | 0011 = 0111</td>
            </tr>
            <tr>
                <td>^</td>
                <td>XOR</td>
                <td>0101 ^ 0011 = 0110</td>
            </tr>
            <tr>
                <td>~</td>
                <td>NOT</td>
                <td>~0101 = 1010</td>
            </tr>
            <tr>
                <td>&lt;&lt;</td>
                <td>Zero Fill Left Shift</td>
                <td>0101 &lt;&lt; 1 = 1010</td>
            </tr>
            <tr>
                <td>&gt;&gt;</td>
                <td>Signed Right Shift</td>
                <td>0101 &gt;&gt; 1 = 0010</td>
            </tr>
        </tbody>
    </table>
);

const Slides1 = (props) => (
    <div className="slide center">
        <h3 className="center">Basic Bitwise Operators</h3>
        <Table1 position="center"/>
    </div>
);

const Slides2 = (props) => (
    <div className="slide center">
        <h3>Make the board binary</h3>
        <div className="explanation center">
            <ul>
                <li className="left">Separating each player's moves makes clear bitwise representations and extensible applications.</li>
                <li className="left">The combination of the players' board arrays contain the full information of the board.</li>
                <li className="left">Because of the nature of droping a checker in a column, storing a column in a binary number makes interactions more easily tracked than storing a row in a binary number.</li>
            </ul>
        </div>
        <div className="board center">
            {game[0].p1.map((col, colIndex) => (
                <div className="column" key={colIndex} >
                {Array(6).fill().map((_, rowIndex) => (
                    <div className="cell center medium" key={rowIndex}>{
                        ((game[0].p1[colIndex] & (1 << rowIndex)) && ('O')) ||
                        ((game[0].p2[colIndex] & (1 << rowIndex)) && ('X')) ||
                        ('')
                    }</div>
                ))}
                </div>
            ))
            }
        </div>
        <div className="subSections">
            <div>
                <div><h4>O:</h4></div>
                <div className="board center">
                    {game[0].p1.map((col, colIndex) => (
                        <div className="column" key={colIndex} >
                        {Array(3).fill().map((_, rowIndex) => (
                            <div className="cell center smaller" key={rowIndex}>{
                                ((game[0].p1[colIndex] & (1 << rowIndex)) && ('O')) ||
                                ('')
                            }</div>
                        ))}
                        </div>
                    ))
                    }
                </div>
                <br/>
                <div className="board center">
                    {game[0].p1.map((col, colIndex) => (
                        <div className="column" key={colIndex} >
                        {Array(4).fill().map((_, rowIndex) => (
                            <div className={`cell center smaller ${rowIndex === 0 ? 'borderless' : 'vertical'}`} key={rowIndex}>{
                                ((rowIndex === 0) && (game[0].p1[colIndex] + (colIndex === 0 ? '' : ','))) ||
                                ((game[0].p1[colIndex] & (1 << (rowIndex - 1))) && ('1')) ||
                                ('0')
                            }</div>
                        ))}
                        </div>
                    ))
                    }
                </div>
            </div>
            <div>
                <div><h4>X:</h4></div>
                <div className="board center">
                    {game[0].p2.map((col, colIndex) => (
                        <div className="column" key={colIndex} >
                        {Array(3).fill().map((_, rowIndex) => (
                            <div className="cell center smaller" key={rowIndex}>{
                                ((game[0].p2[colIndex] & (1 << rowIndex)) && ('X')) ||
                                ('')
                            }</div>
                        ))}
                        </div>
                    ))
                    }
                </div>
                <br/>
                <div className="board center">
                    {game[0].p2.map((col, colIndex) => (
                        <div className="column" key={colIndex} >
                        {Array(4).fill().map((_, rowIndex) => (
                            <div className={`cell center smaller ${rowIndex === 0 ? 'borderless' : 'vertical'}`} key={rowIndex}>{
                                ((rowIndex === 0) && (game[0].p2[colIndex] + (colIndex === 0 ? '' : ','))) ||
                                ((game[0].p2[colIndex] & (1 << (rowIndex - 1))) && ('1')) ||
                                ('0')
                            }</div>
                        ))}
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    </div>
);

const Slides3 = (props) => (
    <div className="slide center">
        <h3 >Additional Setup</h3>
        <div className="explanation center">
            <span className="left">To better keep track of the game dynamics, more variables are used to store informations.</span>
            <ol>
                <li className="left">Player's turn status is to be kept.</li>
                <li className="left">The column index the player drop the checker is to be kept in a binary number.</li>
                <li className="left">Current board's column occupied status is to be kept in a binary number.</li>
            </ol>
        </div>
        <div className="subSections">
            <div>
                <div><h4>partial column:</h4></div>
                <div className="board center">
                    {game[0].p1.map((col, colIndex) => (
                        <div className="column" key={colIndex} >
                        {Array(7).fill().map((_, rowIndex) => (
                            <div className={`cell center smaller ${rowIndex === 6 ? 'borderless' : ''}`} key={rowIndex}>{
                                ((game[0].p1[colIndex] & (1 << rowIndex)) && ('O')) ||
                                ((game[0].p2[colIndex] & (1 << rowIndex)) && ('X')) ||
                                ((rowIndex === 6) && (game[0].fullBoard[colIndex].toString())) ||
                                ('')
                            }</div>
                        ))}
                        </div>
                    ))
                    }
                </div>
            </div>
            <div>
                <div><h4>full column:</h4></div>
                <div className="board center">
                    {game[1].p1.map((col, colIndex) => (
                        <div className="column" key={colIndex} >
                        {Array(7).fill().map((_, rowIndex) => (
                            <div className={`cell center smaller ${rowIndex === 6 ? 'borderless' : ''}`} key={rowIndex}>{
                                ((game[1].p1[colIndex] & (1 << rowIndex)) && ('O')) ||
                                ((game[1].p2[colIndex] & (1 << rowIndex)) && ('X')) ||
                                ((rowIndex === 6) && (game[1].fullBoard[colIndex].toString())) ||
                                ('')
                            }</div>
                        ))}
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
        <div className="subSections">
            <div>
                <div><h4>column index</h4></div>
                <div className="board center">
                    {game[0].p1.map((col, colIndex) => (
                        <div className="column" key={colIndex} >
                        {Array(11).fill().map((_, rowIndex) => (
                            <div className={`cell center smaller ${(rowIndex === 0) ? 'top-border' : (rowIndex <= 7 ? 'borderless vertical' : '')}`} key={rowIndex}>{
                                ((rowIndex <= 0) && (1 << colIndex)) ||
                                ((rowIndex <= 7) && ((colIndex === rowIndex - 1) ? '1' : (colIndex > rowIndex - 1 ? '0' : ''))) ||
                                ((game[0].p1[colIndex] & (1 << (rowIndex - 8))) && ('O')) ||
                                ((game[0].p2[colIndex] & (1 << (rowIndex - 8))) && ('X')) ||
                                ('')
                            }</div>
                        ))}
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    </div>
);

const Table2 = (props) => (
    <table className={`bordered-table ${props.position}`} onClick={props.onClick}>
        <thead>
            <tr>
                <th colSpan="3">Variables to Store</th>
            </tr>
            <tr>
                <th>Variables</th>
                <th>Description</th>
                <th>Example</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>p1</td>
                <td>p1's board array</td>
                <td>[0, 0, 1, 2, 5, 0, 5]</td>
            </tr>
            <tr>
                <td>p2</td>
                <td>p2's board array</td>
                <td>[2, 1, 2, 1, 0, 3, 0]</td>
            </tr>
            <tr>
                <td>fullBoard</td>
                <td>binary number showing <br/>column availability</td>
                <td>1 1 1 1 0 1 1</td>
            </tr>
            <tr>
                <td>col</td>
                <td>binary column index where <br/>the current move is on</td>
                <td>1 0 0 0</td>
            </tr>
            <tr>
                <td>turn</td>
                <td>player's turn</td>
                <td>"p1"</td>
            </tr>
            <tr>
                <td>toggled</td>
                <td>toggled checker's position</td>
                <td>1 0 0</td>
            </tr>
        </tbody>
    </table>
);

const Slides4 = (props) => (
    <div className="slide center">
        <h3 >Variables to store</h3>
        <Table2 position="center" />
    </div>
);

const Slides5 = (props) => (
    <div className="slide center">
        <h3 >Basic Moves</h3>
        <div className="explanation center">
            <span className="left">To mimic dropping a checker in a column, one will:</span>
            <ol>
                <li className="left">Determine where the next slot should be in the column.</li>
                <li className="left">Toggle the checker.</li>
                <li className="left">Determine if the current column is fully occupied.</li>
            </ol>
        </div>
        <div className="subSections">
            <div>
                <div><h4>O:</h4></div>
                <div className="board center">
                    {Array(2).fill().map((col, colIndex) => (
                        <div className="column" key={colIndex} >
                        {Array(6).fill().map((_, rowIndex) => (
                            <div className={`cell center smaller ${colIndex === 0 ? 'borderless vertical' : ''}`} key={rowIndex}>{
                                ((colIndex === 0) && (game[0].p1[6] & (1 << rowIndex)) && ('1')) ||
                                ((colIndex === 1) && (game[0].p1[6] & (1 << rowIndex)) && ('O')) ||
                                ('')
                            }</div>
                        ))}
                        </div>
                    ))
                    }
                </div>
            </div>
            <div>
                <div><h4>X:</h4></div>
                <div className="board center">
                    {Array(2).fill().map((col, colIndex) => (
                        <div className="column" key={colIndex} >
                        {Array(6).fill().map((_, rowIndex) => (
                            <div className={`cell center smaller ${colIndex === 0 ? 'borderless vertical' : ''}`} key={rowIndex}>{
                                ((colIndex === 0) && (game[0].p2[6] & (1 << rowIndex)) && ('1')) ||
                                ((colIndex === 1) && (game[0].p2[6] & (1 << rowIndex)) && ('X')) ||
                                ('')
                            }</div>
                        ))}
                        </div>
                    ))
                    }
                </div>
            </div>
            <div>
                <div><h4>X+:</h4></div>
                <div className="board center">
                    {Array(2).fill().map((col, colIndex) => (
                        <div className="column" key={colIndex} >
                        {Array(6).fill().map((_, rowIndex) => (
                            <div className={`cell center smaller ${colIndex === 0 ? 'borderless vertical' : ''}`} key={rowIndex}>{
                                ((colIndex === 0) && ((((game[0].p1[6] | game[0].p2[6]) + 1) & (1 << rowIndex)) && ('1') || (((game[0].p1[6] | game[0].p2[6])) & (1 << rowIndex)) && ('0'))) ||
                                ((colIndex === 1) && (((game[0].p1[6] | game[0].p2[6]) + 1) & (1 << rowIndex)) && ('+')) ||
                                ('')
                            }</div>
                        ))}
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
        <div className="explanation center">
            <ul>
                <li className="left">Opening in current column: <br/>1111111 &amp; col = 1111111 &amp; 1 = 1, a truthy value meaning there's an opening</li>
                <li className="left">Next available slot: <br/>(101 | 10) + 1 = 111 + 1 = 1000</li>
                <li className="left">Toggle the checker for player X: <br/>10 ^ 1000 = 1010</li>
                <li className="left">Check if it's the last checker: <br/>1000 &amp; (1 &lt;&lt; 5) = 1000 &amp; 100000 = 0, a falsy value meaning the column is not fully occupied</li>
                <li className="left">If it's the last checker, reflect that in fullBoard: <br/>1111111 ^ col = 1111111 ^ 1 = 1111110</li>
            </ul>
        </div>
                
    </div>
);

const Slides6 = (props) => (
    <div className="slide center">
        <h3 >Rules to Win</h3>
        <div className="explanation center">
            <span className="left">To win Connect Four one must be the first player to get four of the same colored checkers in a row either horizontally, vertically or diagonally. And based on the previous setup, one will performs two checks to determine a winning case:</span>
            <ol>
                <li className="left">connect 4 in the same column.</li>
                <li className="left">connect 4 among different columns.</li>
            </ol>
        </div>
    </div>
);

class Slides7 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            table1: false,
            table2: false,
        };
    }
    
    render() {
    return (
        <div className="slide center">
            <h3 >Same Column Check</h3>
            <div className="explanation center">
                <span className="left">Only the four consecutive checkers related to current toggled checker are interested</span>
                <span className="left"><br/>All of such four checkers must be the same to win.</span>
                <span className="left"><br/><br/><b>Case 1:</b></span>
            </div>
            <div className="subSections">
                <div>
                    <div><h4>toggled checker:</h4></div>
                    <div className="board center">
                        {Array(6).fill().map((col, colIndex) => (
                            <div className="column" key={colIndex} >
                            {Array(6).fill().map((_, rowIndex) => (
                                <div className={`cell center smaller ${([0, 2, 4].includes(colIndex) && 'borderless vertical') || ([1, 3].includes(colIndex) && 'borderless') || ''}`} key={rowIndex}>{
                                    ((colIndex === 0) && ((15 & (1 << rowIndex)) && (((15 & 4 & (1 << rowIndex)) && ('1')) || ((15 ^ 4 & (1 << rowIndex)) && ('0'))) || '')) ||
                                    ((colIndex === 1) && ((4 & (1 << rowIndex)) && ('=') || '')) ||
                                    ((colIndex === 2) && (15 & (1 << rowIndex)) && ('1')) ||
                                    ((colIndex === 3) && (4 & (1 << rowIndex)) && ('&')) ||
                                    ((colIndex === 4) && (4 & (1 << rowIndex)) && ('1')) ||
                                    ((colIndex === 5) && ((4 & (1 << rowIndex)) && ('O')) || '') ||
                                    ('')
                                }</div>
                            ))}
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div>
                    <div><h4>current column:</h4></div>
                    <div className="board center">
                        {Array(6).fill().map((col, colIndex) => (
                            <div className="column" key={colIndex} >
                            {Array(6).fill().map((_, rowIndex) => (
                                <div className={`cell center smaller ${([0, 2, 4].includes(colIndex) && 'borderless vertical') || ([1, 3].includes(colIndex) && 'borderless') || ''}`} key={rowIndex}>{
                                    ((colIndex === 0) && ((15 & (1 << rowIndex)) && (((15 & 6 & (1 << rowIndex)) && ('1')) || ((15 ^ 6 & (1 << rowIndex)) && ('0'))) || '')) ||
                                    ((colIndex === 1) && ((4 & (1 << rowIndex)) && ('=') || '')) ||
                                    ((colIndex === 2) && (15 & (1 << rowIndex)) && ('1')) ||
                                    ((colIndex === 3) && (4 & (1 << rowIndex)) && ('&')) ||
                                    ((colIndex === 4) && (6 & (1 << rowIndex)) && ('1')) ||
                                    ((colIndex === 5) && ((6 & (1 << rowIndex)) && ('O')) || '') ||
                                    ('')
                                }</div>
                            ))}
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
            <div className="explanation center">
                <span className="left">If the toggled checker is between row 0 to 3, <br/>(toggled checker position &amp; 1111) = 100 &amp; 1111 = 100, a truthy value.</span>
                <span className="left"><br/>Then (the current column: <br/>p1[col] &amp; 1111 ^ 1111) = 110 &amp; 1111 ^ 1111 = 110 ^ 1111 = 1001, a truthy value meaning not winning.</span>
                <span className="left"><br/><br/><b>Case 2:</b></span>
            </div>
            <div className="subSections">
                <div>
                    <div><h4>toggled checker:</h4></div>
                    <div className="board center">
                        {Array(6).fill().map((col, colIndex) => (
                            <div className="column" key={colIndex} >
                            {Array(6).fill().map((_, rowIndex) => (
                                <div className={`cell center smaller ${([0, 2, 4].includes(colIndex) && 'borderless vertical') || ([1, 3].includes(colIndex) && 'borderless') || ''}`} key={rowIndex}>{
                                    ((colIndex === 0) && ((63 & (1 << rowIndex)) && (((15 & 32 & (1 << rowIndex)) && ('1')) || ((15 ^ 32 & (1 << rowIndex)) && ('0'))) || '')) ||
                                    ((colIndex === 1) && ((4 & (1 << rowIndex)) && ('=') || '')) ||
                                    ((colIndex === 2) && (15 & (1 << rowIndex)) && ('1')) ||
                                    ((colIndex === 3) && (4 & (1 << rowIndex)) && ('&')) ||
                                    ((colIndex === 4) && (32 & (1 << rowIndex)) && ('1')) ||
                                    ((colIndex === 5) && ((32 & (1 << rowIndex)) && ('O')) || '') ||
                                    ('')
                                }</div>
                            ))}
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div>
                    <div><h4>shifted 1111:</h4></div>
                    <div className="board center">
                        {Array(6).fill().map((col, colIndex) => (
                            <div className="column" key={colIndex} >
                            {Array(6).fill().map((_, rowIndex) => (
                                <div className={`cell center smaller ${([0, 2, 4].includes(colIndex) && 'borderless vertical') || ([1, 3].includes(colIndex) && 'borderless') || ''}`} key={rowIndex}>{
                                    ((colIndex === 0) && ((63 & (1 << rowIndex)) && (((60 & 32 & (1 << rowIndex)) && ('1')) || ((60 ^ 32 & (1 << rowIndex)) && ('0'))) || '')) ||
                                    ((colIndex === 1) && ((4 & (1 << rowIndex)) && ('=') || '')) ||
                                    ((colIndex === 2) && ((63 & (1 << rowIndex)) && (60 & (1 << rowIndex) && ('1')) || (''))) ||
                                    ((colIndex === 3) && (4 & (1 << rowIndex)) && ('&')) ||
                                    ((colIndex === 4) && (32 & (1 << rowIndex)) && ('1')) ||
                                    ((colIndex === 5) && ((32 & (1 << rowIndex)) && ('O')) || '') ||
                                    ('')
                                }</div>
                            ))}
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div>
                    <div><h4>current column:</h4></div>
                    <div className="board center">
                        {Array(6).fill().map((col, colIndex) => (
                            <div className="column" key={colIndex} >
                            {Array(6).fill().map((_, rowIndex) => (
                                <div className={`cell center smaller ${([0, 2, 4].includes(colIndex) && 'borderless vertical') || ([1, 3].includes(colIndex) && 'borderless') || ''}`} key={rowIndex}>{
                                    ((colIndex === 0) && ((63 & (1 << rowIndex)) && (((60 & 60 & (1 << rowIndex)) && ('1')) || ((60 ^ 60 & (1 << rowIndex)) && ('0'))) || '')) ||
                                    ((colIndex === 1) && ((4 & (1 << rowIndex)) && ('=') || '')) ||
                                    ((colIndex === 2) && ((63 & (1 << rowIndex)) && (60 & (1 << rowIndex) && ('1')) || (''))) ||
                                    ((colIndex === 3) && (4 & (1 << rowIndex)) && ('&')) ||
                                    ((colIndex === 4) && (60 & (1 << rowIndex)) && ('1')) ||
                                    ((colIndex === 5) && ((60 & (1 << rowIndex)) && ('O')) || '') ||
                                    ('')
                                }</div>
                            ))}
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
            <div className="explanation center">
                <span className="left">If the toggled checker is row 4 and up, shift the check 1111 left <br/>(1111 &lt;&lt; 2) = 111100, <br/>until <br/>(toggled checker position &amp; 111100) = 100000 &amp; 111100 = 100000, a truthy value.<br/></span>
                <span className="left">Then <br/>(the current column: p1[col] &amp; 111100 ^ 111100) = 111100 &amp; 111100 ^ 111100 = 111100 ^ 111100 = 0, a falsy value meaning winning.</span>
            </div>
            {this.state.table2 ? <Table2 position="float right" onClick={() => {this.setState({table2: false})}}/> : <div className="float right" onClick={() => {this.setState({table2: true})}}>Stored Variables</div>}
            {this.state.table1 ? <Table1 position="float left" onClick={() => {this.setState({table1: false})}}/> : <div className="float left" onClick={() => {this.setState({table1: true})}}>Bitwise Operator</div>}
        </div>
    )}
};

class Slides8 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            table1: false,
            table2: false,
        };
    }
    
    render() {
    return (
        <div className="slide center">
            <h3 >Inter-Column Check</h3>
            <div className="explanation center">
                <span className="left">Only the four consecutive checkers related to current column are interested</span>
                <span className="left"><br/>All of such four checkers in a row, or in diagonals must be the same to win.</span>
                <span className="left"><br/><br/><b>1. Determine related columns:</b></span>
            </div>
            <div className="subSections">
                <div>
                    <div><h4>toggled column:</h4></div>
                    <div className="board center">
                        {Array(7).fill().map((col, colIndex) => (
                            <div className="column" key={colIndex} >
                            {Array(9).fill().map((_, rowIndex) => (
                                <div className={`cell center smaller ${(rowIndex <= 4 && 'borderless') || ''}`} key={rowIndex}>{
                                    ((rowIndex === 0) && ((63 & (1 << colIndex)) && (((32 & 15 & (1 << colIndex)) && ('1')) || ((32 ^ 15 & (1 << colIndex)) && ('0'))) || '')) ||
                                    ((rowIndex === 1) && ((4 & (1 << colIndex)) && ('=') || '')) ||
                                    ((rowIndex === 2) && (15 & (1 << colIndex)) && ('1')) ||
                                    ((rowIndex === 3) && (4 & (1 << colIndex)) && ('&')) ||
                                    ((rowIndex === 4) && ((63 & (1 << colIndex)) && (((32 & (1 << colIndex)) && ('1')) || ('0')))) ||
                                    ((rowIndex === 8) && ((32 & (1 << colIndex)) && ('O')) || '') ||
                                    ('')
                                }</div>
                            ))}
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div>
                    <div><h4>shifted 1111:</h4></div>
                    <div className="board center">
                        {Array(7).fill().map((col, colIndex) => (
                            <div className="column" key={colIndex} >
                            {Array(9).fill().map((_, rowIndex) => (
                                <div className={`cell center smaller ${(rowIndex <= 4 && 'borderless') || ''}`} key={rowIndex}>{
                                    ((rowIndex === 0) && ((63 & (1 << colIndex)) && (((32 & 60 & (1 << colIndex)) && ('1')) || ((32 ^ 60 & (1 << colIndex)) && ('0'))) || '')) ||
                                    ((rowIndex === 1) && ((4 & (1 << colIndex)) && ('=') || '')) ||
                                    ((rowIndex === 2) && (60 & (1 << colIndex)) && ('1')) ||
                                    ((rowIndex === 3) && (4 & (1 << colIndex)) && ('&')) ||
                                    ((rowIndex === 4) && ((63 & (1 << colIndex)) && (((32 & (1 << colIndex)) && ('1')) || ('0')))) ||
                                    ((rowIndex === 8) && ((32 & (1 << colIndex)) && ('O')) || '') ||
                                    ('')
                                }</div>
                            ))}
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
            <div className="explanation center">
                <span className="left">If the toggled column is not in column [1, 10, 100, 1000], <br/>(toggled column position &amp; 1111) = 100000 &amp; 1111 = 0, a falsy value meaning the current focused columns are not related.</span>
                <span className="left"><br/>Keep shifting 1111 left until: <br/>(toggled column position &amp; 111100) = 100000 &amp; 111100 = 100000, a truthy value meaning the current focused columns are related to winning check.</span>
                <span className="left"><br/><br/><b>2. Determine the starting column of the focused columns:</b></span>
                <span className="left"><br/><br/>(x ^ -x) would yield the rightmost 1 in the binary representation of x. (<a href="https://www.calleerlandsson.com/rubys-bitwise-operators/#the-bitwise-not-operator">Ruby’s Bitwise Operators</a>)</span>
                <span className="left"><br/>So the starting column of the focus: <br/>(current focus columns &amp; - current focus columns) = 0000111100 &amp; 1111000100 = 100.</span>
            </div>
            <div className="subSections">
                <div>
                    <div><h4>O's current board on related 4 columns:</h4></div>
                    <div className="board center">
                        {Array(7).fill().map((col, colIndex) => (
                            <div className="column" key={colIndex} >
                            {Array(5).fill().map((_, rowIndex) => (
                                <div className={`cell center smaller ${(rowIndex <= 0 && 'borderless') || ''}`} key={rowIndex}>{
                                    ((rowIndex === 0) && ((7 & (1 << colIndex)) && (((4 & (1 << colIndex) && '1')) || '0'))) ||
                                    ((game[2].p1[colIndex] & (1 << (rowIndex - 1))) && ('O')) ||
                                    ('')
                                }</div>
                            ))}
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
            <div className="explanation center">
                <span className="left"><br/><br/><b>3. Test column by column for row, left diagonal and right diagonal:</b></span>
                <span className="left"><br/><br/><b>3. i) keep track of three status simultaneously: row, left diagonal, right diagonal</b></span>
                <span className="left"><br/><br/>Set up three variables that takes in the player's current focused column, <br/>leftDiag = rightDiag = row = p1[curCol] = 1</span>
                <span className="left"><br/><br/><b>3. ii) Loop through each focused column:</b></span>
                <span className="left"><br/><br/>Shift the current check column left by 1 each time as it iterate to the next focused column. Keep iterating when: <br/>(curCol &amp; current focused columns) = 100 &amp; 111100 = 100, a truthy value meaning continuing checking.</span>
                <span className="left"><br/><br/><b>3. iii) Check each column with the 3 trackers:</b></span>
                <span className="left"><br/><br/><b>a) row:</b></span>
                <span className="left"><br/><br/>Peform bitwise conjunction on the row variable and the current check column: <br/>row = row &amp; p1[curCol] = 1 &amp; 110 = 0. <br/>The remaining 1 on each location meaning the current line is still eligible for winning check.</span>
                <span className="left"><br/><br/><b>b) diagonals:</b></span>
                <span className="left"><br/><br/>Checking diagonals require one more step of shifting than checking rows; shift leftDiag left by 1 and shift rightDiag right by 1. Then Peform bitwise conjunction on the diag variables and the current check column: <br/>leftDiag = (leftDiag &lt;&lt; 1) &amp; p1[curCol] = (1 &lt;&lt; 1) &amp; 110 = 10 &amp; 110 = 10; <br/>rightDiag = (rightDiag &gt;&gt; 1) &amp; p1[curCol] = (1 &gt;&gt; 1) &amp; 10 = 0 &amp; 110 = 0. <br/>The remaining 1 on each location meaning the current diagonal line is still eligible for winning check.</span>
                <span className="left"><br/><br/><b>3. iv) Stop the check when last focused column is iterated:</b></span>
                <span className="left"><br/><br/>The current focused column gets eventually shifted left until: (curCol &amp; current focused columns) = 1000000 &amp; 111100 = 0, a falsy value meaning the current check is done. Then check: <br/>(leftDiag | row | rightDiag) = 1000 | 0 | 0 = 1000, a truthy value meaning there's at least one line of 4 consecutive checkers existing.</span>
                <span className="left"><br/><br/><b>4. Loop through all related 4-columns:</b></span>
                <span className="left"><br/><br/>If none of the trackers in step 3 iv) is truthy, loop through step 1 to step 3 by shifting current focused columns left by 1, until one winning condition is found or all possiblilities of related columns are checked.</span>
            </div>
            {this.state.table2 ? <Table2 position="float right" onClick={() => {this.setState({table2: false})}}/> : <div className="float right" onClick={() => {this.setState({table2: true})}}>Stored Variables</div>}
            {this.state.table1 ? <Table1 position="float left" onClick={() => {this.setState({table1: false})}}/> : <div className="float left" onClick={() => {this.setState({table1: true})}}>Bitwise Operator</div>}
        </div>
    )}
};

const Slides9 = (props) => (
    <div className="slide center">
        <h3 >Summary</h3>
        <Table1 position="center" /><br/>
        <Table2 position="center" />
        <h3>Implementation</h3>
        <pre className="left">
            <code>
                {`//p1, p2, fullBoard, col, turn, 
//when a checker is toggled:

//determine if the column is all occupied before placing:
if (fullBoard & col) {

    //determine current piece:
    let piece = (p1[col] | p2[col]) + 1;
    
    //toggle piece:
    p[turn][col] ^= piece;

    //determine if the column is all occupied after placing:
    ((1 << 5) & piece) && (fullBoard ^= col);

    //determine win: 
    if (checkWin(p[turn], piece, col)) {
        return 'p[turn] wins';
        resetBoard();
    } else if (!fullBoard){
        return 'Draw!';
        resetBoard();
    } else {
        turn = nextTurn(turn);
    }
}

function checkWin(player, piece, col) {
    //same column check:
    let curCheck = 1111;

    //align the curCheck with the toggle piece;
    while (!(curCheck & piece)) {
        curCheck <<= 1;
    }

    //check the top 4 checkers of the current column
    if (!(player[col] & curCheck) ^ curCheck) {
        return true;
    }


    //inter-column check:
    let curCol, leftDiag, rightDiag, row;
    curCheck = 1111;

    //find the 4 related columns to the toggled column
    while (!((curCheck & fullBoard) ^ curCheck)) {
        if (curCheck & col) {

            //find the starting focused column
            curCol = curCheck & (-curCheck);

            //make 3 trackers
            leftDiag = rightDiag = row = player[curCol];

            //shift the current focus column left until the 4th column is iterated
            curCol <<= 1;
            while (curCol & curCheck) {

                //row check:
                row &= player[curCol];

                //diagnoal lines check:
                leftDiag = (leftDiag << 1) & player[curCol];
                rightDiag = (rightDiag >> 1) & player[curCol];

                curCol <<= 1;
            }

            //check if any of the line has 4 consecutive checkers
            if (leftDiag | row | rightDiag) {
                return true;
            }
        }
        curCheck <<= 1;
    }
    return false;
}
                `}
                `}
            </code>
        </pre>
    </div>
);

class BitwiseImplementation extends React.Component {
    constructor(props) {
        super(props);
        
        this.page = {
            0: [9, 1, <Slides0 />],
            1: [0, 2, <Slides1 />],
            2: [1, 3, <Slides2 />],
            3: [2, 4, <Slides3 />],
            4: [3, 5, <Slides4 />],
            5: [4, 6, <Slides5 />],
            6: [5, 7, <Slides6 />],
            7: [6, 8, <Slides7 />],
            8: [7, 9, <Slides8 />],
            9: [8, 0, <Slides9 />],
        };
        this.state = {
            page: 0,
        };
    }

    
    render() {
        return (
            <div>
                <nav className="nav">
                    <div onClick={() => {this.setState({page: this.page[this.state.page][0]})}}>&lt;---</div>
                    <div>page:<select type="text" value={this.state.page} onChange={(event) => {this.setState({page: event.target.value})}}>
                        {Object.keys(this.page).map((key) => (
                            <option value={key} key={key}>{key}</option>
                        ))}
                    </select></div>
                    <div onClick={() => {this.setState({page: this.page[this.state.page][1]})}}>---&gt;</div>
                </nav>
                {this.page[this.state.page][2]}

            </div>
        )
    }
}


export default BitwiseImplementation;