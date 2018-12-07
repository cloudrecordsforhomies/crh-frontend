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
    axios.get(`http://52.15.115.174:5000/listings/${this.props.location.search}`).then( (res) => {
      self.setState({cards:res.data}, function(){
        console.log(self.state.cards);
      });
    });
    this.createTable = this.createTable.bind(this);
    //this.createTable(this.state.cards);

  }

  createTable(data){
    let table = [];
    for(var i = 0; i<data.length;){
      let children = [];
      for(;i%3===0;i++){
        console.log(i);
        let listing = data[i];
        children.push(`<td>${
          <ListCard bId={listing.bId}
                    address={listing.address}
                    sqft={listing.squareFeet}
                    image={listing.picture}
                    distance={listing.distance_miles}
                    host={listing.hostId}
                    price={listing.price}
                    lat={listing.latitude}
                    lng={listing.longitude}

          />}</td>`)
      }

      table.push(`<tr>${children.join('')}</tr>`);
    }
    document.getElementById('listing').innerHTML = table.join('');
  }

  componentDidMount(){
    //document.getElementById('maptarget').innerHTML = 'he'
  }

  render() {
    return (
      <div>
      <div id="listing" width="1000px">
      <h3> Where to store </h3>
      <table style={{marginTop:'100px'}} id="target">
      <tbody>
        <tr id="">
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

      </div>
    );
  }

}
