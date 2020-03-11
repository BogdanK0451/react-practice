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
    this.BOOKS = this.props.books.map(function(book) {
      console.log(book);
      return <Book data={book} />;
    });
    console.log(this.props.books);

    return (
      <div id="book-container">
        <BookInfoFields />
        {this.BOOKS}
      </div>
    );
  }
}
