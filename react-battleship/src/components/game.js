import React from "react";
import "../index.css";
import { GameBoard } from "../components/gameBoard.js";
import * as logic from "../logic/logic.js";
import {
  FREE,
  TAKEN,
  RESERVED,
  BOARDHEIGHT,
  BOARDWIDTH,
  NORMAL_CELL
} from "../logic/const.js";
import cloneDeep from "../../node_modules/clone-deep";

let fleet1 = logic.createFleet();
let fleet2 = logic.createFleet();
let board1 = logic.createGameBoard(fleet1);
let board2 = logic.createGameBoard(fleet2);
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
      board1: cloneDeep(board1),
      board2: cloneDeep(board2)
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
      let tempArr = board1[y][x].split(";");
      tempArr[2] = NORMAL_CELL;
      board1[y][x] = tempArr.join(";");
      board1[y][x] = board1[y][x].replace("open", "closed");
    } else if (cellContent === TAKEN) {
      fleet1[shipName].hit();
      board1[y][x] = board1[y][x].replace("open", "closed");
      if (fleet1[shipName].isSunk()) {
        playAudio(audioSunk);
        for (let i = 0; i < BOARDHEIGHT; i++)
          for (let j = 0; j < BOARDWIDTH; j++) {
            if (board1[i][j].includes(shipName))
              board1[i][j] = board1[i][j].replace("open", "closed");
          }
      } else playAudio(audioHit);
    }

    this.setState({ board1: board1 });
  }

  render() {
    return (
      <>
        <div id="game-space">
          <GameBoard
            id="player1"
            onCellClick={this.handleCellClick}
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
