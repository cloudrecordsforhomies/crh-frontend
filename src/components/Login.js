import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Thumbnail } from "react-bootstrap";
import "../styles/Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 &&
           this.state.password.length > 0 &&
           this.state.email.includes("@")
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="landerForm">
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
