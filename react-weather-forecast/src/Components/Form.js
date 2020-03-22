import React from 'react';
import ReactDOM from 'react-dom';

const KELVIN=273.15; //kelvin to C

export class Form extends React.Component {

  render() {
    return (
      <form>
        <div id="search">
          <input ></input>
          <button onClick={this.props.onClick}>Check Weather</button>
        </div>
        <div id="result"> 
          {this.props.fetchedWeather.weather ? <Result fetchedWeather={this.props.fetchedWeather}/> : <Dummy/>}
          <button>Celsius ℃</button>
          <button>Fahrenheit ℉</button>
        </div>
      </form>
    )
  }
}

class Result extends React.Component{
  render(){
    return(
      <>
      <p id="type">Sunny</p>
      <p id="temperature"> -- ℃</p>
      <p id="location">New York, US</p>
      <p id="feels">Feels like {this.props.fetchedWeather.main.feels_like-KELVIN}</p>
      <p id="min-max">Min {} Max {}</p>
      </>
    )
  }
}

class Dummy extends React.Component{
  render(){
    return(
      <>
        <p id="type">Sunny</p>
        <p id="temperature"> -- ℃</p>
        <p id="location">New York, US</p>
        <p id="feels">Feels like -- ℃</p>
        <p id="min-max">Min: -- ℃ Max -- ℃</p>
      </>
    )
  }

}