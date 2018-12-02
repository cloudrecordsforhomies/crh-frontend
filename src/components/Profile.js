import React, { Component } from "react";
import Booking from "./Booking.js";
import Hosting from "./Hosting.js";
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Modal from 'react-modal';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Thumbnail
} from "react-bootstrap";

Modal.setAppElement('#root');
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : '500px',
    width                 : '500px'
  }
};

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
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    var self = this;
    axios.get(`http://52.15.115.174:5000/profile/${uId}`)
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
      console.log(this.state.saves);
    });
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
                    <button onClick={this.openModal} className='btn btn-default'>Change Password</button>
                  </div>
                  <div className="col-md-6">
                    <button onClick={this.openModal} className='btn btn-default'>Upload New Avatar</button>
                  </div>
                  <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Modal"
                  >
                    <button onClick={this.closeModal} style={{marginRight:"3%",marginLeft:"97%", marginBotton:'20px'}}>X</button>
                    <span> new password, new avatar </span>
                    <form onSubmit={this.handleSubmit} style={{top:'25px'}}>
                    <FormGroup controlId="password" bsSize="large">
                      <ControlLabel>New Password</ControlLabel>
                      <FormControl
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                      />
                    </FormGroup>
                    <FormGroup controlId="image" bsSize="large">
                    <ControlLabel>New Avatar</ControlLabel>
                    <FormControl
                    type="text"
                    onChange={this.handleChange}
                    />
                    </FormGroup>

                    <Button
                      block
                      bsSize="large"
                      className="btn-success"
                      type="submit"
                    >
                      Submit Changes
                    </Button>
                    </form>

                  </Modal>
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
              <Tabs>
                <TabList>
                  <Tab>Search Available Booking</Tab>
                  <Tab>Host Your Space</Tab>
                </TabList>
                <TabPanel>
                  <Booking history={this.props.history} />
                </TabPanel>
                <TabPanel>
                  <Hosting user={this.state.uId} />
                </TabPanel>
              </Tabs>
              </div>
            </div>
        </div>
      </div>
    )
  }
}
