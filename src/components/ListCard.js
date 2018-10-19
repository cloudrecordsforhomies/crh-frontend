import React, { Component } from "react";
import "../styles/ListCard.css";

export default class ListCard extends Component {

  constructor(props){
    super(props)
    this.state = {
      image: '',
      price: 5,
      location: 'San Francisco'
    }
  }

  render() {
    return (
      <div id="listCard">
        <ul>
          <li><img src={this.state.image}/></li>
          <li><span className='location'>{this.state.location}</span></li>
          <li><span className='price'>{this.state.price}</span></li>
        </ul>
      </div>
    );
  }

}
