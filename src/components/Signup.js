import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Thumbnail
} from "react-bootstrap";
import "../styles/Signup.css";
import axios from 'axios';
import { Redirect } from "react-router-dom";



export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null,
      phone: "",
      first: "",
      last: "",
      image: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);

  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword &&
      this.state.phone.length > 0 &&
      this.state.image.length > 0
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.setState({ newUser: "test" });
    this.setState({ isLoading: false });
    var self = this;
    axios.post('http://localhost:5000/users/new', {first: self.state.first, last: self.state.last,email: self.state.email,password: self.state.password, phone: self.state.phone, profPic: self.state.image, file:self.state.file})
    .then(function(){
      axios.post('http://localhost:5000/users/login', {email:self.state.email, password:self.state.password
    })
    .then(function(response){
      return response.data.id;
    })
    .then(function(result){
      self.handleLogin(result);
    });
  });
  }



  handleConfirmationSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
  }

  handleLogin = (result) => {
    localStorage.setItem('profile', result);
    this.setState({ user: result }, function(){
      console.log(this.state.user);
    });
  }

  handleFileUpload = (event) => {
    console.log(event.target.files[0]);
    this.setState({file: event.target.files[0]}, function(){
      console.log(this.state.file);
    });
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <Button
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {

    return (
      <Thumbnail className='thumbnail signupForm' style={{width:'377px', margin:'0 auto'}}>
      <form onSubmit={this.handleSubmit} style={{top:'25px'}}>
      <div className="row">
        <div className="col-xs-6">
          <FormGroup controlId="first" bsSize="large">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
          type="text"
          onChange={this.handleChange}
          />
          </FormGroup>
          </div>
        <div className="col-xs-6">
          <FormGroup controlId="last" bsSize="large">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
          type="text"
          onChange={this.handleChange}
          />
          </FormGroup>
        </div>
        </div>


        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
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

        <FormGroup controlId="image" bsSize="large">
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
      </Thumbnail>
    );
  }

  render() {
    if(this.state.user){
      return <Redirect to={`/profile/${this.state.user}`} from={'/signup'} />
    }
    return (
      <div>
        {this.renderForm()};
      </div>
    );

  }
}

// <!--{this.state.newUser === null
//   ? this.renderForm()
//   : this.renderConfirmationForm()}-->
