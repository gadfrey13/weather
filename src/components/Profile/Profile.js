import React, { Component } from "react";
import WeatherContainer from "../Weather/WeatherContainer/WeatherContainer";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import {
  requestWeather,
  requestWeatherForecast,
  requestWeatherAndForecast
} from "../../actions/actions";
import Loading from "../Loading/Loading";
import { tsParenthesizedType } from "@babel/types";

const mapStateToProps = state => {
  return {
    searchField: state.searchWeather.searchField,
    user: state.loadUser.user,
    isLogin: state.userLogIn.bol,
    isPendingWeatherAndForecast:
      state.requestWeatherAndForecast.isPendingWeatherAndForecast,
    data: state.requestWeatherAndForecast.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestWeatherAndForecast: (city, country) =>
      dispatch(requestWeatherAndForecast(city, country))
  };
};

const initialState = {
  allUserWeatherLoc: [],
  savedWeather: []
};

class Profile extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  //fix
  componentDidMount() {
    const { id } = this.props.user;
    console.log("this is profile componentdidmount");
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
          this.onRequestWeatherAndForecast("london", "uk");
        } else {
          this.run(locs);
        }
      })
      .catch(err => console.log(err));
  }

  run = async locs => {
    console.log("locs", locs);
    for (let i = 0; i < locs.length; i++) {
      let res = await this.getWeather(locs[i]);
      res.push(locs[i].save);
      let obj = {
        weather: res[0],
        forecast: res[1],
        save: res[2]
      };
      let cur = [...this.state.allUserWeatherLoc]; //you need to this to actual copy the array not just the reference
      cur.push(obj);
      this.setState({ allUserWeatherLoc: cur });
    }
  };

  getWeather = async data => {
    const API_KEY = "640285b24dd4963e697ea5be67cf8165";
    const split = data.weatherlocation.toLowerCase().split(/[,]+/); //split the string by " " or ,
    const city = split[0];
    const country = split[1];
    const urls = [
      `https://cors-anywhere.herokuapp.com/https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`,
      `https://cors-anywhere.herokuapp.com/https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=imperial`
    ];
    const promiseFetch = Promise.all(
      urls.map(url => fetch(url).then(res => res.json()))
    )
      .then(results => {
        return results;
      })
      .catch(err => {
        return err;
      });

    return promiseFetch;
  };

  //fix
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchField !== this.props.searchField &&
      this.props.searchField !== ""
    ) {
      const split = this.props.searchField.toLowerCase().split(/[ ,]+/); //split the string by " " or ,
      if (split.length === 2) {
        const city = split[0];
        const country = split[1];
        this.props.onRequestWeatherAndForecast(city, country);
      }

      if (split.length === 3) {
        const city = split[0] + " " + split[1];
        const country = split[2];
        this.props.onRequestWeatherAndForecast(city, country);
      }
    }

    if(this.props.data.length > 0){
      if(prevProps.data.length === 0){
        this.addToWeatherLoc();
      }else{
        if(prevProps.data[0].name !== this.props.data[0].name){
          this.addToWeatherLoc();
        }
      }

    }
  }
  //have to fix
  addToWeatherLoc = (bol = false) => {
    const curState = [...this.state.allUserWeatherLoc];
    const obj = {
      weather: this.props.data[0],
      forecast: this.props.data[1],
      save: bol
    };
    curState.push(obj);
    this.setState({ allUserWeatherLoc: curState });
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
      })
      .catch(err => console.log(err));
  };

  deleteWeatherProfile = event => {
    const { id } = this.props.user;
    const split = event.currentTarget.value.toLowerCase().split(/[-]+/); //split the string by " " or ,
    const index = split[0];
    const weatherLoc = split[1];
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
          spacing={4}
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
