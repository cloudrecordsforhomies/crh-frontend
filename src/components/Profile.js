import React, { Component } from "react";
import Booking from "./Booking.js";
import Hosting from "./Hosting.js";
import axios from 'axios';

export default class Profile extends Component {

  constructor(props){
    super(props);
    var user = null;
    var uId = localStorage.getItem('profile');

    this.state = {
      first: null,
      last: null,
      email: null,
      uId: uId,
      image: null,
      saves: null
    }

    this.handleLogin = this.handleLogin.bind(this);
    var self = this;
    axios.get(`http://localhost:5000/profile/${uId}`)
    .then(function(response){
      user = response.data;
      self.handleLogin(user);
    })
    .catch(function(err){
      console.log("user not found");
    });
  }

  handleLogin = (result) => {
    this.setState({ first: result.first, last:result.last, email:result.email, image:result.profPic, saves:result.saves }, () => {
      console.log(this.state.first);
    });
    // var newState = {}
    // Object.keys(result).map(function(key){newState[key] = result[key]});
    // console.log(newState);
    // this.setState(newState);
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
                  <img src={this.state.image} className="avatar img-thumbnail" style={{width:"250px", height:"250px"}} alt="avatar"></img>
                  <div className="row">
                  <div className="col-md-6">
                    <button href='#' className='btn btn-default'>Change Password</button>
                    </div>
                    <div className="col-md-6">
                    <button href='#' className='btn btn-default'>Upload New Avatar</button>
                  </div>
                  </div>
                </div>
                <ul className="list-group">
                  <li className="list-group-item text-muted" style={{textAlign:"center", fontWeight:"bold"}}>Actions</li>
                  <li className="list-group-item"><a href={`/listings?renterId=${this.state.uId}&status=1`}>Active Bookings</a></li>
                  <li className="list-group-item"><a href={`/listings?renterId=${this.state.uId}&status=2`}>Bookings History</a></li>
                  <li className="list-group-item"><a href={`/listings?hostId=${this.state.uId}&status=1`}>Active Hostings</a></li>
                  <li className="list-group-item"><a href={`/listings?hostId=${this.state.uId}&status=2`}>Hosting History</a></li>
                  <li className="list-group-item"><a href={`/listings?hostId=${this.state.uId}&status=0`}>Pending Hostings</a></li>
                  <li className="list-group-item"><a href={`/listings?bid=${this.state.saves}`}>Saves</a></li>
                </ul>
              </div>
              <div className="col-md-6">
                <div className="activePane"><Booking history={this.props.history} /></div>
                <Hosting user={this.state.uId} />
              </div>
            </div>
        </div>
      </div>
    )
  }
}
