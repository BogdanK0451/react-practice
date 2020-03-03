import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class bookForm extends React.Component{
  render(){
    return (
    <form>
      <div id="form_container">
        <input/>
        <input/>
        <input/>
        <input/>
      </div>
    </form>
    );
  }
}


class Book extends React.Component{


  render(){
    return(
      <div>
        <div class="book_data">

        </div>
      </div>
    );
  }
}

class Library extends React.Component{
  renderBookForm(){
    return <bookForm/>
  }

  render (){
    return (
      <div id="content">      
       <header>
         {this.renderBookForm()}
       </header>
      </div>
    );
    }
}

ReactDOM.render(
  <Library/>,
  document.getElementById('root')
);