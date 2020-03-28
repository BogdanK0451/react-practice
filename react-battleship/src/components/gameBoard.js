import React from "react";
import "../index.css";
import { Cell } from "../components/cell.js";

export class GameBoard extends React.Component {
  render() {
    let elements = createGameBoardCells(
      this.props.rows,
      this.props.cols,
      this.props.board
    );
    return (
      <div id={this.props.id} className="battlefield">
        {elements}
      </div>
    );
  }
}

function createGameBoardCells(rows, cols, board) {
  let elements = [];
  for (let i = 0; i < rows + 1; i++) {
    for (let j = 0; j < cols + 1; j++) {
      if (i === 0 && j === 0)
        elements.push(<Cell key={`${i} ${j}`} type="filler" />);
      else if (i === 0 && j !== 0)
        elements.push(<Cell key={`${i} ${j}`} type="colIndex" val={j} />);
      else if (i !== 0 && j === 0)
        elements.push(<Cell key={`${i} ${j}`} type="rowIndex" val={i} />);
      else
        elements.push(
          <Cell
            contains={board[i - 1][j - 1]}
            key={`${i} ${j}`}
            type="playField"
          />
        );
    }
  }
  return elements;
}
