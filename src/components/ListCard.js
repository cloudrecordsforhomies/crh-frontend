import React, { Component } from "react";
import "../styles/ListCard.css";
import axios from 'axios';

export default class ListCard extends Component {

  constructor(props){
    super(props)
    this.state = {
      id:props.bId,
      address:props.address,
      sqft:props.sqft,
      price:props.price,
      image:props.image,
      distance:props.distance,
      host:props.host,
      hostImg: null,
      hostFirst:null,
      lat: props.lat,
      lng: props.lng,
      user:localStorage.getItem("profile")
    }
    console.log(props.bId);
    var self = this;
    axios.get(`http://52.15.115.174:5000/profile/${self.state.host}`)
    .then(function(response){
      var user = response.data;
      self.getData(user);
    })
    .catch(function(err){
      alert("user not found");
    });
  }

  getData = (result) => {
    this.setState({ hostImg:result.profPic, hostFirst:result.first }, () => {
      console.log(result.first);
    });
  }

  render() {
    return (
      <div className="card" style={{ width: 200, height: "auto" }}>
        <div className="container" style={{ position: "relative",margin:0,padding:0,width:200 }}>
          <img
            className="card-img-top"
            src={this.state.image}
            height="200px"
            width="200px"
            alt="space"
          />
          <div
            style={{
              backgroundColor: "white",
              width: "70px",
              height: "70px",
              float: "left",
              position: "absolute",
              bottom: "0px",
              borderRadius:"100%"
            }}
          >
            <a href={`/profile/${this.state.host}`}> <img src={this.state.hostImg} className="avatar img-circle img-thumbnail" alt="host"/></a>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <a href={`/hostinspect/${this.state.id}`}>
              {this.state.sqft} sqft hosted by {this.state.hostFirst}
            </a>
          </h5>
          <p className="card-text">
            {this.state.distance} miles away
          </p>
          <p className="price-text">
            ${this.state.price}
          </p>
        </div>
      </div>
    );
  }

}
