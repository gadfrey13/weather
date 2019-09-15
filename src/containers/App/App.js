import React, {Component} from 'react';
import 'typeface-roboto';
import './App.css';
import Clouds from '../../components/Clouds/Clouds';
import Navbar from '../../components/NavBar/Navbar';
import { taggedTemplateExpression } from '@babel/types';
import WeatherContainer from '../../components/Weather/WeatherContainer/WeatherContainer';
import Loading from '../../components/Loading/Loading';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundry';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import SignIn from '../../components/Signin/SignIn';
import Register from '../../components/Register/Register';
//API Key
const API_KEY = '640285b24dd4963e697ea5be67cf8165';

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      country: props.country,
      city: props.city,
      weatherData: {},
      foreCastData: {},
      loadingWeather: true,
      loadingForeCast: true,
    }
  }

  componentDidMount(){
    this.getCurrentWeather();
    this.getForeCast();
  }

  componentDidUpdate(prevProps,prevState){
   
    if(this.state.city !== prevState.city){
        this.getCurrentWeather();
        this.getForeCast();
    }
  }

  // Parameter: property, type
  getData = (property,type="weather") => {
    const {country,city} = this.state;
    fetch(`http://api.openweathermap.org/data/2.5/${type}?q=${city},${country}&appid=${API_KEY}&units=imperial`)
    .then(res => {
      return res.json();
    })
    .then(data => {

      if(type==="weather" && Number(data.cod) === 200){
        this.setState({weatherData: data});
      }else if(type === "forecast" && Number(data.cod) === 200){
        this.setState({foreCastData: data})
      }

      
      this.loadWeatherPage(type,data.cod);
     
    }).catch(err => {
      console.log(err);
    });
  }

  //prevents props from being undefined
  //reason: component is rendered before data is returned
  loadWeatherPage = (type,cod) => {
     
      if(type==="weather" && Number(cod) === 200){
        this.setState({loadingWeather: false});
      }else if(type === "forecast" && Number(cod) === 200){
        this.setState({loadingForeCast: false})
      }

  }

  getCurrentWeather = () => {
      this.getData("weatherData");
  }

  getForeCast = () => {
      this.getData("foreCastData", "forecast");
  }



  render(){
    const {weatherData, foreCastData} = this.state;
    return(
      <div>
        <ErrorBoundary>
        {(!this.state.loadingWeather && !this.state.loadingForeCast) ? <WeatherContainer weatherData={weatherData} foreCastData={foreCastData.list} />  : <Loading />}
        </ErrorBoundary>   
      </div>
    )
  }
}

export default App;
