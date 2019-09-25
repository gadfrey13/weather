import {
    CHANGE_SEARCH_FIELD,
    USER_LOG_IN,
    REQUEST_WEATHER_PENDING,
    REQUEST_WEATHER_SUCCESS,
    REQUEST_WEATHER_FAILED,
    REQUEST_WEATHER_FORECAST_PENDING,
    REQUEST_WEATHER_FORECAST_SUCCESS,
    REQUEST_WEATHER_FORECAST_FAILED,
    LOAD_USER
  } from "../constants/constants";

const initialStateSearch = {
    searchField: ''
}


export const searchWeather =  (state=initialStateSearch,action={}) => {
    switch(action.type){
        case CHANGE_SEARCH_FIELD:
            return Object.assign({},state,{searchField: action.payload});
        default:
            return state;
    }
}

const initialStateWeather = {
    isPendingWeather: 'false',
    weather: {},
    errorWeather: ''
}

export const requestWeather = (state=initialStateWeather, action={}) => {
    switch(action.type) {
        case REQUEST_WEATHER_PENDING:
            return Object.assign({},state,{isPendingWeather: true})
        case REQUEST_WEATHER_SUCCESS:
            return Object.assign({},state,{weather: action.payload, isPendingWeather: false})
        case REQUEST_WEATHER_FAILED:
            return Object.assign({},state,{error: action.payload, isPendingWeather: false})
        default:
            return state;
    }
}

const initialStateWeatherForecast = {
    isPendingWeatherForecast: 'false',//so it doesnt render the weather component before the data is retrieve from api
    weatherForecast: {},
    errorForecast: ''
}

export const requestWeatherForecast = (state=initialStateWeatherForecast, action={}) => {
    switch(action.type) {
        case REQUEST_WEATHER_FORECAST_PENDING:
            return Object.assign({},state,{isPendingWeatherForecast: true})
        case REQUEST_WEATHER_FORECAST_SUCCESS:
            return Object.assign({},state,{weatherForecast: action.payload, isPendingWeatherForecast: false})
        case REQUEST_WEATHER_FORECAST_FAILED:
            return Object.assign({},state,{error: action.payload, isPendingWeatherForecast: false})
        default:
            return state;
    }
}

const initialUser = {
    user: []
}

export const loadUser = (state=initialUser, action={}) => {
    switch(action.type){
        case LOAD_USER:
            return Object.assign({},state,{user: action.payload});
        default:
            return state;
    }
}

const initialLog = {
    bol: false
}

export const userLogIn = (state=initialLog, action={}) => {
    switch(action.type){
        case USER_LOG_IN:
            return Object.assign({},state,{bol: action.payload});
        default:
            return state;
    }
}