import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Thumbnail
} from "react-bootstrap";
import "../styles/Booking.css";
import SVG from 'react-inlinesvg';
import axios from 'axios';
//import {box3} from '../../img/box3.png';



export default class Hosting extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: localStorage.getItem('user')
    };

    this.handleRangeChange = this.handleRangeChange.bind(this);
  }

  handleRangeChange() {
    var target = document.getElementById('rangeValue');
    var range = document.getElementById('sqftRange');
    target.innerHTML = range.value;
    console.log(`../img/box${Math.ceil(range.value/10)}.png`);
    //document.getElementById('boxesSvg').src = `img/box${Math.ceil(range.value/10).svg}`;
    document.getElementById('boxesImg').src = require(`../images/box${Math.ceil(range.value/10)}.png`);

  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });

    if(event.target.type === 'range')
      this.handleRangeChange();

  }

  handleSubmit = event => {
    event.preventDefault();
    //var target = document.getElementById('target')

    // target.innerHTML = `/listings?location=${this.state.location},checkIn=${this.state.checkIn},checkOut=${this.state.checkOut},sqft=${this.state.squareFootage}`;
    // // send params to
    // // redirect to booking page

    var checkIn = Math.round(new Date(this.state.checkIn).getTime()/1000);
    var checkOut = Math.round(new Date(this.state.checkOut).getTime()/1000);

    axios.post("http://localhost:5000/booking/new", {body:{hostId:this.state.user, renterId:0, checkIn:this.state.checkIn, checkOut:this.state.checkOut, contractId:null, active:false, location:this.state.location, picture:"http://placehold.it/200x200", squareFootage: this.state.sqft, active:false}})
    this.props.history.push("/listings");

  }


render() {
  return (
    <Thumbnail className="landerForm">
      <h1 style={{paddingLeft:'100px'}}>Host a Space</h1>

      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup controlId="location" bsSize="large">
          <ControlLabel>Location</ControlLabel>
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
        <ControlLabel>Square Footage</ControlLabel>: <span id='rangeValue'>30</span> sqft
        <input
         componentclass="range"
         id="sqftRange"
         type="range"
         value={this.state.squareFootage}
         onChange={this.handleRangeChange}
         min="10"
         max="40"
         step="10"
         list='steplist'
         />

        </FormGroup>
        <datalist id="steplist">
           <option value="10">10sqft</option>
           <option value="20">20sqft</option>
           <option value="30">30sqft</option>
           <option value="40">40sqft</option>
         </datalist>
        <div id='boxShape'>
        </div>
      <Button
        block
        bsSize="large"
        className="btn-success"
        type="submit"
      > Submit
      </Button>
      </form>
      <div id='target'>
      <SVG
          id='boxesSvg'
          src=""
      />
      <img
        style={{height:'100px',width:'auto'}}
        id='boxesImg'
        src=""
      />
      </div>
    </Thumbnail>

  )
}
}
