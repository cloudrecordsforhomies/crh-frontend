import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Redirect } from "react-router-dom";



class App extends Component {
  constructor(props){
    super(props)
    var user = localStorage.getItem('profile');
    this.state = {
      profile: user,
      // eslint-disable-next-line
      loggedIn: user != 0,
      logout: false
    }
  }



  render() {
    return (
      <div className="App">
        {this.state.logout?<Redirect to={'/home'} /> : <div></div> }
        <Header profile={this.state.profile} />
        <Routes />
        {/*}<Footer />*/}
      </div>
    );
  }
}

export default App;
