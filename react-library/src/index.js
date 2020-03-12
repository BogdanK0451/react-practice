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

    if (localStorage.getItem("books") !== null)
      this.state.books = cloneDeep(JSON.parse(localStorage.getItem("books")));
    else this.state.books = [];

    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveBook = this.handleRemoveBook.bind(this);
    this.handleChangeReadOfBook = this.handleChangeReadOfBook.bind(this);
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

    let truth = truthy(this.state.TITLE, this.state.AUTHOR, this.state.PAGES);

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
    } else window.alert("fill all fields");
  }

  handleRemoveBook(e) {
    console.log(e.target.dataset.title);
    this.setState({
      books: this.state.books.filter(function(book) {
        return (
          e.target.dataset.title !== book.TITLE &&
          e.target.dataset.author !== book.AUTHOR
        );
      })
    });
  }

  handleChangeReadOfBook(e) {
    let clonedBooks = cloneDeep(this.state.books);
    let bookIndex = clonedBooks.findIndex(function(book) {
      return (
        book.TITLE === e.target.dataset.title &&
        book.AUTHOR === e.target.dataset.author
      );
    });
    if (clonedBooks[bookIndex].READ === "true")
      clonedBooks[bookIndex].READ = "false";
    else clonedBooks[bookIndex].READ = "true";
    this.setState({
      books: clonedBooks
    });
  }

  render() {
    localStorage.setItem("books", JSON.stringify(this.state.books));

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
        <Books
          removeBook={this.handleRemoveBook}
          editBook={this.handleChangeReadOfBook}
          books={this.state.books}
        />
      </div>
    );
  }
}

ReactDOM.render(<Library />, document.getElementById("root"));

function truthy(a, b, c) {
  return a && b && c;
}
