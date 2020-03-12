import React from "react";
import "../index.css";

export class Book extends React.Component {
  render() {
    return (
      <>
        <div>
          <h3 key={this.props.data.TITLE}>{this.props.data.TITLE}</h3>
        </div>
        <div>
          <h3 key={this.props.data.AUTHOR}>{this.props.data.AUTHOR}</h3>
        </div>
        <div>
          <h3 key={this.props.data.PAGES}>{this.props.data.PAGES}</h3>
        </div>
        <div>
          <h3 key={this.props.data.READ}>{this.props.data.READ}</h3>
        </div>
        <div>
          <button
            data-title={this.props.data.TITLE}
            data-author={this.props.data.AUTHOR}
            key={"button " + this.props.data.TITLE}
            onClick={this.props.editBook}
          >
            Change Read Status of {this.props.data.TITLE}
          </button>
        </div>
        <div>
          <button
            key={"remove button " + this.props.data.TITLE}
            data-title={this.props.data.TITLE}
            data-author={this.props.data.AUTHOR}
            onClick={this.props.removeBook}
          >
            Remove {this.props.data.TITLE}
          </button>
        </div>
      </>
    );
  }
}
