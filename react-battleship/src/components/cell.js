import React from "react";
import "../index.css";

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
      return (
        <>
          {typeof this.props.contains === "string" ? (
            <div className={`${this.props.type} battlefield-cell ship`}></div>
          ) : this.props.contains === 2 ? (
            <div className={`${this.props.type} battlefield-cell`}>*</div>
          ) : (
            <div className={`${this.props.type} battlefield-cell`}></div>
          )}
        </>
      );
    }
  }
}
