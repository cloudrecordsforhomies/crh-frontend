import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Thumbnail
} from "react-bootstrap";
import "../styles/Booking.css";
import axios from 'axios';
import { Redirect } from 'react-router-dom';



export default class Hosting extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: props.user,
      list: false
    };

    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRangeChange() {
    var target = document.getElementById('rangeValue');
    var range = document.getElementById('sqftRange');
    target.innerHTML = range.value;
    this.setState({squareFootage:range.value}, function(){
      console.log(this.state.squareFootage);
    });
    //console.log(`../img/box${Math.ceil(range.value/10)}.png`);
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
    var self = this;
    axios.post("http://localhost:5000/booking/new", {body:{hostId:this.state.user, checkIn:checkIn, checkOut:checkOut, address:this.state.location, picture:this.state.image, squareFeet: this.state.squareFootage, latitude:this.state.latitude, longitude:this.state.longitude}})
         .then( function(response){
            self.setState({bid:response},function(){
              console.log(this.state.bid);
            });
          })
         .catch( function(response){
            console.log("error");
    });

    this.setState({list:true}, function(){
      console.log(this.state.list);
    });

  }


render() {

  if(this.state.list){
    return(<Redirect to={`/hostinspect/${this.state.bid}`} />)
  }

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
    <div className="row">
      <div className="col-xs-6">
        <FormGroup controlId="latitude" bsSize="large">
        <ControlLabel>Latitude</ControlLabel>
        <FormControl
        type="text"
        onChange={this.handleChange}
        />
        </FormGroup>
      </div>
      <div className="col-xs-6">
        <FormGroup controlId="longitude" bsSize="large">
        <ControlLabel>Longitude</ControlLabel>
        <FormControl
        type="text"
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
        <div id='target'>
          <img
            style={{height:'100px',width:'auto', margin:"0 auto"}}
            id='boxesImg'
            src="../images/box3.png"
            alt="boxes"
          />
        </div>

        <FormGroup controlId="image" bsSize="large">
        <ControlLabel>Image Url</ControlLabel>
          <FormControl
          type="text"
          onChange={this.handleChange}
          />
        </FormGroup>

      <Button
        block
        bsSize="large"
        className="btn-success"
        type="submit"
      > Submit
      </Button>
      </form>

    </Thumbnail>
  );
  }
}
