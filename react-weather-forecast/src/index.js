import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';
import {Form} from '../src/Components/Form'
import cloneDeep from 'clone-deep'



class Weather extends React.Component{
  constructor(props){
    super(props);
    this.state={
      myCity: "Belgrade",
      weather:{}
    }

    this.handleClick = this.handleClick.bind(this);
    this.l=this.l.bind(this);
  }
  

l(){
  console.log(this.state.weather);
}
  
handleClick(e){
  e.preventDefault();
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.myCity}&appid=0ba6323855c72753ca4f2f7674b8af5a`,{mode:"cors"})
  .then(response => response.json()).then(data => this.setState({weather: cloneDeep(data)}))
  .catch(function(err){
    console.log(err);
  });
}

componentDidMount(){
  setInterval(this.l,1000);
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.myCity}&appid=0ba6323855c72753ca4f2f7674b8af5a`,{mode:"cors"})
  .then(response => response.json()).then(data => this.setState({weather: cloneDeep(data)}))
  .catch(function(err){
    console.log(err);
  });
}

render(){
  return(
    <Form onClick={this.handleClick} fetchedWeather={this.state.weather}/>
    )
}

}

ReactDOM.render(
  <React.StrictMode>
    <Weather />
  </React.StrictMode>,
  document.getElementById('root')
);


function toCelsius(){

}

function toFahrenheit(){

}

