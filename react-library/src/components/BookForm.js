import React from "react";
import "../index.css";

export class BookForm extends React.Component {
  render() {
    return (
      <form>
        <label key={"TITLE label"}>TITLE</label>

        <input
          type="text"
          value={this.props.values[0]}
          name="TITLE"
          key="TITLE"
          onChange={this.props.onChange}
        />

        <label key={"AUTHOR label"}>AUTHOR</label>

        <input
          type="text"
          value={this.props.values[1]}
          name="AUTHOR"
          key="AUTHOR"
          onChange={this.props.onChange}
        />

        <label key={"PAGES label"}>PAGES</label>

        <input
          type="number"
          value={this.props.values[2]}
          name="PAGES"
          key="PAGES"
          onChange={this.props.onChange}
        />

        <label key={"READ label"}>READ</label>

        <input
          type="checkbox"
          value={this.props.values[3]}
          name="READ"
          key="READ"
          onChange={this.props.onChange}
        />

        <button onClick={this.props.onClickBookAdd}>Submit Book</button>
      </form>
    );
  }
}
