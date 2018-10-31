import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";
import { Link, Redirect } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Treasure from "./treasure.svg";


class App extends Component {
  constructor(props){
    super(props)
    var user = localStorage.getItem('profile');
    this.state = {
      profile: user,
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
      <Navbar fluid collapseOnSelect style={{maxWidth:1000, margin:'0 auto'}}>
        <Navbar.Header style={{display:'inline-block'}}>
          <Link to="/home">
            <img src={Treasure} alt='Cache' style={{paddingTop:2.5,height:45, width:45, zIndex:1}}></img>
            <Navbar.Brand>Cache</Navbar.Brand>
          </Link>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight style={{display:'inline-block'}}>
            <NavItem href="/users">Users</NavItem>
            <NavItem href="/about">About</NavItem>
            {

            this.state.loggedIn? (
              <Nav pullRight style={{display:'inline-block'}}>
                <NavItem href={`/profile/${this.state.profile}`}> Profile </NavItem>
                <NavItem onClick={this.handleLogout}> Log Out </NavItem>
              </Nav>
            ) : (
              <Nav pullRight style={{display:'inline-block'}}>
                <NavItem href={'/login'}> Log In </NavItem>
                <NavItem href={'/signup'}> Sign Up </NavItem>
              </Nav>
            )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
      {/* This is the template that will render on every page*/}
      </div>
    );
  }
}

export default App;
