import React from "react";
import "../index.css";
import { Book } from "../components/Book";

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

export class Books extends React.Component {
  render() {
    let removeBook = this.props.removeBook;
    let editBook = this.props.editBook;

    this.BOOKS = this.props.books.map(function(book) {
      return (
        <Book
          key={book.TITLE + book.AUTHOR}
          removeBook={removeBook}
          editBook={editBook}
          data={book}
        />
      );
    });

    return (
      <div id="book-container">
        <BookInfoFields />
        {this.BOOKS}
      </div>
    );
  }
}
