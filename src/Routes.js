import React from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Users from "./components/Users";
import Profile from "./components/Profile";
import ContractHome from "./components/ContractHome";
import Listing from "./components/Listing";

export default () =>
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/home" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/users" exact component={Users} />
      <Route path="/profile/*" exact component={Profile} />
      <Route path="/contract" exact component={ContractHome} />
      <Route path="/listings" exact component={Listing} />
    </Switch>
  </BrowserRouter>
