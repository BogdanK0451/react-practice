import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import cloneDeep from "clone-deep";
import { BookForm } from "./components/BookForm";
import { Books } from "./components/Books";

function Header(props) {
  return (
    <header>
      <h1>Library</h1>
      <button onClick={props.onClickBookForm}>Add New Book</button>
    </header>
  );
}

function BookInfoFields(props) {
  return (
    <>
      <div>
        <h2>Title</h2>
      </div>
      <div>
        <h2>Author</h2>
      </div>
      <div>
        <h2>Pages</h2>
      </div>
      <div>
        <h2>Read</h2>
      </div>
      <div>
        <h2>Change Read Status</h2>
      </div>
      <div>
        <h2>Remove Book</h2>
      </div>
    </>
  );
}

class Book extends React.Component {
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

const initialState = {
  TITLE: "",
  AUTHOR: "",
  PAGES: "",
  READ: "",
  booksAddable: false
};

class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = cloneDeep(initialState);
    this.state.books = [];

    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick1() {
    if (this.state.booksAddable === false)
      this.setState({
        booksAddable: true
      });
    else
      this.setState({
        booksAddable: false
      });
  }

  handleChange(e) {
    const t = e.target;
    const val = t.name === "READ" ? (t.checked ? "true" : "false") : t.value;
    const name = t.name;
    this.setState({ [name]: val });
  }

  handleClick2(e) {
    e.preventDefault();

    let truth = truthy(
      this.state.TITLE,
      this.state.AUTHOR,
      this.state.PAGES,
      this.state.READ
    );

    if (truth) {
      this.setState({
        books: this.state.books.concat([
          {
            TITLE: this.state.TITLE,
            AUTHOR: this.state.AUTHOR,
            PAGES: this.state.PAGES,
            READ: this.state.READ
          }
        ])
      });
      this.setState(initialState);
      this.forceUpdate();
    } else window.alert("fill all fields");
  }

  render() {
    return (
      <div id="content">
        <Header onClickBookForm={this.handleClick1} />
        {this.state.booksAddable && (
          <BookForm
            values={[
              this.state.TITLE,
              this.state.AUTHOR,
              this.state.PAGES,
              this.state.READ
            ]}
            onChange={this.handleChange}
            onClickBookAdd={this.handleClick2}
          />
        )}
        <Books books={this.state.books} />
      </div>
    );
  }
}

ReactDOM.render(<Library />, document.getElementById("root"));

function truthy(a, b, c, d) {
  return a && b && c && d;
}
