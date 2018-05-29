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
]

const BitwiseImplementation = (props) => {
    return (
        <div>
            <table className="bordered-table">
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


            <div className="explanation center">
                <h3><a name="#motivation">Motivation</a></h3>
                <ul>
                    <li className="left">Using bitwise representations can reduce the dimensionality of the arrays.</li>
                    <li className="left">It makes calculations a lot simplifed and faster.</li>
                    
                    
                </ul>
            </div>


            <div><h3><a name="#binary-board">Make the board binary</a></h3>
                <div className="explanation center">
                    <ul>
                        <li className="left">Separating each player's moves makes clear bitwise representations and extensible applications.</li>
                        <li className="left">The combination of the players' board arrays contain the full information of the board.</li>
                        <li className="left">Because of the nature of droping a game-piece in a column, storing a column in a binary number makes interactions more easily tracked than storing a row in a binary number.</li>
                    </ul>
                </div>
                <div className="board center">
                    {game[0].p1.map((col, colIndex) => (
                        <div className="column" key={colIndex} >
                        {Array(6).fill().map((_, rowIndex) => (
                            <div className="cell center" key={rowIndex}>{
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
            </div >


            <div className="center"><h3 ><a name="#additional-setup">Additional Setup</a></h3>
                <div className="explanation center">
                    <span className="left">To better keep track of the game dynamics, more variables are used to store informations.</span>
                    <ol>
                        <li className="left">Player's turn status is to be kept.</li>
                        <li className="left">The column index the player drop the game-piece is to be kept in a binary number.</li>
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


            <div className="center"><h3 ><a name="#basic-move">Basic Move</a></h3>
                <div className="explanation center">
                    <span className="left">To mimic dropping a game-piece in a column, one will:</span>
                    <ol>
                        <li className="left">Determine where the next piece should be in the column.</li>
                        <li className="left">Toggle the piece.</li>
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
                        <li className="left">Next available piece: (101 | 10) + 1 = 111 + 1 = 1000</li>
                        <li className="left">Toggle the piece for player X: 10 ^ 1000 = 1010</li>
                        <li className="left">Check if it's the last piece: 1000 &amp; (1 &lt;&lt; 5) = 1000 &amp; 100000 = 0,<br/>a falsy value meaning the column is not fully occupied</li>
                    </ul>
                </div>
                
            </div>


        </div>
    )
}

export default BitwiseImplementation;