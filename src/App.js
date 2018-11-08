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

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    localStorage.clear();
    this.setState({
      profile: 0,
      loggedIn: false,
      logout: true
    }, function(){
      console.log(this.state.profile);
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.logout?<Redirect to={'/home'} /> : <div></div> }
        <Header />
        <Routes />
        {/*}<Footer />*/}
      </div>
    );
  }
}

export default App;
