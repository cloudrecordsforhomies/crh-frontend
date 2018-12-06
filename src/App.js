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
      logout: true
    }, function(){
      console.log(this.state.profile);
    });
  }

  render() {
    if(this.state.logout){
      return (<Redirect to={"/home"} />) ;
    }
    return (
      <div className="App">
        <Header profile={this.state.profile} handleLogout={this.handleLogout} />
        <Routes />
        {/*<Footer />*/}
      </div>
    );
  }
}

export default App;
