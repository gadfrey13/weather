import React, { Component } from "react";
import WeatherContainer from "../Weather/WeatherContainer/WeatherContainer";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { requestWeather, requestWeatherForecast } from "../../actions/actions";
import Loading from "../Loading/Loading";
import { tsParenthesizedType } from "@babel/types";

const mapStateToProps = state => {
  return {
    searchField: state.searchWeather.searchField,
    user: state.loadUser.user,
    isLogin: state.userLogIn.bol,
    weather: state.requestWeather.weather,
    weatherForecast: state.requestWeatherForecast.weatherForecast,
    isPendingWeather: state.requestWeather.isPendingWeather,
    isPendingWeatherForecast:
      state.requestWeatherForecast.isPendingWeatherForecast
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestWeather: (type, city, country) =>
      dispatch(requestWeather(type, city, country)),
    onRequestWeatherForecast: (type, city, country) =>
      dispatch(requestWeatherForecast(type, city, country))
  };
};

const initialState = {
    allUserWeatherLoc: [],
    savedWeather: [],
}

class Profile extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const { id } = this.props.user;
    const { onRequestWeather, onRequestWeatherForecast } = this.props;

    fetch("http://localhost:2500/profile", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id
      })
    })
      .then(response => response.json())
      .then(locs => {
        if (locs.length === 0) {
          onRequestWeather("weather", "london", "uk");
          onRequestWeatherForecast("forecast", "london", "uk");
          this.addToWeatherLoc();
        } else {
          console.log("This is the user locations", locs);
          for (let i = 0; i < locs.length; i++) {
            const split = locs[i].weatherlocation.split(/[ ,]+/); //split the string by " " or ,
            if (split.length === 2) {
              const city = split[0];
              const country = split[1];
              const obj = {
                loc: city+ "," + country,
                save: locs[i].save
              }
              const newArr = this.state.savedWeather;
              const newEnt = newArr.push(obj);
                this.props.onRequestWeatherForecast("forecast", city, country);
                this.props.onRequestWeather("weather", city, country);
                this.addToWeatherLoc(locs[i].save);
                this.setState({savedWeather: newEnt});     
            }

            if (split.length === 3) {
              const city = split[0] + " " + split[1];
              const country = split[2];
              const obj = {
                loc: city+ "," + country,
                save: locs[i].save
              }
              const newArr = this.state.savedWeather;
              const newEnt = newArr.push(obj);
              this.props.onRequestWeatherForecast("forecast", city, country);
              this.props.onRequestWeather("weather", city, country);
              this.addToWeatherLoc(locs[i].save);
              this.setState({savedWeather: newEnt});
            }
          }
        }
      })
      .catch(err => console.log(err));

    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchField !== this.props.searchField && this.props.searchField !== "") {
      const split = this.props.searchField.toLowerCase().split(/[ ,]+/); //split the string by " " or ,
      if (split.length === 2) {
        const city = split[0];
        const country = split[1];
        this.props.onRequestWeatherForecast("forecast", city, country);
        this.props.onRequestWeather("weather", city, country);
      }

      if (split.length === 3) {
        const city = split[0] + " " + split[1];
        const country = split[2];
        this.props.onRequestWeatherForecast("forecast", city, country);
        this.props.onRequestWeather("weather", city, country);
      }
    }
    if (
      prevProps.weather.name !== this.props.weather.name &&
      prevProps.weather.name !== undefined &&
      this.props.weather.name !== undefined
    ) {
      // const curValue = (this.props.weather.name + "," + this.props.weather.sys.country).toLowerCase();
      // const ws = this.state.savedWeather;
      // console.log("look at ws", ws);
      // // if(ws){
      // //   this.addToWeatherLoc(ws.save);
      // // }else{
      // //   this.addToWeatherLoc();
      // // }
      this.addToWeatherLoc();
      
    }
  }

  addToWeatherLoc = (bol=false) => {
    const curState = this.state.allUserWeatherLoc;
    const obj = {
      weather: this.props.weather,
      forecast: this.props.weatherForecast,
      save: bol
    };
    const arr = [obj];
    const nextState = curState.concat(arr);
    this.setState({ allUserWeatherLoc: nextState });
  };

  saveWeatherProfile = event => {
    const weatherLoc = event.currentTarget.value.toLowerCase();
    const { id } = this.props.user;
    fetch("http://localhost:2500/profile/save", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        weatherLoc: weatherLoc
      })
    })
      .then(response => response.json())
      .then(saved => {
        console.log(saved);
      })
      .catch(err => console.log(err));
  };

  deleteWeatherProfile = event => {
    const { id } = this.props.user;
    const split = event.currentTarget.value.toLowerCase().split(/[-]+/); //split the string by " " or ,
    const index = split[0];
    const weatherLoc = split[1];
    console.log("split", split);

    fetch("http://localhost:2500/profile/delete", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        weatherLoc: weatherLoc
      })
    })
      .then(response => response.json())
      .then(deleted => {
        const newArr = this.state.allUserWeatherLoc;
        const filtered = newArr.filter((value, i) => {
          return i !== Number(index);
        });
        this.setState({ allUserWeatherLoc: filtered });
      })
      .catch(err => console.log(err));
  };
  render() {
    console.log("Weather LOc", this.state.allUserWeatherLoc);

    const myWeatherLoc = this.state.allUserWeatherLoc.map((arr, i) => {
      return (
        <Grid key={i} item>
          <WeatherContainer
            weatherData={arr.weather}
            foreCastData={arr.forecast.list}
            isLogin={this.props.isLogin}
            saveWeatherProfile={this.saveWeatherProfile}
            deleteWeatherProfile={this.deleteWeatherProfile}
            index={i}
            save={arr.save}
          />
        </Grid>
      );
    });

    return (
      <div>
        <Grid
          container
          direction="row-reverse"
          justify="space-around"
          alignItems="center"
          spacing={2}
        >
          {myWeatherLoc}
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
