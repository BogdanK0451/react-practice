import React from "react";
import "../index.css";
import { GameBoard } from "../components/gameBoard.js";
import * as logic from "../logic/logic.js";

let fleet = logic.createFleet();
logic.createGameBoard(fleet);

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 10,
      height: 10
    };
  }

  render() {
    return (
      <>
        <div id="game-space">
          <GameBoard
            id="player1"
            rows={this.state.height}
            cols={this.state.width}
          />
          <GameBoard
            id="player2"
            rows={this.state.height}
            cols={this.state.width}
          />
        </div>
      </>
    );
  }
}
