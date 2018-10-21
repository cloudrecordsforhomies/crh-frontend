import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Thumbnail
} from "react-bootstrap";
import "../styles/Booking.css";



export default class Booking extends Component {
  constructor(props){
    super(props);
    this.state = {squareFootage:10, location:"asdf"};

    console.log(this.props);
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(this.props);
  }

  handleSubmit = event => {
    event.preventDefault();
    //var target = document.getElementById('target')

    // target.innerHTML = `/listings?location=${this.state.location},checkIn=${this.state.checkIn},checkOut=${this.state.checkOut},sqft=${this.state.squareFootage}`;
    // // send params to
    // // redirect to booking page
    // var checkIn = Math.round(new Date(this.state.checkIn).getTime()/1000);
    // var checkOut = Math.round(new Date(this.state.checkOut).getTime()/1000);

    this.props.history.push("/listings");

  }



render() {
  return (
    <Thumbnail className="landerForm">
      <h1>Cache</h1>

      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup controlId="location" bsSize="large">
          <ControlLabel>Send Me Your Location</ControlLabel>
          <FormControl
          autoFocus
          type="location"
          value={this.state.location}
          onChange={this.handleChange}
          />
        </FormGroup>
    <div className="row">
      <div className="col-xs-6">
        <FormGroup controlId="checkIn" bsSize="large">
        <ControlLabel>Check In</ControlLabel>
        <FormControl
        type="date"
        onChange={this.handleChange}
        />
        </FormGroup>
        </div>
      <div className="col-xs-6">
        <FormGroup controlId="checkOut" bsSize="large">
        <ControlLabel>Check Out</ControlLabel>
        <FormControl
        type="date"
        onChange={this.handleChange}
        />
        </FormGroup>
      </div>
    </div>
        <FormGroup controlId="squareFootage">
        <ControlLabel>Square Footage</ControlLabel>
        <FormControl
         componentClass="select"
         placeholder="select"
         value={this.state.squareFootage}
         onChange={this.handleChange}
         >
          <option value="10">10sqft</option>
          <option value="15">15sqft</option>
          <option value="25">25sqft</option>
        </FormControl>
        </FormGroup>
      <Button
        block
        bsSize="large"
        className="btn-success"
        type="submit"
      > Submit
      </Button>
      </form>
      <div id='target'></div>
    </Thumbnail>

  )
}
}
