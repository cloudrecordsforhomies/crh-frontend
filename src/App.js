import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Treasure from "./treasure.svg";


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
      <Navbar fluid collapseOnSelect style={{maxWidth:1000, margin:'0 auto'}}>
        <Navbar.Header>
          <Link to="/">
            <img src={Treasure} alt='Cache' style={{paddingTop:2.5,height:45, width:45, zIndex:1}}></img>
            <Navbar.Brand>Cache</Navbar.Brand>
          </Link>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem href="/users">Users</NavItem>
            <NavItem href="/about">About</NavItem>
            <NavItem href="/contract">Contract</NavItem>
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
