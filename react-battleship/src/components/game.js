//wasteful rerenders

import React from "react";
import "../index.css";
import { GameBoard } from "./gameBoard.js";
import { ScoreBoard } from "./scoreBoard.js";
import * as logic from "../logic/logic.js";
import {
  FALSE,
  TRUE,
  BOARDHEIGHT,
  BOARDWIDTH,
  NORMAL_CELL,
  PLAYER1,
  GAMEOVER
} from "../logic/const.js";
import cloneDeep from "../../node_modules/clone-deep";

function playAudio(audio) {
  if (audio.paused) {
    audio.play();
  } else {
    audio.currentTime = 0;
  }
}

function createPlayers() {
  let fleet1 = logic.createFleet();
  let fleet2 = logic.createFleet();
  let board1 = logic.createGameBoard(fleet1);
  let board2 = logic.createGameBoard(fleet2);
  let player1 = logic.createPlayer("Zel", fleet1, board1);
  let player2 = logic.createPlayer("AI", fleet2, board2);

  return { player1, player2 };
}

let players = createPlayers(); // window[dataset.player] ne radi
let AI = logic.createAI();
let turnHistory = [];

let shipMissAudio = new Audio("/doom-shotgun.mp3");
let shipHitAudio = new Audio("/death1.wav");
let shipSunkAudio = new Audio("/death3.wav");

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: BOARDWIDTH,
      height: BOARDHEIGHT,
      turn: 1,
      turnOwner: PLAYER1,
      gameOver: GAMEOVER,
      winner: undefined,
      player1: cloneDeep(players.player1),
      player2: cloneDeep(players.player2)
    };
    this.timeOut = null;
    this.counter = 0;
    this.lastTurn = 1;

    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleRestartClick = this.handleRestartClick.bind(this);
    this.handlePreviousTurnClick = this.handlePreviousTurnClick.bind(this);
    this.handleNextTurnClick = this.handleNextTurnClick.bind(this);
  }
  componentDidMount() {
    // turnHistory.push(cloneDeep(this.state));
  }

  checkForWinner() {
    if (this.state.player1.fleet.isFleetDestroyed()) {
      this.setState({
        gameOver: !this.state.gameOver,
        winner: this.state.player2.name
      });
    } else if (this.state.player2.fleet.isFleetDestroyed()) {
      this.setState({
        gameOver: !this.state.gameOver,
        winner: this.state.player1.name
      });
    }
  }

  handlePreviousTurnClick(e) {}
  handleNextTurnClick(e) {}
  handleRestartClick(e) {
    clearTimeout(this.timeOut);
    players = createPlayers();
    this.setState({
      width: BOARDWIDTH,
      height: BOARDHEIGHT,
      turn: 1,
      turnOwner: PLAYER1,
      gameOver: GAMEOVER,
      winner: undefined,
      player1: cloneDeep(players.player1),
      player2: cloneDeep(players.player2)
    });
  }
  handleCellClick(e, y, x, hasShip, shipName, player) {
    function handleMiss() {
      let tempArr = players[player].board[y][x].split(";");
      tempArr[2] = NORMAL_CELL;
      players[player].board[y][x] = tempArr.join(";");
      players[player].board[y][x] = players[player].board[y][x].replace(
        "open",
        "closed"
      );
    }
    function handleHit() {
      players[player].fleet[shipName].hit();
      if (players[player].fleet[shipName].hasSunk()) {
        players[player].fleet.sinkOneShip();
      }
      players[player].board[y][x] = players[player].board[y][x].replace(
        "open",
        "closed"
      );
    }
    function handleNearbyCells() {
      for (let i = 0; i < BOARDHEIGHT; i++)
        for (let j = 0; j < BOARDWIDTH; j++) {
          if (players[player].board[i][j].includes(shipName))
            players[player].board[i][j] = players[player].board[i][j].replace(
              "open",
              "closed"
            );
        }
    }
    function handleNearbyDiagonalCells() {
      if (y - 1 >= 0 && x - 1 >= 0) {
        players[player].board[y - 1][x - 1] = players[player].board[y - 1][
          x - 1
        ].replace("open", "closed");
      }
      if (y + 1 < BOARDHEIGHT && x - 1 >= 0)
        players[player].board[y + 1][x - 1] = players[player].board[y + 1][
          x - 1
        ].replace("open", "closed");
      if (y - 1 >= 0 && x + 1 < BOARDWIDTH)
        players[player].board[y - 1][x + 1] = players[player].board[y - 1][
          x + 1
        ].replace("open", "closed");
      if (y + 1 < BOARDHEIGHT && x + 1 < BOARDWIDTH)
        players[player].board[y + 1][x + 1] = players[player].board[y + 1][
          x + 1
        ].replace("open", "closed");
    }
    //if function was called through cell Click and not through AI function
    if (y === undefined || x === undefined) {
      y = parseInt(e.target.dataset.identifier[0]);
      x = parseInt(e.target.dataset.identifier[1]);
      hasShip = e.target.dataset.cell.split(";")[0];
      shipName = e.target.dataset.cell.split(";")[3];
      player = e.target.dataset.player;
    }

    players[player].lastClickedCell = y.toString() + x.toString();

    let updateTurnOwnerFlag = 0; // if we rerender by using setState inside the next block, for some reason page rerenders 4 times instead of 2
    if (hasShip === FALSE) {
      playAudio(shipMissAudio);
      handleMiss();
      updateTurnOwnerFlag = 1;
    } else if (hasShip === TRUE) {
      handleHit();

      if (players[player].fleet[shipName].hasSunk()) {
        playAudio(shipSunkAudio);
        handleNearbyCells();
      } else {
        playAudio(shipHitAudio);
        handleNearbyDiagonalCells();
      }
    }
    this.checkForWinner();

    if (player === "player1") {
      if (updateTurnOwnerFlag)
        this.setState(
          {
            player1: cloneDeep(players[player]),
            turn: this.state.turn + 1,
            turnOwner: !this.state.turnOwner
          },
          this.generateAITurn
        );
      else
        this.setState(
          {
            player1: cloneDeep(players[player]),
            turn: this.state.turn + 1
          },
          this.generateAITurn
        );
    } else if (player === "player2") {
      if (updateTurnOwnerFlag)
        this.setState(
          {
            player2: cloneDeep(players[player]),
            turn: this.state.turn + 1,
            turnOwner: !this.state.turnOwner
          },
          this.generateAITurn
        );
      else
        this.setState(
          {
            player2: cloneDeep(players[player]),
            turn: this.state.turn + 1
          },
          this.generateAITurn
        );
    }
  }
  generateAITurn() {
    if (
      this.state.turnOwner &&
      players.player2.name === "AI" &&
      !this.state.gameOver
    ) {
      let timeoutLength = Math.floor(Math.random() * 1000) + 500;
      let y;
      let x;
      let fail = false;
      //timeout to simulate human player
      this.timeOut = setTimeout(() => {
        if (!AI.huntedShip) {
          do {
            let rand =
              players.player1.validMoves[
                Math.floor(Math.random() * players.player1.validMoves.length)
              ];
            y = Math.floor(rand / 10);
            x = rand % 10;
            let indexOfRand = players.player1.validMoves.indexOf(rand);

            if (players.player1.board[y][x].includes("open")) {
              players.player1.validMoves.splice(indexOfRand, 1);
              fail = false;

              // for readability
              let hasShip = players.player1.board[y][x].split(";")[0];
              let shipName = players.player1.board[y][x].split(";")[3];

              this.handleCellClick(
                undefined,
                y,
                x,
                hasShip,
                shipName,
                "player1"
              );

              if (
                hasShip === TRUE &&
                !players.player1.fleet[shipName].hasSunk()
              ) {
                AI.huntedShip = shipName;
                AI.huntedShipHullHits.push([y, x]);
                console.log("hola", AI.huntedShipHullHits);
              }
            } else fail = true;
          } while (fail);
        } else if (AI.huntedShip) {
          let legalMoves = AI.findLegalMoves(players.player1.board);
          let legalMove =
            legalMoves[Math.floor(Math.random() * legalMoves.length)];
          console.log(legalMoves, legalMove);
          y = legalMove[0];
          x = legalMove[1];

          let hasShip = players.player1.board[y][x].split(";")[0];
          let shipName = players.player1.board[y][x].split(";")[3];

          this.handleCellClick(undefined, y, x, hasShip, shipName, "player1");

          if (hasShip === TRUE && !players.player1.fleet[shipName].hasSunk())
            AI.huntedShipHullHits.push([y, x]);

          if (players.player1.fleet[AI.huntedShip].hasSunk()) {
            console.log("NOBRO");
            AI.huntedShip = null;
            AI.huntedShipHullHits.length = 0;
          }
        }
      }, timeoutLength);
    }

    function AILogic() {}
  }

  render() {
    this.counter++; //render counter
    return (
      <>
        <div id="game-space">
          <ScoreBoard
            turnOwner={this.state.turnOwner}
            winner={this.state.winner}
            player1Name={this.state.player1.name}
            player1Fleet={this.state.player1.fleet}
            player2Name={this.state.player2.name}
            player2Fleet={this.state.player2.fleet}
          />
          <GameBoard
            id="player1"
            lastClickedCell={this.state.player1.lastClickedCell}
            onCellClick={
              this.state.turnOwner && !this.state.gameOver
                ? this.handleCellClick
                : undefined
            }
            board={this.state.player1.board}
            rows={this.state.height}
            cols={this.state.width}
          />
          <GameBoard
            id="player2"
            lastClickedCell={this.state.player2.lastClickedCell}
            onCellClick={
              !this.state.turnOwner && !this.state.gameOver
                ? this.handleCellClick
                : undefined
            }
            gameOver={this.state.gameOver}
            board={this.state.player2.board}
            rows={this.state.height}
            cols={this.state.width}
          />
          <button onClick={this.handleRestartClick}>Restart</button>
          <button onClick={this.handlePreviousTurnClick}>Previous Turn</button>
          <button onClick={this.handleNextTurnClick}>Next Turn</button>
        </div>
      </>
    );
  }
}
