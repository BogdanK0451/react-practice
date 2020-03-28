import React from "react";
import "../index.css";
import { GameBoard } from "../components/gameBoard.js";
import * as logic from "../logic/logic.js";
import cloneDeep from "../../node_modules/clone-deep";

let fleet = logic.createFleet();
let board1 = logic.createGameBoard(fleet);
let board2 = logic.createGameBoard(fleet);

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 10,
      height: 10,
      board1: cloneDeep(board1),
      board2: cloneDeep(board2)
    };
  }

  render() {
    return (
      <>
        <div id="game-space">
          <GameBoard
            id="player1"
            board={this.state.board1}
            rows={this.state.height}
            cols={this.state.width}
          />
          <GameBoard
            id="player2"
            board={this.state.board2}
            rows={this.state.height}
            cols={this.state.width}
          />
        </div>
      </>
    );
  }
}
