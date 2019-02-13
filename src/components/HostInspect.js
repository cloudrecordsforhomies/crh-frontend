import React, { Component } from "react";
import axios from 'axios';
import "../styles/HostInspect.css";
import MapContainer from "./MapContainer";
import {Thumbnail, Button} from  'react-bootstrap';
import PaypalContainer from './PaypalContainer';

export default class HostInspect extends Component {

  constructor(props){
    super(props)
    this.state = {
      bId: props.location.pathname.split('/').slice(-1).pop(),
      loggedIn: localStorage.getItem("profile") === null,
      uid: localStorage.getItem("profile")
    }

    this.handleData = this.handleData.bind(this);
    this.confirm = this.confirm.bind(this);
    this.save = this.save.bind(this);
    this.handleHostData = this.handleHostData.bind(this);

    var self = this;
    axios.get(`http://localhost:5000/booking/?bid=${self.state.bId}`)
    .then(function(response){
      self.handleData(response.data);
    })
    .catch(function(err){
    });


  }

  handleData = (result) => {
    var newState = {}
    Object.keys(result).map(function(key){return newState[key] = result[key]});
    console.log(newState);
    this.setState(newState);

    var self = this;
    axios.get(`http://localhost:5000/profile/${newState.hostId}`)
    .then(function(response){
      self.handleHostData(response.data);
    })
    .catch(function(err){
      console.log(err);
    });
  }

  handleHostData = (result) => {
    var newState2 = {}
    Object.keys(result).map(function(key){return newState2['host_'+key] = result[key]});
    console.log(newState2);
    this.setState(newState2);
  }

  confirm() {
    var uid = localStorage.getItem("profile");
    const self = this;
    axios.post(`http://localhost:5000/booking/confirm/`, {renterId: uid, bId: this.state.bId})
         .then(function(){
           alert(`Booking ${self.state.bId} has been confirmed`);
     })
   }

  save() {
    console.log("Save button");
    var uid = localStorage.getItem("profile");
    console.log(uid);
    const self = this;
    axios.get(`http://localhost:5000/saves/${uid}/${self.state.bId}`)
         .then(function(){
           alert(`Booking ${self.state.bId} has been saved`);
    })
  }



  render() {
    return (
      <div className="row">
          <div className="col-xs-12 col-md-12 detail-component-area">
              <div className="row detail-view">
                  <div className="col-md-offset-1"></div>
                  <div className="detail-book-host col-xs-12 col-md-5">
                      <div className="detail-box clearfix">
                          <div className="col-xs-12 col-md-12 own-space space-title">
                              <p className="space-title">{this.state.address}</p>
                          </div>
                          <div className="col-xs-12 col-md-12 own-space space-info">
                              <p className="space-desc">{this.state.squareFeet} square feet hosted by {this.state.host_first} {this.state.host_last}</p>
                          </div>
                          <div className="col-xs-12 col-md-12 own-space space-pricing">
                              <h3>${this.state.price}</h3>
                              <p className="small">for the space</p>
                          </div>
                      </div>
                      <div className="detail-box clearfix ">
                          <div className="reviews-container">
                              <h5 className="review-section-header">Actions</h5>
                              <hr />
                              <Button className="btn btn-success" style={{width:150, height:25, borderRadius:15, marginBottom:25, padding:0}} onClick={this.save} disabled={this.state.loggedIn}>Save</Button>
                              <br/><a className="btn btn-danger" style={{width:150, height:25,borderRadius:15, marginBottom:25, padding:0}} href={`mailto:${this.state.host_email}`}>Contact Host</a>
                              <PaypalContainer price={this.state.price} renterId={this.state.uid} bId={this.state.bId} currency={'USD'} handlebook={this.confirm} />
                          </div>
                      </div>
                  </div>

                  <div className="detail-picture-display col-xs-12 col-md-7" style={{height:'400px'}}>
                      <MapContainer callback={null} places={{lat:this.state.latitude, lng:this.state.longitude}} style={{width:'357px', height:'357px'}} />
<<<<<<< HEAD

=======
>>>>>>> 7ea7b33482d3361afe12360464026aebdf679631
                      <div style={{width:'30px', height:'400px', left:'357px',position:'absolute'}}></div>
                      <img src={this.state.picture} style={{width:'357px', height:'357px'}} />
                  </div>
              </div>
          </div>
      </div>
    );
  }

}
