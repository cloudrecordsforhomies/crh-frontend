  import React, { Component } from "react";

export default class Login extends Component {

  constructor(data){
    super(data)
    this.state = {
      first: "Safa",
      last: "Tinaztepe"
    }
  }

  render() {
    return (
      <div className="profile">
        <div class="container bootstrap snippet">
            <div class="row">
              <div class="col-sm-10"><h1>{this.state.first} {this.state.last}</h1></div>
            </div>
            <div class="row">
              <div class="col-sm-3">
                <div class="text-center">
                  <img src="https://scontent-atl3-1.cdninstagram.com/vp/8654fba64ada6d2f7cb30c2b82ee6ebf/5C2877D1/t51.2885-19/s320x320/40470301_737609546577676_7163267097605177344_n.jpg" class="avatar img-circle img-thumbnail" alt="avatar"></img>
                  <h6>Upload a different photo...</h6>
                </div>
                <ul className="list-group">
                  <li className="list-group-item text-muted" style={{textAlign:"center", fontWeight:"bold"}}>Actions</li>
                  <li className="list-group-item">Active Bookings</li>
                  <li className="list-group-item">Bookings History</li>
                  <li className="list-group-item">Saves</li>
                </ul>
              </div>
            </div>

        </div>
      </div>
    )
  }
}
