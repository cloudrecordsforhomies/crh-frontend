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
    var self = this;
    axios.get(`http://localhost:5000/booking/${self.state.bId}`)
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
                              <h3>$225.00/month</h3>
                              <p className="small">for the whole space</p>
                          </div>
                      </div>
                      <div className="detail-box clearfix ">
                          <div className="reviews-container">
                              <p className="review-section-header">Reviews</p>
                              <p className="no-reviews">No reviews yet.</p>
                          </div>
                      </div>
                  </div>
                  <div className="detail-picture-display col-xs-12 col-md-7">
                      <div className="detail-placeholder-pic"><img className="detail-placeholder-pic" src={this.state.picture} /></div>
                      <hr />
                      {/* TODO: confirmlisting: send to a confirmation page listing out all the details, which redirects to filtered listing page*/}
                      
                  </div>
              </div>
          </div>
      </div>
    );
  }

}
