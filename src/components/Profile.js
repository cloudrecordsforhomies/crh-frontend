import React, { Component } from "react";
import Booking from "./Booking.js";


export default class Profile extends Component {

  constructor(props){
    super(props)

    this.state = {
      id: 0,
      first: "Safa",
      last: "Tinaztepe"
    }
  }

  render() {
    return (
      <div className="profile">
        <div className="container bootstrap snippet">
            <div className="row">
              <div className="col-sm-10"><h1>{this.state.first} {this.state.last}</h1></div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <div className="text-center">
                  <img src="https://scontent-atl3-1.cdninstagram.com/vp/8654fba64ada6d2f7cb30c2b82ee6ebf/5C2877D1/t51.2885-19/s320x320/40470301_737609546577676_7163267097605177344_n.jpg" className="avatar img-circle img-thumbnail" alt="avatar"></img>
                  <h6>Upload a different photo...</h6>
                </div>
                <ul className="list-group">
                  <li className="list-group-item text-muted" style={{textAlign:"center", fontWeight:"bold"}}>Actions</li>
                  <li className="list-group-item"><a href="#">Search for New Booking</a></li>
                  <li className="list-group-item"><a href="#">Active Bookings</a></li>
                  <li className="list-group-item"><a href="#">Bookings History</a></li>
                  <li className="list-group-item"><a href="#">Saves</a></li>
                </ul>
              </div>
              <div className="col-md-6">
                <div className="activePane"><Booking /></div>
              </div>
            </div>
        </div>
      </div>
    )
  }
}
