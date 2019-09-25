import {
  CHANGE_SEARCH_FIELD,
  USER_LOG_IN,
  REQUEST_WEATHER_PENDING,
  REQUEST_WEATHER_SUCCESS,
  REQUEST_WEATHER_FAILED,
  REQUEST_WEATHER_FORECAST_PENDING,
  REQUEST_WEATHER_FORECAST_SUCCESS,
  REQUEST_WEATHER_FORECAST_FAILED,
  REQUEST_WEATHER_FORECAST_RESET,
  REQUEST_WEATHER_AND_FORECAST_PENDING,
  REQUEST_WEATHER_AND_FORECAST_SUCCESS,
  REQUEST_WEATHER_AND_FORECAST_FAILED,
  REQUEST_WEATHER_AND_FORECAST_RESET,
  LOAD_USER,
  USER_WEATHER_LOCATION,
  REQUEST_WEATHER_RESET,
  API_KEY
} from "../constants/constants";

export const setSearchField = text => {
  return {
    type: CHANGE_SEARCH_FIELD,
    payload: text
  };
};

export const loadUser = user => {
  return {
    type: LOAD_USER,
    payload: user
  };
};

export const userLogIn = bol => {
  return {
    type: USER_LOG_IN,
    payload: bol
  };
};

export const requestWeather = (type, city, country) => dispatch => {
  dispatch({ type: REQUEST_WEATHER_PENDING });
  fetch(
    `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/${type}?q=${city},${country}&appid=${API_KEY}&units=imperial`
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch({ type: REQUEST_WEATHER_SUCCESS, payload: data });
    })
    .catch(err => {
      dispatch({ type: REQUEST_WEATHER_FAILED, payload: err });
    });
};

export const requestWeatherForecast = (type, city, country) => dispatch => {
  dispatch({ type: REQUEST_WEATHER_FORECAST_PENDING });
  fetch(
    `https://cors-anywhere.herokuapp.com/https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/${type}?q=${city},${country}&appid=${API_KEY}&units=imperial`
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch({ type: REQUEST_WEATHER_FORECAST_SUCCESS, payload: data });
    })
    .catch(err => {
      dispatch({ type: REQUEST_WEATHER_FORECAST_FAILED, payload: err });
    });
};

export const requestWeatherAndForecast = (city, country) => dispatch => {
  console.log("request and weather ", city);
  console.log("country", country);
  dispatch({ type: REQUEST_WEATHER_AND_FORECAST_PENDING });
  const urls = [
    `https://cors-anywhere.herokuapp.com/https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`,
    `https://cors-anywhere.herokuapp.com/https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=imperial`
  ];
  
  Promise.all(urls.map(url => fetch(url).then(res => res.json())))
  .then(results => {
    console.log("results", results);
    dispatch({type: REQUEST_WEATHER_AND_FORECAST_SUCCESS, payload: results})
  })
  .catch( err => {
    dispatch({type: REQUEST_WEATHER_AND_FORECAST_FAILED, payload: err})
  })
};

export const resetWeather = () => {
  return { type: REQUEST_WEATHER_RESET };
};

export const resetWeatherForeCast = () => {
  return { type: REQUEST_WEATHER_FORECAST_RESET };
};
