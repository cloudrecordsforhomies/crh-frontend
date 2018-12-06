import React, { Component } from "react";
import ListCard from "./ListCard.js";
import axios from 'axios';


export default class Listing extends Component {

  constructor(props){
    super(props)
    this.state = {
      cards: []
    }
    var self = this;
    axios.get(`http://localhost:5000/listings/${this.props.location.search}`).then( (res) => {
      self.setState({cards:res.data}, function(){
        console.log(self.state.cards);
      });
    });

  }

  createTable(data){
    let table = [];
    for(var user of data){
      let children = [];
      for(var key in user){
        children.push(`<td>${user[key]}</td>`)
      }

      table.push(`<tr>${children.join('')}</tr>`);
    }
    document.getElementById('target').innerHTML = table.join('');
  }

  render() {
    return (
      <div id="listing" width="1000px">
      <h3> Where to store </h3>
      <table style={{marginTop:'100px'}}>
      <tbody>
        <tr id="target">
          { this.state.cards.map(function(listing){
              return(
                <td style={{paddingLeft:5}}>
                  <ListCard bId={listing.bId}
                            address={listing.address}
                            sqft={listing.squareFeet}
                            image={listing.picture}
                            distance={listing.distance_miles}
                            host={listing.hostId}
                            price={listing.price}
                            lat={listing.latitude}
                            lng={listing.longitude}

                  />
                </td>
              )
            })
          }
        </tr>
        </tbody>
      </table>
      </div>
    );
  }

}
