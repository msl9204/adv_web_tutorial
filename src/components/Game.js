import React from "react";
import Board from "./Board";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            step: 0,
            xIsNext: true,
            preview_index: 0,
            hidevalue: true
        };
    }

    calculrateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // for (let i = 0; i < lines.length; i++) {
        //     const [a, b, c] = lines[i];
        //     if (
        //         squares[a] &&
        //         squares[a] === squares[b] &&
        //         squares[a] === squares[c]
        //     ) {
        //         return squares[a];
        //     }
        // }

        // return null;

        for (const [a, b, c] of lines) {
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[b] === squares[c]
            ) {
                return squares[a];
            }
        }
        return null;
    }
    nextplayer(idx) {
        return idx % 2 === 0 ? "X" : "O";
    }

    handleClick(i) {
        const { step } = this.state;
        const history = this.state.history.slice(0, this.state.step + 1);
        const current = history[step];
        const squares = current.squares.slice(); // array를 복사를 해두고

        if (squares[i] || this.calculrateWinner(squares)) {
            return;
        }
        squares[i] = this.nextplayer(step);
        this.setState({
            history: history.concat([{ squares: squares }]),
            step: step + 1
        });
    }

    goto(idx) {
        this.setState({
            step: idx
        });
    }

    renderpreview(idx) {
        this.setState({
            preview_index: idx,
            hidevalue: !this.state.hidevalue
        });
    }

    hideswitch() {
        this.setState({
            hidevalue: !this.state.hidevalue
        });
    }

    getMoves() {
        return this.state.history.map((step, idx) => {
            const desc = idx ? `Go to move #${idx}` : "Go to game start";

            return (
                <li key={idx}>
                    <button
                        onClick={() => {
                            this.goto(idx);
                        }}
                        onMouseEnter={() => this.renderpreview(idx)}
                        onMouseLeave={() => this.hideswitch()}
                        style={{ marginBottom: "10px" }}
                    >
                        {desc}
                    </button>
                </li>
            );
        });
    }

    render() {
        const history = this.state.history;
        const squares = history[this.state.step].squares;
        const winner = this.calculrateWinner(squares);
        let status;
        if (winner) {
            status = `Winner: ${winner}`;
        } else {
            status = `Next Player : ${this.nextplayer(this.state.step)}`;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>

                <div className="game-info">
                    <div>{status}</div>
                    <div>
                        {this.state.step >= 1 && (
                            <button
                                onClick={() => {
                                    this.setState({
                                        step: this.state.step - 1,
                                        history: this.state.history.slice(
                                            0,
                                            this.state.step
                                        )
                                    });
                                }}
                            >
                                Undo
                            </button>
                        )}
                    </div>
                    <ol>{this.getMoves()}</ol>
                </div>
                {this.state.hidevalue === false && (
                    <div
                        className="preview-section"
                        style={{
                            marginLeft: "50px",
                            opacity: "0.3"
                        }}
                    >
                        <Board
                            squares={history[this.state.preview_index].squares}
                            hide-option={this.state.hidevalue}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default Game;
