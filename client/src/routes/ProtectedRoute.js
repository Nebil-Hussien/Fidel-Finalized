import React from "react";
import { Redirect, Route } from "react-router-dom";
import { token } from "../utils/token";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return token ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default ProtectedRoute;
