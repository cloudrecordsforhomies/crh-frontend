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
import Modal from 'react-modal';
import MapContainer from './MapContainer';
import ImageUploader from "react-images-upload";

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

export default class Hosting extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: props.user,
      list: false,
      modalIsOpen: false,
      squareFootage:30,
      image:''
    };

    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleCoords = this.handleCoords.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
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

    if(event.target.type === 'date'){
      var checkIn = Math.round(new Date(this.state.checkIn).getTime()/1000);
      var checkOut = Math.round(new Date(this.state.checkOut).getTime()/1000);
      if(checkIn && checkOut){
      this.setState({days:(checkOut-checkIn)/86400});
      document.getElementById("days").innerHTML = event.target.value;
    }
    }
    if(event.target.type === 'range'){
      this.handleRangeChange();
      document.getElementById("sqfttarget").innerHTML = event.target.value;
    }
    if(event.target.id === 'price'){
      var target = document.getElementById('priceTarget');
      //target.innerHTML = this.state.squareFootage * parseFloat(event.target.value)/10 * this.state.days;
    }
  }


  handleCoords = (lat, lng) => {
      this.setState({latitude:lat(), longitude:lng()});
      document.getElementById("latitude").value = this.state.latitude;
      document.getElementById("longitude").value = this.state.longitude;
    }

  handleSubmit = event => {
    event.preventDefault();
    var checkIn = Math.round(new Date(this.state.checkIn).getTime()/1000);
    var checkOut = Math.round(new Date(this.state.checkOut).getTime()/1000);
    var img;
    if(this.state.image)
      img = this.state.image
    else
      img = "https://placehold.it/200x200";
    var b;
    var self = this;
    var b = axios.post("http://localhost:5000/booking/new", {body:{hostId:this.state.user, checkIn:checkIn, checkOut:checkOut, address:this.state.location, picture:img, squareFeet: this.state.squareFootage, latitude:this.state.latitude, longitude:this.state.longitude, price:this.state.price}})
     .then( function(response) {
        return response.data
      })
     .catch( function(response){
        console.log("error");
    });

    this.setState({list:true,bid:b}, function(){
      console.log(this.state.bid);
    });

    window.location = '/listings/?bid=all&uLat=33.79010684411262&uLong=-84.32665145463136';
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
    this.setState()
    }


render() {
  return (
    <Thumbnail className="landerForm">
      <h1>Host a Space</h1>
      <hr/>
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="location" bsSize="large">
          <ControlLabel>Give Your Space a Title</ControlLabel>
          <FormControl
          autoFocus
          type="location"
          value={this.state.location}
          onChange={this.handleChange}
          />
        </FormGroup>
        <div className="row">
          <div style={{marginLeft:"0px"}}>
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
        <div id='target' style={{margin:"0px;"}}>
          <img
            style={{height:'100px',width:'auto', margin:"0 auto"}}
            id='boxesImg'
            src={require("../images/box3.png")}
            alt="boxes"
          />
        </div>

        <FormGroup controlId="price" bsSize="large">
        <ControlLabel>Price Per 10sqft per Day</ControlLabel>
          <FormControl
          id="price"
          type="text"
          onChange={this.handleChange}
          maxLength={"4"}
          size={"4"}
          />

        </FormGroup>

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
        type='submit'
      > Submit
      </Button>
      </form>

    </Thumbnail>
  );
  }
}
