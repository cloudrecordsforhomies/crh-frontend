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
import ImageUploader from "react-images-upload";



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
      window.location = '/profile/'+result;
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
    let auth = 'Bearer 5323d68f250da95bf853e0670d17c2f92bd63386';
    this.setState({image: event[0]});
    var reader = new FileReader();
    var img = reader.readAsDataURL(event[0]);
    var self = this;
    reader.onload = function (e) {
      axios.post('https://api.imgur.com/3/image/',{image:e.target.result.split(',')[1]}, {headers: {Authorization:auth, Authorization: 'Client-ID f9809b264e1c6f5', Accept: 'application/json'}})
      .then(function(response){
        console.log(response.data.data.link);
        self.setState({image:response.data.data.link});
      });
      }
    }

  renderForm() {

    return (
      <Thumbnail className='thumbnail signupxForm' style={{width:'377px', margin:'0 auto'}}>
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

        {/*<FormGroup controlId="image" bsSize="large">
        <ControlLabel>Profile Picture</ControlLabel>
        <FormControl
        type="text"
        onChange={this.handleChange}
        />
        </FormGroup>

        <FormGroup controlId="image2" bsSize="large">
        <ControlLabel>Image2</ControlLabel>
        <FormControl
        type="file"
        accept=".jpg"
        onChange={this.handleFileUpload}
        />
        </FormGroup>*/}
        <ImageUploader
            withIcon={true}
            buttonText='Choose image'
            onChange={this.handleFileUpload}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            singleImage={true}
        />

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
    // if(this.state.user){
    //   return <Redirect to={`/profile/${this.state.user}`} from={'/signup'} />
    // }
    return (
      <div style={{marginTop:'100px'}}>
        {this.renderForm()};
      </div>
    );

  }
}

// <!--{this.state.newUser === null
//   ? this.renderForm()
//   : this.renderConfirmationForm()}-->
