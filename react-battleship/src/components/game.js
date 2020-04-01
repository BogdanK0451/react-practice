import React from "react";
import "../index.css";
import { GameBoard } from "./gameBoard.js";
import { ScoreBoard } from "./scoreBoard.js";
import * as logic from "../logic/logic.js";
import {
  FREE,
  TAKEN,
  BOARDHEIGHT,
  BOARDWIDTH,
  NORMAL_CELL
} from "../logic/const.js";
import cloneDeep from "../../node_modules/clone-deep";

let fleet1 = logic.createFleet();
let fleet2 = logic.createFleet();
let board1 = logic.createGameBoard(fleet1);
let board2 = logic.createGameBoard(fleet2);
let player1 = logic.createPlayer("Zel", fleet1, board1);
let player2 = logic.createPlayer("AI", fleet2, board2);

let audioMiss = new Audio("/doom-shotgun.mp3");
let audioHit = new Audio("/death1.wav");
let audioSunk = new Audio("/death3.wav");

function playAudio(audio) {
  if (audio.paused) {
    audio.play();
  } else {
    audio.currentTime = 0;
  }
}

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 10,
      height: 10,
      player1: cloneDeep(player1),
      player2: cloneDeep(player2)
    };
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleCellClick(e) {
    let y = e.target.dataset.identifier[0];
    let x = e.target.dataset.identifier[1];
    let cellContent = e.target.dataset.cell.split(";")[0];
    let shipName = e.target.dataset.cell.split(";")[3];

    if (cellContent === FREE) {
      playAudio(audioMiss);
      let tempArr = player1.board[y][x].split(";");
      tempArr[2] = NORMAL_CELL;
      player1.board[y][x] = tempArr.join(";");
      player1.board[y][x] = player1.board[y][x].replace("open", "closed");
    } else if (cellContent === TAKEN) {
      player1.fleet[shipName].hit();
      if (player1.fleet[shipName].isSunk()) {
        player1.fleet.isFleetDestroyed();
      }
      player1.board[y][x] = player1.board[y][x].replace("open", "closed");
      if (player1.fleet[shipName].isSunk()) {
        playAudio(audioSunk);
        for (let i = 0; i < BOARDHEIGHT; i++)
          for (let j = 0; j < BOARDWIDTH; j++) {
            if (player1.board[i][j].includes(shipName))
              player1.board[i][j] = player1.board[i][j].replace(
                "open",
                "closed"
              );
          }
      } else playAudio(audioHit);
    }
    this.setState({ player1: cloneDeep(player1) });
  }

  render() {
    return (
      <>
        <div id="game-space">
          <ScoreBoard
            player1Name={this.state.player1.name}
            player1Fleet={this.state.player1.fleet}
            player2Name={this.state.player2.name}
            player2Fleet={this.state.player2.fleet}
          />
          <GameBoard
            id="player1"
            onCellClick={this.handleCellClick}
            board={this.state.player1.board}
            rows={this.state.height}
            cols={this.state.width}
          />
          <GameBoard
            id="player2"
            onCellClick={this.handleCellClick}
            board={this.state.player2.board}
            rows={this.state.height}
            cols={this.state.width}
          />
          <button>Restart</button>
        </div>
      </>
    );
  }
}
