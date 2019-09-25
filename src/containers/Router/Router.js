import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "../../components/Signin/SignIn";
import Register from "../../components/Register/Register";
import App from "../App/App";
import Clouds from "../../components/Clouds/Clouds";
import Navbar from "../../components/NavBar/Navbar";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Profile from "../../components/Profile/Profile";
import {
  setSearchField,
  loadUser,
  userLogIn,
  resetWeather,
  resetWeatherForeCast
} from "../../actions/actions";

const mapStateToProps = state => {
  return {
    searchField: state.searchWeather.searchField,
    user: state.loadUser.user,
    isLogin: state.userLogIn.bol
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearch: event => {
      if (event.keyCode === 13 || event.which === 13) {
        dispatch(setSearchField(event.target.value));
        event.target.value = "";
      }
    },
    loadUserProfile: user => {
      dispatch(loadUser(user));
    },
    logIn: bol => {
      dispatch(userLogIn(bol));
    },
    resetWeatherNav: () => dispatch(resetWeather()),
    resetWeatherForeCastNav: () => dispatch(resetWeatherForeCast())
  };
};

class RouterApp extends Component {
  componentDidMount(){
    console.log("yea this is the route");
  }
  render() {
    const {
      searchField,
      onSearch,
      loadUserProfile,
      logIn,
      user,
      isLogin,
      resetWeatherForeCastNav,
      resetWeatherNav
    } = this.props;
    const defaultWeatherLocation = "london,uk";
    return (
      <div>
        <Clouds />
        <Router>
          <Navbar onSearch={onSearch} logIn={logIn} isLogin={isLogin}></Navbar>
          <Switch>
            <Route
              path="/weather"
              exact
              component={props => (
                <App searchField={searchField || defaultWeatherLocation} />
              )}
            />
            <Route
              path="/register"
              exact
              component={props => (
                <Register
                  loadUserProfile={loadUserProfile}
                  logIn={logIn}
                  {...props}
                />
              )}
            />
            <Route
              path="/login"
              exact
              component={props => (
                <SignIn
                  loadUserProfile={loadUserProfile}
                  logIn={logIn}
                  resetWeatherIn={resetWeatherNav}
                  resetWeatherForeCastIn={resetWeatherForeCastNav}
                  {...props}
                />
              )}
            />
            <ProtectedRoute
              path="/profile"
              exact
              component={Profile}
              user={user}
              isLogin={isLogin}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterApp);
