import React, { Component } from "react";
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Thumbnail
} from "react-bootstrap";
import "../styles/Booking.css";
import MapContainer from './MapContainer';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : '1000px',
    width                 : '1000px'
  }
};

export default class Booking extends Component {


  constructor(props){
    super(props);
    this.state = {
      squareFootage:10,
      latitude:33.7,
      longitude: -84.1,
      radius:100,
      list:false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCoords = this.handleCoords.bind(this);
  }


  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({list:true}, function(){
      console.log(this.state.list);
    })
  }

  handleCoords = (lat, lng) => {
      this.setState({lat:lat(), lng:lng()});
      document.getElementById("latitude").value = this.state.lat;
      document.getElementById("longitude").value = this.state.lng;
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.

  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }



render() {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
      })
  }
  return (
    <Thumbnail className="landerForm">
      <h1>Rent with Cache</h1>

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
        <div style={{marginLeft:"185px"}}>
        <Button className="btn btn-danger" onClick={this.openModal}> Get Location From Map </Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal"
        >
          <button onClick={this.closeModal} style={{marginRight:"3%",marginLeft:"97%", marginBotton:'20px'}}>X</button>
          <div id="mapContainerContainer" style={{height:'900px', width:'900px'}}>
            <MapContainer callback={this.handleCoords} />
          </div>

        </Modal>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-4">
          <FormGroup controlId="latitude" bsSize="large">
          <ControlLabel>Latitude</ControlLabel>
          <FormControl
          type="text"
          onChange={this.handleChange}
          />
          </FormGroup>
          </div>
        <div className="col-xs-4">
          <FormGroup controlId="longitude" bsSize="large">
          <ControlLabel>Longitude</ControlLabel>
          <FormControl
          type="text"
          onChange={this.handleChange}
          />
          </FormGroup>
          </div>
          <div className="col-xs-4">
          <FormGroup controlId="radius" bsSize="large">
          <ControlLabel>Distance (mi)</ControlLabel>
          <FormControl
          type="text"
          onChange={this.handleChange}
          />
          </FormGroup>

        </div>
      </div>
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
         componentclass="select"
         placeholder="select"
         value={this.state.squareFootage}
         onChange={this.handleChange}
         >
         {/*       <option value="10">10sqft</option>
                   <option value="15">15sqft</option>
                   <option value="25">25sqft</option>*/}
        </FormControl>
        </FormGroup>
      <Button
        block
        bsSize="large"
        className="btn-success"
        type="submit"
        href={`/listings/?uLat=${this.state.latitude}&uLong=${this.state.longitude}&uRadius=${this.state.radius}&status=0`}
      > Submit
      </Button>
      </form>
      <div id='target'></div>
    </Thumbnail>
  );
  }
}
