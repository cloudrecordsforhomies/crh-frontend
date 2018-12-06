import React, { Component } from "react";
import axios from 'axios';
import "../styles/HostInspect.css";
import MapContainer from "./MapContainer";


export default class HostInspect extends Component {

  constructor(props){
    super(props)
    this.state = {
      bId: props.location.pathname.split('/').slice(-1).pop(),
      loggedIn: localStorage.getItem("profile") === null
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
    Object.keys(result).map(function(key){return newState2[key] = result[key]});
    console.log(newState2);
    this.setState(newState2);
  }

  confirm() {
    console.log("Confirm button");
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
                              <p className="space-desc">{this.state.squareFeet} square feet hosted by {this.state.first} {this.state.last}</p>
                              <hr className="divider"></hr>
                          </div>
                          <div className="col-xs-12 col-md-12 own-space space-pricing">
                              <h3>${this.state.price}</h3>
                              <p className="small">for the space</p>
                          </div>
                      </div>
                      <div className="detail-box clearfix ">
                          <div className="reviews-container">
                              <p className="review-section-header">Actions</p>
                              <button className="btn btn-alert" onClick={this.confirm} disabled={this.state.loggedIn}>Confirm</button>
                              <button className="btn btn-alert" onClick={this.save} disabled={this.state.loggedIn}>Save</button>
                              <a className="btn btn-alert" href={`mailto:${this.state.email}`}>Contact Host</a>
                          </div>
                      </div>
                      <div className = "paypal-box">
                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                        <input type="hidden" name="cmd" value="_s-xclick"/>
                        <input type="hidden" name="hosted_button_id" value="K48Q4JTPZ9M5L"/>
                        <input type="image" disabled={this.state.loggedIn} src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"/>
                        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"/>
                        </form>
                      </div>
                  </div>

                  <div className="detail-picture-display col-xs-12 col-md-7" style={{height:'400px'}}>
                      <MapContainer callback={null} location={{lat:this.state.latitude, lng:this.state.longitude}} />
                      <hr />
                  </div>
              </div>
          </div>
      </div>
    );
  }

}
