import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Thumbnail } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "../styles/Login.css";
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      profile:"",
      loggedIn:false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 &&
           this.state.password.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    var self = this;
    axios.post(`http://localhost:5000/users/login`, {email:self.state.email, password:self.state.password}).then(function(response){
      return response.data.id;
    }).then(function(result){
      self.handleLogin(result);
    });
  }

  handleLogin = result => {
    if(result != null){
      localStorage.setItem('profile', result);
      this.setState({ profile: result, loggedIn: true }, function(){
        console.log(this.state.profile);
      });
    }
  }

  render() {
    return (
      <div className="landerForm">
      {this.state.loggedIn?<Redirect to={`/profile/${this.state.profile}`} /> : <div></div> }
      <Thumbnail>
        <div style={{textAlign:'center'}}>
          <Button className="btn btn-primary">Login with Facebook</Button>
          <div style={{marginTop:'10px'}}></div>
          <Button className="btn btn-success">Login with Google</Button>
        </div>
        <hr></hr>
        <form onSubmit={this.handleSubmit}>
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
          <Button
            block
            bsSize="large"
            className="btn-success"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
        <hr></hr>
        <a href="/signup">Don't have an account? Sign up</a>

        </Thumbnail>
      </div>
    );
  }
}
