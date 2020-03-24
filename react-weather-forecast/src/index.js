import React from "react";
import ReactDOM from "react-dom";
import "../src/index.css";
import { Form } from "../src/Components/Form";
import cloneDeep from "clone-deep";

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myCity: "Belgrade",
      weather: {},
      temperatureFormat: "c",
      backgroundURL: "",
      loading: true
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTemperature = this.handleTemperature.bind(this);
  }

  l() {
    console.log(this.state.weather);
    console.log(this.state.myCity);
  }
  handleChange(e) {
    this.setState({ myCity: e.target.value });
  }

  handleTemperature(e) {
    this.setState({ temperatureFormat: e.target.dataset.format });
  }

  handleClick(e) {
    this.setState({ loading: true });
    e.preventDefault();
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.myCity}&appid=0ba6323855c72753ca4f2f7674b8af5a`,
      { mode: "cors" }
    )
      .then(response => response.json())
      .then(data => {
        if (data.cod === "404") {
          window.alert("City with that name doesn't exist");
        } else {
          this.setState({ weather: cloneDeep(data) });

          return fetch(
            `https://source.unsplash.com/1920x1080/?{${this.state.weather.weather[0].main}},{weather}`,
            { mode: "cors" }
          )
            .then(response => response)
            .then(data => {
              this.setState({ backgroundURL: data.url });
              this.setState({ loading: false });
            })
            .catch(function(err) {
              console.log(err);
            });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.state.myCity}&appid=0ba6323855c72753ca4f2f7674b8af5a`,
      { mode: "cors" }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ weather: cloneDeep(data) });

        fetch(
          `https://source.unsplash.com/1920x1080/?{${this.state.weather.weather[0].main}},{weather}`,
          {
            mode: "cors"
          }
        )
          .then(response => response)
          .then(data => {
            this.setState({ backgroundURL: data.url });
            this.setState({ loading: false });
          })
          .catch(function(err) {
            console.log(err);
          });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div
        id="background"
        style={{ backgroundImage: `url(${this.state.backgroundURL})` }}
      >
        <Form
          inputValue={this.state.myCity}
          onChange={this.handleChange}
          onClick={this.handleClick}
          handleTemperature={this.handleTemperature}
          temperatureFormat={this.state.temperatureFormat}
          fetchedWeather={this.state.weather}
        />

        <div className={`${this.state.loading === true ? "lds-roller" : ""}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Weather />
  </React.StrictMode>,
  document.getElementById("root")
);
