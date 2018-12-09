import React, { Component } from "react";
import ListCard from "./ListCard.js";
import axios from 'axios';
import {Table} from 'react-bootstrap';

export default class Listing extends Component {

  constructor(props){
    super(props)
    this.state = {
      cards: [],
      i:0
    }
    var self = this;
    axios.get(`http://52.15.115.174:5000/listings/${this.props.location.search}`).then( (res) => {
      self.setState({cards:res.data}, function(){
        console.log(self.state.cards);
      });
    });
    this.createTable = this.createTable.bind(this);

  }

  // createTable = (data) => {
  //   let table = [];
  //   for(var i = 0; i<data.length;){
  //     let children = [];
  //     for(var j; j<5 ;j++){
  //       let listing = data[j];
  //       children.push(
  //         <ListCard bId={listing.bId}
  //                   address={listing.address}
  //                   sqft={listing.squareFeet}
  //                   image={listing.picture}
  //                   distance={listing.distance_miles}
  //                   host={listing.hostId}
  //                   price={listing.price}
  //                   lat={listing.latitude}
  //                   lng={listing.longitude}
  //                   />
  //                 );
  //     }
  //     table.push(`<tr>${children.join('')}</tr>`);
  //   }
  //   document.getElementById('listing').innerHTML = table.join('');
  // }

  createTable = (data) => {
    let table = [];
    while(data.length > 0){
      let children = [];
      for(var i=0; i<4;i++){
        const listing = data.pop();
        if(listing == null) break;
        console.log(listing.bId);
        children.push(<td style={{paddingLeft:'10px'}}><ListCard bId={listing.bId}
                          address={listing.address}
                          sqft={listing.squareFeet}
                          image={listing.picture}
                          distance={listing.distance_miles}
                          host={listing.hostId}
                          price={listing.price}
                          lat={listing.latitude}
                          lng={listing.longitude}
                          /></td>);
      }
      table.push(<div><hr /><tr style={{marginTop:'10px'}}>{children}</tr></div>)
    }
    return table;
  }

  render() {
    return (
      <div>
      <table style={{margin:'0 auto'}}>
        <tbody id='target'>
          {this.createTable(this.state.cards)}
        </tbody>
      </table>
      </div>
    );
  }

}
