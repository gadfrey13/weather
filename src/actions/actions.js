import {
  CHANGE_SEARCH_FIELD,
  USER_LOG_IN,
  REQUEST_WEATHER_PENDING,
  REQUEST_WEATHER_SUCCESS,
  REQUEST_WEATHER_FAILED,
  REQUEST_WEATHER_FORECAST_PENDING,
  REQUEST_WEATHER_FORECAST_SUCCESS,
  REQUEST_WEATHER_FORECAST_FAILED,
  LOAD_USER,
  API_KEY
} from "../constants/constants";

export const setSearchField = text => {
  return {
    type: CHANGE_SEARCH_FIELD,
    payload: text
  };
};

export const loadUser = (user) => {
  return {
    type: LOAD_USER,
    payload: user
  }
}

export const userLogIn = bol => {
  return {
    type: USER_LOG_IN,
    payload: bol
  };
};

export const requestWeather = (type,city,country) => (dispatch) => {
  dispatch({ type: REQUEST_WEATHER_PENDING });
  fetch(
    `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/${type}?q=${city},${country}&appid=${API_KEY}&units=imperial`
  ).then(res => {
    return res.json();
  }).then(data => {
      dispatch({type: REQUEST_WEATHER_SUCCESS, payload: data})
  }).catch(err => {
      dispatch({type: REQUEST_WEATHER_FAILED, payload: err});
  });
};


export const requestWeatherForecast = (type,city,country) => (dispatch) => {
    dispatch({ type: REQUEST_WEATHER_FORECAST_PENDING });
    fetch(
      `https://cors-anywhere.herokuapp.com/https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/${type}?q=${city},${country}&appid=${API_KEY}&units=imperial`
    ).then(res => {
      return res.json();
    }).then(data => {
        dispatch({type: REQUEST_WEATHER_FORECAST_SUCCESS, payload: data})
    }).catch(err => {
        dispatch({type: REQUEST_WEATHER_FORECAST_FAILED, payload: err});
    });
  };
  
