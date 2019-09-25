import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../utility/auth";
/*
param: component
param: the rest of the props
return Route
protects from going to pages that are protected by a login
*/
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      //this is the rest of the attributes
      {...rest}
      render={props => {
        if (rest.isLogin) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/weather",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
