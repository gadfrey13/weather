import React, { Component } from "react";
import { taggedTemplateExpression } from "@babel/types";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import SignIn from "../../components/Signin/SignIn";
import Register from "../../components/Register/Register";
import App from "../App/App";
import Clouds from "../../components/Clouds/Clouds";
import Navbar from "../../components/NavBar/Navbar";
class RouterApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "US",
      city: "Stockton",
      input: '',
    };
  }

  onSearch = event => {
    if (event.keyCode === 13 || event.which === 13) {
      const split = event.target.value.toLowerCase().split(/[ ,]+/);
      console.log("state",this.state.input);
      if (split.length == 2) {
        const city = split[0];
        const country = split[1];
        this.setState({ country: country, city: city });
      }

      if (split.length == 3) {
        const city = split[0] + " " + split[1];
        const country = split[2];
        this.setState({ country: country, city: city });
      }
      event.target.value = "";
    }
  };


  render() {
    return (
      <div>
        <Clouds />
        <Router>
          <Navbar onSearch={this.onSearch}></Navbar>
          <Switch>
            <Route
              path="/weather"
              exact
              component={props => (
                <App city={this.state.city} country={this.state.country} />
              )}
            />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={SignIn} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default RouterApp;
