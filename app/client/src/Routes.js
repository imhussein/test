import { Route } from "react-router-dom";
import React from "react";
import Home from "./app/components/base/Home";
import Login from "./app/components/auth/Login";

export default () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </div>
  );
};
