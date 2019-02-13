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
    }).catch(function(result){
      alert("User not found");
    });
  }

  handleLogin = result => {
    if(result != null){
      localStorage.setItem('profile', result);
      this.setState({ user: result, loggedIn: true }, function(){
        console.log(this.state.user);
      });
    }
  }

  renderForm(){
    return(
    <div className="container-login100">
    <div className="wrap-login100" style={{width:"377", margin:"0 auto"}}>
    <div className="login100-pic">
      <img src={require("../images/img-01.png")} alt="IMG"/>
    </div>
    <Thumbnail>
      <hr></hr>
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            bsClass="input100"
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            bsClass="input100"
            type="password"
          />
        </FormGroup>
        <Button
          block
          bsSize="large"
          bsClass="login100-form-btn"
          type="submit"
        >
          Login
        </Button>
      </form>
      <hr></hr>
      <div style={{textAlign:'center'}}>
      <a href="/signup">Create Your Account</a>
      </div>

      </Thumbnail>
    </div>
    </div>
  );
  }

  render() {
    if(this.state.user){
      return <Redirect to={`profile/${this.state.user}`} />
    }
    return (
      <div>
        {this.renderForm()}
      </div>
    );
  }
}
