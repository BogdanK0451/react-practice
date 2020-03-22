import React from 'react';
import ReactDOM from 'react-dom';
import roundTo from 'round-to';

const KELVIN=273.15; //kelvin to C

export class Form extends React.Component {

  render() {
    return (
      <>
      <form>
        <div id="search">
          <input onChange={this.props.onChange} value={this.props.inputValue}></input>
          <button onClick={this.props.onClick}>Check Weather</button>
        </div>
        <div id="result"> 
          {this.props.fetchedWeather.weather ? <Result format={this.props.temperatureFormat} fetchedWeather={this.props.fetchedWeather}/> : <Dummy/>}
        </div>
        <button type="button" data-format="c" onClick={this.props.handleTemperature}>Celsius ℃</button>
        <button type="button" data-format="f" onClick={this.props.handleTemperature}>Fahrenheit ℉</button>
      </form>
      </>
    )
  }
}

class Result extends React.Component{

  toC(k){
    return k-KELVIN;  
  }

  toF(k){
    return roundTo(this.toC(k)*(9/5)+32,1);
  }

  render(){
    if(this.props.format==="c"){
      return(
        <>
        <p id="type">{this.props.fetchedWeather.weather[0].main}</p>
        <p id="temperature">{roundTo(this.toC(this.props.fetchedWeather.main.temp),1)} ℃</p>
        <p id="location">{this.props.fetchedWeather.name}, {this.props.fetchedWeather.sys.country}</p>
        <p id="feels">Feels like {roundTo(this.toC(this.props.fetchedWeather.main.feels_like),1)} ℃</p>
        <p id="min-max">Min: {roundTo(this.toC(this.props.fetchedWeather.main.temp_min),1)}℃ Max: {roundTo(this.toC(this.props.fetchedWeather.main.temp_max),1)}℃</p>
        </>
      )
    }
    else if(this.props.format === "f"){
      return(
        <>
        <p id="type">{this.props.fetchedWeather.weather[0].main}</p>
        <p id="temperature">{roundTo(this.toF(this.props.fetchedWeather.main.temp),1)} °F</p>
        <p id="location">{this.props.fetchedWeather.name}, {this.props.fetchedWeather.sys.country}</p>
        <p id="feels">Feels like {roundTo(this.toF(this.props.fetchedWeather.main.feels_like),1)} °F</p>
        <p id="min-max">Min: {roundTo(this.toF(this.props.fetchedWeather.main.temp_min),1)}°F Max: {roundTo(this.toF(this.props.fetchedWeather.main.temp_max),1)}°F</p>
        </>
      )
    }
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