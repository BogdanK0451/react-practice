import React from "react";
import "../index.css";

export class Book extends React.Component {
  render() {
    console.log("lmao");
    return (
      <>
        <div>
          <h3>{this.props.data.TITLE}</h3>
        </div>
        <div>
          <h3>{this.props.data.AUTHOR}</h3>
        </div>
        <div>
          <h3>{this.props.data.PAGES}</h3>
        </div>
        <div>
          <h3>{this.props.data.READ}</h3>
        </div>
        <div>
          <button> Change Read Status of {this.props.data.TITLE}</button>
        </div>
        <div>
          <button>Remove {this.props.data.TITLE}</button>
        </div>
      </>
    );
  }
}
