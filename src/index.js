import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RouterApp from "./containers/Router/Router";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import {
  searchWeather,
  requestWeather,
  requestWeatherForecast,
  loadUser,
  userLogIn,
  requestWeatherAndForecast
} from "../src/reducer/reducer";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

const logger = createLogger();

const rootReducer = combineReducers({
  requestWeatherAndForecast,
  searchWeather,
  requestWeather,
  requestWeatherForecast,
  loadUser,
  userLogIn,
  
});
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <RouterApp />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
