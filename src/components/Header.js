import React, { Component } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Treasure from "../treasure.svg";


export default class Header extends Component {

  constructor(props){
    super(props)
    this.state = {
      profile: props.profile,
      logout:false
    }
    this.loggedIn = this.loggedIn.bind(this);
  }

  loggedIn() {
    return this.state.profile !== null;
  }

  render() {
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
            {/*<NavItem href="/users">Users</NavItem>*/}
            <NavItem href="/about">About</NavItem>
            <NavItem href={'/listings/?uLat=33.79010684411262&uLong=-84.32665145463136'}> Listings </NavItem>
            {
             this.loggedIn() ? (
              <Nav pullRight style={{display:'inline-block'}}>
                <NavItem href={`/profile/${this.state.profile}`}> Profile </NavItem>
                <NavItem href={'/'} onClick={this.props.handleLogout}> Log Out </NavItem>
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
