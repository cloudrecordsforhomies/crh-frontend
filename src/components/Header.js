import React, { Component } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Treasure from "../treasure.svg";
import { Redirect } from "react-router-dom";


export default class Header extends Component {

  constructor(props){
    super(props)
    this.state = {
      profile: props.profile,
      logout:false
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
      return (
        <Redirect to={"/home"} />
      );
    } else
    return (
      <Navbar fluid collapseOnSelect style={{width:"100%", margin:'0 auto'}}>
        <Navbar.Header style={{display:'inline-block'}}>
          <a href="/home">
            <img src={Treasure} alt='Cache' style={{paddingTop:2.5,paddingRight:10,height:45, width:45, float:'left'}} />
            <Navbar.Brand>Cache</Navbar.Brand>
          </a>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight style={{display:'inline-block'}}>
            <NavItem href="/users">Users</NavItem>
            <NavItem href="/about">About</NavItem>
            {
            this.state.profile? (
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
    );
  }
}
