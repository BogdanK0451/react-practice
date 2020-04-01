import React from "react";
import "../index.css";
import { MISS, HIT, TAKEN, NORMAL_CELL } from "../logic/const.js";
export class Cell extends React.Component {
  render() {
    if (this.props.type === "colIndex") {
      return (
        <>
          <div className="coord-x">
            {String.fromCharCode(64 + this.props.val)}
          </div>
        </>
      );
    } else if (this.props.type === "rowIndex") {
      return (
        <>
          <div className="coord-y">
            <p>{this.props.val}</p>
          </div>
        </>
      );
    } else if (this.props.type === "filler") {
      return <div></div>;
    } else {
      if (
        this.props.cellData.split(";")[1] === "open" &&
        this.props.player === "player1"
      ) {
        return (
          <>
            {this.props.cellData.split(";")[0] === TAKEN ? (
              <div
                data-player={this.props.player}
                data-cell={this.props.cellData}
                data-identifier={this.props.identifier}
                className={`${this.props.type} ship-cell`}
                onClick={this.props.onCellClick}
              ></div>
            ) : (
              <div
                data-player={this.props.player}
                data-cell={this.props.cellData}
                data-identifier={this.props.identifier}
                className={`${this.props.type} base-cell`}
                onClick={this.props.onCellClick}
              ></div>
            )}
          </>
        );
      } else if (
        this.props.cellData.split(";")[1] === "open" &&
        this.props.player === "player2"
      ) {
        return (
          <div
            data-cell={this.props.cellData}
            data-identifier={this.props.identifier}
            className={`${this.props.type} base-cell`}
            onClick={this.props.onCellClick}
          ></div>
        );
      } else if (this.props.cellData.split(";")[1] === "closed") {
        return (
          <>
            {this.props.cellData.split(";")[0] === HIT ? (
              <div className={`${this.props.type} ship-hit`}></div>
            ) : this.props.cellData.split(";")[0] === MISS &&
              this.props.cellData.split(";")[2] === NORMAL_CELL ? (
              <div className={`${this.props.type} base-cell`}>
                <div className="ship-miss"></div>
              </div>
            ) : (
              <div className={`${this.props.type} base-cell`}>
                <div className="auto-ship-miss"></div>
              </div>
            )}
          </>
        );
      }
    }
  }
}
