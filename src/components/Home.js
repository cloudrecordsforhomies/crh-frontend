import React, { Component } from "react";
import "../styles/Home.css";
import Login from "./Login.js"
import { Redirect } from 'react-router-dom';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
    }

  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSelection = event => {
    this.setState({[event.target.id]: event.target.value});
  }

  render() {
    if(localStorage.getItem('profile')){
      return (
        <Redirect to={`/profile/${localStorage.getItem('profile')}`} />
      )
    } else
    return (
      <div className="Home">
      <Login />
      </div>
    );
  }
}
