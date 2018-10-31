import React, { Component } from "react";
import ListCard from "./ListCard.js";


export default class Listing extends Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div id="listing" >
      <h3> Where to store </h3>
      <table style={{marginTop:'100px'}}>
      <tbody>
        <tr>
          <td>
            <ListCard location="San Francisco" price={5} image="http://placehold.it/200x200"/>
          </td>
          <td style={{paddingLeft:5}}>
            <ListCard location="San Francisco" price={6} image="http://placehold.it/200x200"/>
          </td>
        </tr>
        </tbody>
      </table>
      </div>
    );
  }

}
