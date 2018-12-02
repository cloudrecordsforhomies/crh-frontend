import React, { Component } from "react";
import axios from 'axios';
import "../styles/HostInspect.css";


export default class HostInspect extends Component {

  constructor(props){
    super(props)
    this.state = {
      bId: props.location.pathname.split('/').slice(-1).pop()
    }

    this.handleData = this.handleData.bind(this);
    this.confirm = this.confirm.bind(this);
    this.save = this.save.bind(this);

    var self = this;
    axios.get(`http://52.15.115.174:5000/booking/${self.state.bId}`)
    .then(function(response){
      self.handleData(response.data);

    })
    .catch(function(err){

    });

  }

  handleData = (result) => {
    var newState = {}
    Object.keys(result).map(function(key){newState[key] = result[key]});
    console.log(newState);
    this.setState(newState);
  }

  confirm() {
    console.log("Confirm button");
    var uid = localStorage.getItem("profile");
    const self = this;
    axios.post(`http://52.15.115.174:5000/booking/confirm/`, {renterId: uid, bId: this.state.bId})
         .then(function(){
           alert(`Booking ${self.state.bId} has been confirmed`);
     })
   }

  save() {
    console.log("Save button");
    var uid = localStorage.getItem("profile");
    console.log(uid);
    const self = this;
    axios.get(`http://52.15.115.174:5000/saves/${uid}/${self.state.bId}`)
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
                              <p className="space-title">This is your space!</p>
                          </div>
                          <div className="col-xs-12 col-md-12 own-space space-info">
                              <p className="space-desc">{this.state.squareFeet} square feet hosted by {this.state.hostId}</p>
                              <p className="space-address">{this.state.address}</p>
                              <hr className="divider"></hr>
                          </div>
                          <div className="col-xs-12 col-md-12 own-space space-pricing">
                              <h3>{this.state.price}</h3>
                              <p className="small">for the whole space</p>
                          </div>
                      </div>
                      <div className="detail-box clearfix ">
                          <div className="reviews-container">
                              <p className="review-section-header">Confirm</p>
                              <button className="btn btn-alert" onClick={this.confirm}>Confirm</button>
                              <button className="btn btn-alert" onClick={this.save}>Save</button>
                          </div>
                      </div>
                  </div>
                  <div className="detail-picture-display col-xs-12 col-md-7">
                      <div className="detail-placeholder-pic"><img className="detail-placeholder-pic" src={this.state.picture} /></div>
                      <hr />
                  </div>
              </div>
          </div>
      </div>
    );
  }

}
