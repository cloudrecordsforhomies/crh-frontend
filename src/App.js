import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";


class App extends Component {
  constructor(data){
    super(data)
    this.state = {
      username: "Safa"
    }
  }

  render() {
    return (
      <div className="App">
      <Navbar fluid collapseOnSelect style={{maxWidth:'1000px', margin:'0 auto'}}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Cache</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem href="/users">Users</NavItem>
            <NavItem href="/signup">Signup</NavItem>
            <NavItem href="/login">Login</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
      </div>
    );
  }
}

export default App;
