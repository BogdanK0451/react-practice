import React from "react";
import "../index.css";

export class ScoreBoard extends React.Component {
  render() {
    let player1Score = createScoreboardUI(
      this.props.player1Name,
      this.props.player1Fleet
    );
    let player2Score = createScoreboardUI(
      this.props.player2Name,
      this.props.player2Fleet
    );
    return (
      <>
        <div id="winner-container">
          <p className={this.props.winner ? "bounce-in-top" : undefined}>
            {`${this.props.winner ? this.props.winner + " Wins" : ""}`}
          </p>
        </div>
        <div className="scoreboard-container">
          <div className="scoreboard-container-p1"> {player1Score}</div>
          <div className="scoreboard-container-p2"> {player2Score}</div>
        </div>
      </>
    );
  }
}

function createScoreboardUI(playerName, fleet) {
  let scoreboard = [];
  for (const ship in fleet) {
    if (fleet.hasOwnProperty(ship) && typeof fleet[ship] !== "function") {
      for (let i = 0; i < fleet[ship].length; i++) {
        if (i < fleet[ship].hitsTaken())
          scoreboard.push(
            <div key={`${ship}${i}`} className="scoreboard-ship-cell-hit"></div>
          );
        else
          scoreboard.push(
            <div key={`${ship}${i}`} className="scoreboard-ship-cell"></div>
          );
      }
    }
    scoreboard.push(<div key={ship} className="empty-div"></div>);
  }
  return (
    <>
      <p>{playerName}</p>
      {scoreboard}
    </>
  );
}
