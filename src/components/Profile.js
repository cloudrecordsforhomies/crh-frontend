import React, { Component } from "react";
import Booking from "./Booking.js";
import Hosting from "./Hosting.js";
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import {Thumbnail} from 'react-bootstrap';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";

export default class Profile extends Component {

  constructor(props){
    super(props);
    var user = null;
    var uId = window.location.pathname.split('/').slice(-1).pop();

    this.state = {
      first: null,
      last: null,
      email: null,
      uId: uId,
      image: null,
      saves: null
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);

    var self = this;
    axios.get(`http://localhost:5000/profile/${uId}`)
    .then(function(response){
      user = response.data;
      self.handleLogin(user);
    })
    .catch(function(err){
      console.log("user not found");
    });
  }

  handleLogin = (result) => {
    this.setState({ first: result.first, last:result.last, email:result.email, image:result.profPic, saves:result.saves }, () => {
      console.log(this.state.saves);
    });
  }


  handleSubmit = (result) => {
    alert(this.state.phone);
  }

  validateForm = () => {

  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  deleteAccount = () => {

  }



  render() {
    return (
      <div className="profile">
        <div className="container bootstrap snippet">
            <div className="row">
              <div className="col-sm-10" style={{width:'300px'}}><h1>{this.state.first} {this.state.last}</h1></div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <div className="text-center">
                  <img src={this.state.image} className="avatar img-thumbnail" style={{width:"250px", height:"250px"}} alt="avatar"></img>

                </div>
                <ul className="list-group">
                  <li className="list-group-item text-muted" style={{textAlign:"center", fontWeight:"bold"}}>Actions</li>
                  <li className="list-group-item"><a href={`/listings?renterId=${this.state.uId}&status=1`}>Active Bookings</a></li>
                  <li className="list-group-item"><a href={`/listings?renterId=${this.state.uId}&status=2`}>Bookings History</a></li>
                  <li className="list-group-item"><a href={`/listings?hostId=${this.state.uId}&status=1`}>Active Hostings</a></li>
                  <li className="list-group-item"><a href={`/listings?hostId=${this.state.uId}&status=2`}>Hosting History</a></li>
                  <li className="list-group-item"><a href={`/listings?hostId=${this.state.uId}&status=0`}>Pending Hostings</a></li>
                  <li className="list-group-item"><a href={`/listings?bid=${this.state.saves}`}>Saves</a></li>
                </ul>
              </div>
              <div className="col-md-6">
              <Tabs>
                <TabList>
                  <Tab>Search Available Booking</Tab>
                  <Tab>Host Your Space</Tab>
                  <Tab>Account Settings</Tab>
                </TabList>
                <TabPanel>
                  <Booking history={this.props.history} />
                </TabPanel>
                <TabPanel>
                  <Hosting user={this.state.uId} />
                </TabPanel>
                <TabPanel>
                <Thumbnail>
                <h3>Account Settings</h3>
                <form onSubmit={this.handleSubmit} style={{top:'25px'}}>
                <FormGroup controlId="password" bsSize="large">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                  />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                  <ControlLabel>Confirm Password</ControlLabel>
                  <FormControl
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    type="password"
                  />
                </FormGroup>
                <FormGroup controlId="phone" bsSize="large">
                  <ControlLabel>Phone Number</ControlLabel>
                  <FormControl
                    value={this.state.phone}
                    onChange={this.handleChange}
                    type="phone"
                  />
                </FormGroup>

                <FormGroup controlId="image2" bsSize="large">
                <ControlLabel>Profile Picture</ControlLabel>
                <FormControl
                type="text"
                onChange={this.handleChange}
                />
                </FormGroup>

                <Button
                  block
                  bsSize="large"
                  className="btn-success"
                  disabled={!this.validateForm()}
                  type="submit"
                > Signup
                </Button>
                </form>

                <hr/><h4>Danger Zone</h4><hr/>
                <Button
                  block
                  bsSize="large"
                  className="btn-danger"
                  onClick={this.deleteAccount}
                > Delete Account
                </Button>
                </Thumbnail>
                </TabPanel>
              </Tabs>
              </div>
            </div>
        </div>
      </div>
    )
  }
}
