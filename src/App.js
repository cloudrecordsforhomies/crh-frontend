import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Treasure from "./treasure.svg";


class App extends Component {
  constructor(data){
    super(data)
    var user = sessionStorage.getItem('user')
    this.state = {
      loggedIn: user != null,
      profile: user
    }
  }

  render() {
    return (
      <div className="App">
      <Navbar fluid collapseOnSelect style={{maxWidth:1000, margin:'0 auto'}}>
        <Navbar.Header style={{display:'inline-block'}}>
          <Link to="/">
            <img src={Treasure} alt='Cache' style={{paddingTop:2.5,height:45, width:45, zIndex:1}}></img>
            <Navbar.Brand>Cache</Navbar.Brand>
          </Link>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight style={{display:'inline-block'}}>
            <NavItem href="/users">Users</NavItem>
            <NavItem href="/about">About</NavItem>

            { this.state.loggedIn? (
              <NavItem href={'/profile/' + String(this.state.profile)}>Profile</NavItem>
            ) : (
              <div></div>
            )}

            {/*<NavItem href="/contract">Contract</NavItem>*/}
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
