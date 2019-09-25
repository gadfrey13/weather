import React, { Component } from "react";
import "typeface-roboto";
import "./App.css";
import {connect} from 'react-redux';
import WeatherContainer from "../../components/Weather/WeatherContainer/WeatherContainer";
import Loading from "../../components/Loading/Loading";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundry";
import {requestWeather, requestWeatherForecast } from '../../actions/actions';


const mapStateToProps = state => {
  return {
    weather: state.requestWeather.weather,
    isPendingWeather: state.requestWeather.isPendingWeather,
    errorWeather: state.requestWeather.error,
    weatherForecast: state.requestWeatherForecast.weatherForecast,
    isPendingWeatherForecast: state.requestWeatherForecast.isPendingWeatherForecast,
    errorForecast: state.requestWeatherForecast.errorForecast,
    isLogin: state.userLogIn.bol
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestWeather: (type,city,country) => dispatch(requestWeather(type,city,country)),
    onRequestWeatherForecast: (type,city,country) => dispatch(requestWeatherForecast(type,city,country))
  }
}

class App extends Component {
  
  componentDidMount() {
    const split = this.props.searchField.toLowerCase().split(/[ ,]+/);//split the string by " " or ,
    console.log(split);
    if (split.length === 2) {
      const city = split[0];
      const country = split[1];
      console.log("This is the app");
      this.props.onRequestWeatherForecast('forecast',city,country);
      this.props.onRequestWeather('weather',city,country);
   
    }

    if (split.length === 3) {
      const city = split[0] + " " + split[1];
      const country = split[2];
      this.props.onRequestWeatherForecast('forecast',city,country);
      this.props.onRequestWeather('weather',city,country);
    }
  }  

  render() {
    // const { weatherData, foreCastData } = this.state;
    const {weather,weatherForecast,isPendingWeather,isPendingWeatherForecast, isLogin} = this.props;
    return (
      <div>
        <ErrorBoundary>
          {!isPendingWeather && !isPendingWeatherForecast ? (
            <WeatherContainer
              weatherData={weather}
              foreCastData={weatherForecast.list}
              isLogin={isLogin}
            />
          ) : (
            <Loading />
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
