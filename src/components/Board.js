import React, { Component } from "react";
import Square from "./Square";

class Board extends Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => {
                    this.props.onClick(i);
                }}
            />
        );
    }

    renderRow(rowNum) {
        return (
            <div className="row">
                {this.renderSquare(rowNum * 3 + 0)}
                {this.renderSquare(rowNum * 3 + 1)}
                {this.renderSquare(rowNum * 3 + 2)}
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
            </div>
        );
    }
}

// JSX == XML
// 1. Root가 있어야 한다. (여기서는 1개의 루트안에 9개가 묶이도록 해야함)
// 2. 열린 tag가 있으면 닫힌 tag가 있어야한다.

export default Board;
