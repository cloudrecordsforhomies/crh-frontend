import React, { Component } from "react";
import "../styles/ListCard.css";
import axios from 'axios';

export default class ListCard extends Component {

  constructor(props){
    super(props)
    this.state = {
      image: "https://via.placeholder.com/200x200",
      price: '0.002 ETH',
      location: 'San Francisco',
      successfulBookings: 10,
      sqft: 15,
      host: 'Safa'
    }

    axios.get("http://localhost:5000/bookings").then(function(response){

    });
  }

  render() {
    return (
      <div className="card" style={{ width: 200, height: "auto" }}>
        <div className="container" style={{ position: "relative" }}>
          <img
            className="card-img-top"
            src={this.state.image}
            alt=""
          />
          <div
            style={{
              backgroundColor: "white",
              width: "70px",
              height: "70px",
              float: "left",
              position: "absolute",
              bottom: "0px",
              borderRadius:1000
            }}
          >
            <img src="https://image.flaticon.com/icons/svg/145/145867.svg" alt=""/>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <a href="https://www.google.com">
              {this.state.sqft}sqft in {this.state.location}
            </a>
          </h5>
          <p className="card-text">
            <strong>{this.state.successfulBookings}</strong> successful bookings
            with <strong>{this.state.host}</strong>
          </p>
        </div>
      </div>
    );
  }

}
